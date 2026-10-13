# 46K Website

## Published

Live: https://wadin3.github.io/46k-website/
English: https://wadin3.github.io/46k-website/en/

Swedish is the default. The upper-right language menu uses native names,
not flags, and switches to the equivalent page or translated article.
The owner approved publication; PR #2 was merged. Pages build and deployment
passed in Actions run `38460785714`, release commit
`39be83eee7d5338eb997e52850106c3ecb0733c0`.

## Implementation

- Astro: 16 pages, 8 Swedish and 8 English.
- Shared page templates: `src/components/pages/`.
- Central language registry and UI dictionaries: `src/i18n/index.ts`.
- Three existing articles with faithful Swedish translations, matched by
  `translationKey`. Language metadata separates listings and generated routes.
- Drafts remain excluded; new CMS articles default to Swedish.
- Original approved PNG logos remain unchanged in `public/brand/logos/`.
- Brand entry point: `docs/brand/README.md`; REF_07 is not required.
- Generated hero origin/prompt: `docs/brand/GENERATED_ASSETS.md`.
- Contact: `wadin.psykologi@gmail.com`.
- Locked dependencies install with `npm ci`. Pages provides deployment origin/base.
- See `docs/LANGUAGES.md` to add languages.

## Verification

PR run `38460160777` passed production/HTML checks for all 16 pages at both
root and project paths: internal links, assets, language, menu destinations,
main landmark, unique h1 and image alt. Browser QA passed all 16 routes at
320, 390 and 1440px, images, overflow, same-page switches, article translation
matching, filters, Escape and click-away. Screenshots were inspected.

All 16 public routes returned HTTP 200 with the correct language.
Swedish-to-English switching was verified on the public site in a browser.
Local Astro builds remain restricted by the Windows sandbox filesystem;
artifact QA uses intercepted requests. Independent production deployment
and public verification passed.

## Safeguards

Distinguish established evidence, emerging evidence and 46K interpretation.
Assessment remains research and development, not a validated product.
Do not invent scientific results or make deterministic talent predictions.
Generated imagery shows fictional people/situations, not research evidence.
Original locked logos must not be redrawn, recolored or regenerated.
No hourly monitoring or domain/DNS changes.

## Next Work

1. Iterate on the published design and copy from owner feedback.
2. Verify CMS article editing, translations, drafts and media uploads.
3. Develop new sourced editorial content with owner review.
4. Add languages using the shared templates and registry.
