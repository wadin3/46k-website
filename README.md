# 46K website

Website for 46K - Decoding Football Intelligence.

Astro static site, GitHub Pages deployment and Pages CMS editorial workflow.
Swedish is the default language; English is available under `/en/`.

## Development

Run `npm ci`, then `npm run dev`. Build with `npm run build`.

Astro builds for `https://46karat.com` at the domain root. The Pages workflow
checks the repository's configured custom domain against `public/CNAME` before
publishing main. Manage the custom domain in the repository's Pages settings.

Verify links, assets, metadata, the sitemap and CNAME with
`python scripts/check-site.py` after building.

## Project context

- [Published site](https://46karat.com/)
- [Project status](PROJECT.md)
- [Language structure](docs/LANGUAGES.md)
- [Brand library and reading order](docs/brand/README.md)
- [Editorial workflow](docs/EDITORIAL.md)
- [Generated supporting imagery](docs/brand/GENERATED_ASSETS.md)

The official logo PNG originals are in `public/brand/logos/`. Use them unchanged.
