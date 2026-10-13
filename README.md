# 46K.com

Website for 46K - Decoding Football Intelligence.

Astro static site, GitHub Pages deployment and Pages CMS editorial workflow.

## Development

Run `npm ci`, then `npm run dev`. Build with `npm run build`.

`ASTRO_SITE` sets the site origin and `ASTRO_BASE` its deployment path.
Both default to the 46k.com root configuration. The Pages workflow reads these
values from GitHub Pages before deploying main.

Verify the production output with `python scripts/check-site.py --base /`.
Use the same base value that was used during the build.

## Project context

- [Project status](PROJECT.md)
- [Brand library and reading order](docs/brand/README.md)
- [Editorial workflow](docs/EDITORIAL.md)
- [Generated supporting imagery](docs/brand/GENERATED_ASSETS.md)

The official logo PNG originals are in `public/brand/logos/`. Use them unchanged.
