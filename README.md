# Mingrui Ma — Personal Academic Homepage

**🌐 Live site: <https://jkpathfinder.github.io>**

This repository hosts the personal academic homepage of **Mingrui Ma**, a Ph.D. student in Industrial
Engineering at the [UbiHealth Lab](https://ubihealth.ise.illinois.edu/),
[University of Illinois Urbana-Champaign](https://illinois.edu/), advised by
[Prof. Yiwen Dong](https://yiwen-dong.github.io/).

My research is interdisciplinary, spanning **AI for healthcare**, **AI-driven clinical decision support
systems**, **human motion analysis**, **foundation model algorithms**, and **multimodal sensor data
analysis**. This site collects my research output and academic activities in one place.

## What's on the site

| Section | What you'll find |
| --- | --- |
| [Home](https://jkpathfinder.github.io/) | Self introduction, research interests, CV link, and a live world map of site visitors |
| [Publications](https://jkpathfinder.github.io/publications/) | Papers and preprints, each with a representative figure, a TL;DR, abstract, citation, and PDF link |
| [Patents](https://jkpathfinder.github.io/patent/) | Publicly disclosed invention patents (including a U.S. patent application) |
| [Academic Services](https://jkpathfinder.github.io/academic-services/) | Peer-review experience, journals reviewed, and organizing roles |
| [Honors](https://jkpathfinder.github.io/honors/) | Competition awards, honors, and scholarships |

## Highlights

- **Publication cards** — every paper is shown with a figure, a one-paragraph TL;DR, and status badges
  such as *Accepted*, so visitors can grasp the work at a glance.
- **Self-hosted visitor map** — visits are recorded by a small Cloudflare Worker with a D1 database and
  drawn on a world map on the home page, with no third-party tracking service
  (see [`visitor-map-worker/`](visitor-map-worker/README.md)).
- **Content as data** — publications, patents, reviewing records, and honors are each stored as one
  Markdown file per entry, so adding an item means adding a file rather than editing HTML.

## Built with

- [Jekyll](https://jekyllrb.com/), deployed automatically by [GitHub Pages](https://pages.github.com/)
- Based on the [AcademicPages](https://github.com/academicpages/academicpages.github.io) template and the
  [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme, with custom page layouts and styles
- [Cloudflare Workers](https://workers.cloudflare.com/) + D1 for the visitor map

## Repository layout

```
_pages/          Page templates (home, publications, patents, services, honors)
_publications/   One Markdown file per paper
_patent/         One Markdown file per patent
_reviewing/      One Markdown file per reviewing or organizing record
_honors/         One Markdown file per honor or award
_config.yml      Site settings and sidebar profile
images/, files/  Figures, logos, and paper PDFs
visitor-map-worker/  Source of the visitor map backend
```

## Contact

- Email: [mma36@illinois.edu](mailto:mma36@illinois.edu)
- [Google Scholar](https://scholar.google.com/citations?user=UYycSq8AAAAJ) ·
  [ORCID](https://orcid.org/0000-0002-2073-6424) ·
  [LinkedIn](https://www.linkedin.com/in/mingrui-ma-77226037b)

## License

The site template is released under the MIT License (see [`LICENSE`](LICENSE)), inherited from
AcademicPages and Minimal Mistakes. Papers, figures, and other personal content belong to their
respective authors and publishers.
