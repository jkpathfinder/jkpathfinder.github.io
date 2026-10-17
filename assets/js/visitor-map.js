/*
 * Visitor map client.
 * - On every page: records the visit once per browser session (POST /hit).
 * - On the home page (#visitor-map): draws recent visitor locations on the world
 *   map and lists totals, countries and recent cities, refreshing periodically.
 * Configuration comes from window.VISITOR_MAP (see _includes/scripts.html).
 */
(function () {
  "use strict";

  var config = window.VISITOR_MAP || {};
  var endpoint = String(config.endpoint || "").replace(/\/+$/, "");
  if (!endpoint || !window.fetch) return;

  // Must match the projection used to generate assets/visitor-map/world-land.svg.
  var K = 1000 / 360;
  var LAT_TOP = 84;
  var SVG_NS = "http://www.w3.org/2000/svg";
  var DAY = 86400000;
  var SESSION_KEY = "visitor-map-hit";

  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var shouldTrack = (!isLocal || config.trackLocal) && navigator.doNotTrack !== "1" && !navigator.webdriver;
  var root = document.getElementById("visitor-map");
  var points = Math.max(1, parseInt(config.maxPoints, 10) || 300);

  function sessionGet() {
    try { return window.sessionStorage.getItem(SESSION_KEY); } catch (e) { return null; }
  }

  function sessionSet() {
    try { window.sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) { /* storage unavailable */ }
  }

  function request(path, options) {
    return fetch(endpoint + path, options).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
  }

  function hit(withStats) {
    sessionSet();
    // text/plain keeps this a CORS "simple request" (no preflight).
    return request("/hit" + (withStats ? "?points=" + points : "?stats=0"), {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ path: location.pathname }),
      keepalive: !withStats
    });
  }

  function stats() {
    return request("/stats?points=" + points, { method: "GET" });
  }

  // Pages without the map only record the visit.
  if (!root) {
    if (shouldTrack && !sessionGet()) hit(false).catch(function () { /* ignore */ });
    return;
  }

  var dots = root.querySelector(".visitor-map__dots");
  var summary = root.querySelector(".visitor-map__summary");
  var countryList = root.querySelector(".visitor-map__countries");
  var recentList = root.querySelector(".visitor-map__recent");
  var regionNames = null;
  try { regionNames = new Intl.DisplayNames(["en"], { type: "region" }); } catch (e) { /* old browser */ }

  function countryName(code) {
    if (!code || code === "XX") return "Unknown";
    if (code === "T1") return "Tor network";
    try { return (regionNames && regionNames.of(code)) || code; } catch (e) { return code; }
  }

  function timeAgo(ms) {
    var s = Math.max(0, Math.round((Date.now() - ms) / 1000));
    if (s < 60) return "just now";
    var m = Math.round(s / 60);
    if (m < 60) return m + " min ago";
    var h = Math.round(m / 60);
    if (h < 24) return h + (h === 1 ? " hour ago" : " hours ago");
    var d = Math.round(h / 24);
    if (d < 30) return d + (d === 1 ? " day ago" : " days ago");
    return new Date(ms).toISOString().slice(0, 10);
  }

  function place(loc) {
    return [loc.city, loc.region, countryName(loc.country)]
      .filter(function (part, i, all) { return part && all.indexOf(part) === i; })
      .join(", ");
  }

  function svgEl(name, attrs) {
    var el = document.createElementNS(SVG_NS, name);
    for (var key in attrs) el.setAttribute(key, attrs[key]);
    return el;
  }

  function li(label, value) {
    var item = document.createElement("li");
    var name = document.createElement("span");
    var count = document.createElement("span");
    name.className = "visitor-map__label";
    count.className = "visitor-map__value";
    name.textContent = label;
    count.textContent = value;
    item.appendChild(name);
    item.appendChild(count);
    return item;
  }

  function drawDots(locations) {
    while (dots.firstChild) dots.removeChild(dots.firstChild);
    // Oldest first so the most recent dots are painted on top.
    locations.slice().reverse().forEach(function (loc) {
      if (loc.lat == null || loc.lon == null || loc.lat < -58) return;
      var x = (loc.lon + 180) * K;
      var y = (LAT_TOP - loc.lat) * K;
      var fresh = Date.now() - loc.last < DAY;
      var r = 3.5 + Math.min(4.5, Math.log(loc.visits) / Math.LN2);
      var group = svgEl("g", { "class": "visitor-map__dot" + (fresh ? " visitor-map__dot--new" : "") });
      if (fresh) group.appendChild(svgEl("circle", { cx: x, cy: y, r: r, "class": "visitor-map__pulse" }));
      group.appendChild(svgEl("circle", { cx: x, cy: y, r: r }));
      var title = svgEl("title", {});
      title.textContent = place(loc) + " — " + loc.visits + (loc.visits === 1 ? " visit" : " visits") +
        ", last " + timeAgo(loc.last);
      group.appendChild(title);
      dots.appendChild(group);
    });
  }

  function render(data) {
    var countries = data.countries || [];
    var locations = data.locations || [];
    drawDots(locations);

    var parts = [
      data.total + (data.total === 1 ? " visit" : " visits"),
      countries.length + (countries.length === 1 ? " country / region" : " countries / regions"),
      data.today + " today"
    ];
    if (data.since) parts.push("since " + new Date(data.since).toISOString().slice(0, 10));
    summary.textContent = parts.join(" · ");

    countryList.innerHTML = "";
    countries.slice(0, 10).forEach(function (c) {
      countryList.appendChild(li(countryName(c.code), c.visits));
    });

    recentList.innerHTML = "";
    locations.slice(0, 10).forEach(function (loc) {
      recentList.appendChild(li(place(loc), timeAgo(loc.last)));
    });
    root.classList.add("visitor-map--ready");
  }

  function fail() {
    summary.textContent = "Visitor statistics are temporarily unavailable.";
  }

  var first = shouldTrack && !sessionGet() ? hit(true) : stats();
  first.then(render, function () { return stats().then(render); }).catch(fail);

  var refresh = (parseInt(config.refresh, 10) || 60) * 1000;
  setInterval(function () {
    if (!document.hidden) stats().then(render).catch(function () { /* keep last data */ });
  }, refresh);
})();
