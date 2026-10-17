-- Demo data for LOCAL previews only:
--   npx wrangler d1 execute visitor-map --local --file demo-data.sql
-- Never run this with --remote; it would add fake visits to the live map.

DELETE FROM locations;
DELETE FROM countries;
DELETE FROM totals;

INSERT INTO locations (lat, lon, city, region, country, visits, last) VALUES
  (30.6, 114.3, 'Wuhan',      'Hubei',          'CN', 42, CAST(strftime('%s','now') AS INTEGER) * 1000 - 120000),
  (39.9, 116.4, 'Beijing',    'Beijing',        'CN', 18, CAST(strftime('%s','now') AS INTEGER) * 1000 - 1800000),
  (31.2, 121.5, 'Shanghai',   'Shanghai',       'CN', 15, CAST(strftime('%s','now') AS INTEGER) * 1000 - 5400000),
  (22.5, 114.1, 'Shenzhen',   'Guangdong',      'CN', 11, CAST(strftime('%s','now') AS INTEGER) * 1000 - 40000000),
  (22.3, 114.2, 'Hong Kong',  'Hong Kong',      'HK',  4, CAST(strftime('%s','now') AS INTEGER) * 1000 - 90000000),
  (1.3,  103.8, 'Singapore',  'Singapore',      'SG',  5, CAST(strftime('%s','now') AS INTEGER) * 1000 - 9000000),
  (35.7, 139.7, 'Tokyo',      'Tokyo',          'JP',  6, CAST(strftime('%s','now') AS INTEGER) * 1000 - 200000000),
  (37.6, 127.0, 'Seoul',      'Seoul',          'KR',  3, CAST(strftime('%s','now') AS INTEGER) * 1000 - 300000000),
  (40.1, -88.2, 'Champaign',  'Illinois',       'US',  7, CAST(strftime('%s','now') AS INTEGER) * 1000 - 600000),
  (37.4, -122.1,'Palo Alto',  'California',     'US',  5, CAST(strftime('%s','now') AS INTEGER) * 1000 - 70000000),
  (42.4, -71.1, 'Cambridge',  'Massachusetts',  'US',  4, CAST(strftime('%s','now') AS INTEGER) * 1000 - 150000000),
  (43.7, -79.4, 'Toronto',    'Ontario',        'CA',  2, CAST(strftime('%s','now') AS INTEGER) * 1000 - 400000000),
  (51.5, -0.1,  'London',     'England',        'GB',  4, CAST(strftime('%s','now') AS INTEGER) * 1000 - 20000000),
  (52.5, 13.4,  'Berlin',     'Berlin',         'DE',  2, CAST(strftime('%s','now') AS INTEGER) * 1000 - 500000000),
  (48.9, 2.4,   'Paris',      'Ile-de-France',  'FR',  2, CAST(strftime('%s','now') AS INTEGER) * 1000 - 600000000),
  (-33.9, 151.2,'Sydney',     'New South Wales','AU',  3, CAST(strftime('%s','now') AS INTEGER) * 1000 - 250000000),
  (-23.5, -46.6,'Sao Paulo',  'Sao Paulo',      'BR',  1, CAST(strftime('%s','now') AS INTEGER) * 1000 - 700000000),
  (28.6, 77.2,  'New Delhi',  'Delhi',          'IN',  2, CAST(strftime('%s','now') AS INTEGER) * 1000 - 350000000);

INSERT INTO countries (code, visits, last)
  SELECT country, SUM(visits), MAX(last) FROM locations GROUP BY country;

INSERT INTO totals (id, visits, since)
  SELECT 1, SUM(visits), CAST(strftime('%s','now') AS INTEGER) * 1000 - 2592000000 FROM locations;
