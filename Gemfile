source "https://rubygems.org"

# Local preview environment. Run:
#
#     bundle install
#     bundle exec jekyll serve --livereload
#
# GitHub Pages ignores this file and builds the site with its own `github-pages`
# stack (Jekyll 3.10). That meta-gem cannot be installed on Ruby >= 4.0 (its
# `commonmarker` dependency requires Ruby < 4), so the same Jekyll version and
# the plugins this site uses are listed here directly instead.

gem "jekyll", "~> 3.10"
gem "kramdown-parser-gfm"   # `input: GFM` in _config.yml
gem "liquid", ">= 4.0.4"    # 4.0.3 calls String#tainted?, removed in Ruby 3.2
gem "webrick", "~> 1.8"     # `jekyll serve` on Ruby >= 3.0

group :jekyll_plugins do
  gem "jekyll-redirect-from"
  gem "jekyll-sitemap"
end

# Standard-library gems that are no longer loaded by default on newer Ruby.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"

# Windows has no system zoneinfo database.
gem "tzinfo-data" if Gem.win_platform?
