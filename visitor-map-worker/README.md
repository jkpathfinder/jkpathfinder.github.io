# Visitor map backend

A small [Cloudflare Worker](https://developers.cloudflare.com/workers/) + [D1](https://developers.cloudflare.com/d1/)
database that powers the visitor map on the home page. It replaces third-party
widgets such as ClustrMaps / RevolverMaps, which have stopped working.

* Every page of the site records the visit once per browser session (`POST /hit`).
* The home page draws the most recent visitor locations on a world map and lists
  totals, top countries / regions and recent cities (`GET /stats`), refreshing every minute.
* Locations come from Cloudflare's IP geolocation, rounded to 0.1° (city level).
  **IP addresses are never stored**; each visitor is counted at most once per UTC day
  using a salted hash whose input changes every day.
* The Cloudflare free plan is plenty (100,000 requests/day, D1: 100,000 rows written
  and 5 million rows read per day).

## Deploy (once)

You need a free Cloudflare account. Run everything from this folder:

```bash
cd visitor-map-worker
npm install
npx wrangler login
npx wrangler d1 create visitor-map
```

Copy the `database_id` printed by the last command into `wrangler.toml`, then:

```bash
npm run db:init:remote
npx wrangler secret put SALT
npm run deploy
```

For `SALT`, paste any long random string (it is never needed again).
`npm run deploy` prints the worker URL, e.g.
`https://jkpathfinder-visitor-map.<your-account>.workers.dev`.
Put that URL into `_config.yml`:

```yaml
visitor_map:
  endpoint: "https://jkpathfinder-visitor-map.<your-account>.workers.dev"
```

Commit and push; the map appears on the home page once GitHub Pages has rebuilt.
Until `endpoint` is set, the map is hidden on the live site.

> **Visitors from mainland China.** Reachability of `*.workers.dev` from China varies by
> network. If you have a domain on Cloudflare, add a custom domain to the worker
> (Workers & Pages → the worker → Settings → Domains & Routes) and use that URL as
> `endpoint`. If the backend cannot be reached, the map still renders and shows
> "Visitor statistics are temporarily unavailable" instead of breaking the page.

If you serve the site from another address, add it to `ALLOWED_ORIGINS` in
`wrangler.toml` and run `npm run deploy` again.

## Local preview

```bash
cd visitor-map-worker
npm install
npm run db:init:local
npx wrangler d1 execute visitor-map --local --file demo-data.sql   # optional fake data
npm run dev
```

In a second terminal, from the repository root:

```bash
bundle exec jekyll serve --config _config.yml,_config.dev.yml
```

Open <http://localhost:4000>. `_config.dev.yml` points the site at the local worker
(`http://127.0.0.1:8787`) and enables counting visits from localhost. Local data lives
in `.wrangler/` and never touches the deployed database. Never run `demo-data.sql`
with `--remote`.

If `npm install` reports that install scripts for `esbuild` / `workerd` were blocked,
wrangler normally still works. If it does not, run `npm install-scripts approve esbuild workerd`
and `npm install` again.

## Maintenance

```bash
# Inspect the live data
npx wrangler d1 execute visitor-map --remote --command "SELECT * FROM countries ORDER BY visits DESC"

# Reset all statistics
npx wrangler d1 execute visitor-map --remote --command "DELETE FROM seen; DELETE FROM locations; DELETE FROM countries; DELETE FROM totals"
```

## Files

| File | Purpose |
| --- | --- |
| `src/index.js` | Worker: `POST /hit`, `GET /stats`, daily cleanup cron |
| `schema.sql` | D1 tables (safe to re-run) |
| `demo-data.sql` | Fake visits for local previews only |
| `wrangler.toml` | Worker name, allowed origins, D1 binding, cron |
| `../assets/js/visitor-map.js` | Browser side: records visits, draws the map |
| `../assets/visitor-map/world-land.svg` | Map background (Natural Earth, public domain) |
| `../_includes/visitor-map.html` | Map markup on the home page |
