-- Visitor map schema (Cloudflare D1 / SQLite). Safe to run more than once.

-- One row per visitor per UTC day; used only for de-duplication and pruned daily.
CREATE TABLE IF NOT EXISTS seen (
  day     TEXT NOT NULL,
  visitor TEXT NOT NULL,
  PRIMARY KEY (day, visitor)
) WITHOUT ROWID;

-- Aggregates read by the map.
CREATE TABLE IF NOT EXISTS totals (
  id     INTEGER PRIMARY KEY CHECK (id = 1),
  visits INTEGER NOT NULL DEFAULT 0,
  since  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS countries (
  code   TEXT PRIMARY KEY,
  visits INTEGER NOT NULL DEFAULT 0,
  last   INTEGER NOT NULL
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS locations (
  lat     REAL NOT NULL,
  lon     REAL NOT NULL,
  city    TEXT,
  region  TEXT,
  country TEXT,
  visits  INTEGER NOT NULL DEFAULT 0,
  last    INTEGER NOT NULL,
  PRIMARY KEY (lat, lon)
);

CREATE INDEX IF NOT EXISTS locations_last ON locations (last DESC);
