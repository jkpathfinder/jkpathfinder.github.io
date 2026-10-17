# Local preview including the visitor map.
# Starts the visitor map worker in a second window, then serves the site at http://localhost:4000.
# Usage (from the repository root):  powershell -ExecutionPolicy Bypass -File serve-local.ps1

Set-Location $PSScriptRoot
if (-not (Test-Path visitor-map-worker\node_modules)) { npm --prefix visitor-map-worker install }
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'npm --prefix visitor-map-worker run dev -- --ip 127.0.0.1'
bundle exec jekyll serve --config _config.yml,_config.dev.yml --livereload
