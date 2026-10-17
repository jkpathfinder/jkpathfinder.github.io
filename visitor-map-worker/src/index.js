/**
 * Visitor map backend for jkpathfinder.github.io (Cloudflare Worker + D1).
 *
 *   POST /hit     record the current visit (body: {"path": "/"}), returns stats
 *                 unless called with ?stats=0
 *   GET  /stats   return aggregated statistics
 *
 * Privacy: IP addresses are never stored. Each visitor is de-duplicated per UTC
 * day with a salted SHA-256 hash of (day, IP, user agent); the hash input changes
 * every day, so visitors cannot be followed across days. Locations come from
 * Cloudflare's IP geolocation and are rounded to 0.1 degree (city level).
 */

const BOT_UA = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor|curl|wget|python|java\/|go-http/i;
const DEFAULT_MAX_POINTS = 300;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === "/hit" && request.method === "POST") {
        if (!cors["Access-Control-Allow-Origin"]) {
          return json({ error: "origin not allowed" }, 403, cors);
        }
        await recordVisit(request, env);
        if (url.searchParams.get("stats") === "0") {
          return json({ ok: true }, 200, cors);
        }
        return json(await readStats(env, url), 200, cors);
      }

      if (url.pathname === "/stats" && request.method === "GET") {
        return json(await readStats(env, url), 200, { ...cors, "Cache-Control": "public, max-age=30" });
      }

      return json({ error: "not found" }, 404, cors);
    } catch (err) {
      console.error(err);
      return json({ error: "internal error" }, 500, cors);
    }
  },

  // Daily cleanup of the de-duplication table (see `triggers` in wrangler.toml).
  async scheduled(_event, env) {
    await env.DB.prepare("DELETE FROM seen WHERE day < ?").bind(utcDay(Date.now() - 2 * 86400000)).run();
  },
};

async function recordVisit(request, env) {
  const ua = request.headers.get("User-Agent") || "";
  if (!ua || BOT_UA.test(ua)) return;

  const now = Date.now();
  const day = utcDay(now);
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const visitor = await sha256(`${env.SALT || ""}|${day}|${ip}|${ua}`);

  const seen = await env.DB
    .prepare("INSERT OR IGNORE INTO seen (day, visitor) VALUES (?, ?)")
    .bind(day, visitor.slice(0, 32))
    .run();
  if (!seen.meta || seen.meta.changes !== 1) return; // already counted today

  const cf = request.cf || {};
  const country = typeof cf.country === "string" ? cf.country : "XX";
  const lat = roundCoord(cf.latitude);
  const lon = roundCoord(cf.longitude);

  const statements = [
    env.DB.prepare(
      `INSERT INTO totals (id, visits, since) VALUES (1, 1, ?)
       ON CONFLICT(id) DO UPDATE SET visits = visits + 1`
    ).bind(now),
    env.DB.prepare(
      `INSERT INTO countries (code, visits, last) VALUES (?, 1, ?)
       ON CONFLICT(code) DO UPDATE SET visits = visits + 1, last = excluded.last`
    ).bind(country, now),
  ];
  if (lat !== null && lon !== null) {
    statements.push(
      env.DB.prepare(
        `INSERT INTO locations (lat, lon, city, region, country, visits, last) VALUES (?, ?, ?, ?, ?, 1, ?)
         ON CONFLICT(lat, lon) DO UPDATE SET visits = visits + 1, last = excluded.last,
           city = excluded.city, region = excluded.region, country = excluded.country`
      ).bind(lat, lon, text(cf.city), text(cf.region), country, now)
    );
  }
  await env.DB.batch(statements);
}

async function readStats(env, url) {
  const requested = parseInt(url.searchParams.get("points") || "", 10);
  const limit = Math.min(Number.isFinite(requested) && requested > 0 ? requested : DEFAULT_MAX_POINTS, 1000);

  const [totals, countries, locations, today] = await env.DB.batch([
    env.DB.prepare("SELECT visits, since FROM totals WHERE id = 1"),
    env.DB.prepare("SELECT code, visits FROM countries ORDER BY visits DESC, last DESC"),
    env.DB.prepare(
      "SELECT lat, lon, city, region, country, visits, last FROM locations ORDER BY last DESC LIMIT ?"
    ).bind(limit),
    env.DB.prepare("SELECT COUNT(*) AS n FROM seen WHERE day = ?").bind(utcDay(Date.now())),
  ]);

  const t = totals.results[0] || { visits: 0, since: null };
  return {
    total: t.visits,
    since: t.since,
    today: today.results[0] ? today.results[0].n : 0,
    countries: countries.results,
    locations: locations.results,
    generated: Date.now(),
  };
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const headers = { Vary: "Origin" };
  if (origin && allowed.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return headers;
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}

function utcDay(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function roundCoord(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? Math.round(n * 10) / 10 : null;
}

function text(value) {
  return typeof value === "string" && value ? value.slice(0, 80) : null;
}

async function sha256(input) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
