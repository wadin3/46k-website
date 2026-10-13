# 46K Website

Mission: Decoding Football Intelligence. Ambition: Sweden, World Champions 2046. Operating model: UNDERSTAND -> ASSESS -> DEVELOP.

## Current status

- Repository: `wadin3/46k-website`.
- Framework: Astro static site with content collections.
- Article content: three published Markdown articles in `src/content/articles`.
- Article routing: `/explore/` lists non-draft articles; `/explore/[slug]/` generates one static page per non-draft article.
- Draft behavior: articles with `draft: true` are excluded from the Explore index and generated article pages.
- Categories: `UNDERSTAND`, `ASSESS`, `DEVELOP`, and string value `'2046'`.
- Article types: `editorial`, `research`, and `insight`.
- Pages CMS: `.pages.yml` defines the article collection and media paths. The repository now includes `public/images/` for CMS uploads.
- GitHub Actions: workflow builds on pushes and pull requests; pushes to `main` also deploy the built `dist/` folder to GitHub Pages.
- Latest checked `main` build before this update: GitHub Actions run `38291095339`, commit `da9b5f5`, succeeded on 2026-10-12.

## Known gaps

- Brand system v2.0 documentation is not present in this repository.
- Official locked PNG logo assets are not present:
  - `46K_FullSignature_Light.png`
  - `46K_FullSignature_Dark.png`
  - `46K_Essential_Light.png`
  - `46K_Essential_Dark.png`
- Header branding uses a plain text `46K` fallback until the official logo assets are supplied.
- `assessment`, `mission`, and `connect` are simple placeholder pages and do not yet use the shared editorial layout.
- Pages CMS rich-text behavior and nested source editing still need browser verification after Pages CMS is connected.
- No licensed editorial imagery is included yet.

## Verification notes

- `npm install --no-audit --no-fund` completed locally.
- Local `npm run build` is blocked in this Codex Windows sandbox by `EPERM` errors during Astro/Vite realpath access to `src/content.config.ts`. Direct Node and PowerShell file reads work, and the latest GitHub Actions build on `main` succeeds, so this appears to be a local sandbox filesystem limitation rather than a repository syntax error.
- GitHub Pages endpoint returned 404 during inspection, which indicates Pages was not readable/enabled at that point. The workflow is prepared for Pages deployment once GitHub Pages is enabled for GitHub Actions in repository settings.

## Editorial safeguards

- Scientific claims must separate established evidence, emerging evidence, and 46K interpretation.
- Do not claim any cognitive test predicts professional success or definitively measures football intelligence.
- Assessment language must present the work as early-stage research and development.
- New scientific or editorial content should not be published without review.

## Next technical steps

1. Enable GitHub Pages with source set to GitHub Actions if it is not already enabled.
2. Add and commit `package-lock.json` once normal authenticated git push is available, then switch CI from `npm install` to `npm ci`.
3. Add the brand system v2.0 documentation and official locked PNG logo assets.
4. Verify the Pages CMS editing flow in the browser.
5. Replace placeholder pages with shared-layout editorial pages.
6. Add a small link and accessibility check once local build execution is available outside the current sandbox limitation.
