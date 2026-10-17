# jkpathfinder.github.io

Personal academic homepage of Mingrui Ma, served by GitHub Pages at <https://jkpathfinder.github.io>.
Built with Jekyll on the [AcademicPages](https://github.com/academicpages/academicpages.github.io) /
[Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme (MIT License, see `LICENSE`).

## Where things live

| Page | Content | Template |
| --- | --- | --- |
| Home | `_pages/about.md` | `_layouts/single.html` + `_includes/visitor-map.html` |
| Selected Publications | `_publications/*.md` (figures in `images/publications/`, PDFs in `files/`) | `_pages/publications.html` |
| Patents | `_patent/*.md` (`category: patent` or `copyright`) | `_pages/patent.html` |
| Academic Services | `_reviewing/*.md` (journal covers in `images/services/`) | `_pages/academic-services.html` |
| Honors | `_honors/*.md` | `_pages/honors.html` |

* Site settings, sidebar profile and the visitor map endpoint: `_config.yml`.
* Navigation bar: `_data/navigation.yml`.
* Page styles for the lists and the visitor map: `_sass/_custom.scss`.
* CV: `assets/Curriculum_Vitae.pdf`.

To add an item, copy an existing file in the matching collection folder and edit its front matter.
Publications and reviewing entries are shown newest first (by `date`). Images that fail to load fall
back to the placeholder in the same folder.

## Local preview

Requirements: Ruby (with Bundler) and Node.js.

```powershell
bundle install
npm --prefix visitor-map-worker install
powershell -ExecutionPolicy Bypass -File serve-local.ps1
```

`serve-local.ps1` starts the visitor map worker (http://127.0.0.1:8787) in a second window and serves the
site at <http://localhost:4000> with `_config.dev.yml`, which points the map at the local worker.
Running plain `bundle exec jekyll serve` also works, but the home page then shows a
"Visitor map not configured yet" hint instead of the map.

## Visitor map

Self-hosted on a free Cloudflare Worker + D1 database; see `visitor-map-worker/README.md` for
deployment. The map stays hidden on the live site until `visitor_map.endpoint` in `_config.yml` is set.

## Rebuilding the JavaScript bundle

`assets/js/main.min.js` is built from `assets/js/_main.js` and `assets/js/plugins/`. Only needed if
you change those files: `npm install`, then `npm run build:js`.
