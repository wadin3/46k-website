# 46K Website

## Editorial v2 Review Branch (2026-10-15)

Work is on `editorial-redesign-v2`, draft PR #4. The live Pages site is
unchanged; do not merge until visual and content review. Four long-form
demonstrations have Swedish/English counterparts and disclosed fictional
scenes. The Develop example remains a draft, visible only in preview builds.

The article system uses five Pages CMS blocks, photographic category covers,
neutral-white reading surfaces, numbered chapters, evidence notes, models,
image pairs/credits, sources and related reading. Existing article URLs and
body-only Markdown compatibility remain. Original logo PNGs are unchanged.

See `docs/EDITORIAL.md` for editing and preview instructions, tests and the
remaining authenticated CMS checks. CI validates default/project-path builds,
draft previews and a temporary CMS-shaped edit/draft/publication lifecycle.
The actual Pages CMS interface is currently behind sign-in; media upload,
block editing/reordering and editor-triggered preview have not been verified.

## Published

Live: https://wadin3.github.io/46k-website/
English: https://wadin3.github.io/46k-website/en/

Swedish is the default. The upper-right language menu uses native names;
the selected language has a small accompanying flag. Switching preserves
the equivalent page, translated article and active article category.
The owner approved ongoing publication to Pages. PR #3 contains the
2026-10-15 homepage refinements, following the deployed bilingual release.

## Homepage Refinements (2026-10-15)

- Updated navigation and all requested homepage copy in Swedish and English.
- Generated adult male football-player hero, optimized as WebP; prompt and
  provenance are recorded in `docs/brand/GENERATED_ASSETS.md`.
- Contrasting Graphite insights band with a native horizontal article rail.
- Six-second auto advance pauses on hover, focus, manual scrolling, hidden
  tabs and when the section leaves view. Previous/next and pause controls
  remain available. Reduced motion disables auto advance and animations.
- Subtle entrance/photo-settle effects, responsive hero sizing and small
  licensed flag/Lucide icon assets. Original logos are unchanged.

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

PR run `38708764900` passed production/HTML checks for all 16 pages at both
root and project paths: internal links, assets, language, menu destinations,
main landmark, unique h1 and image alt. Browser QA passed all 16 routes at
320, 390 and 1440px, images, overflow, same-page switches, article translation
matching, filters, Escape and click-away. The homepage refinement checks
also passed exact Swedish copy, flags/photo, hero containment, carousel
auto advance/pause/controls, keyboard scrolling and reduced-motion behavior.
Updated Swedish/English desktop/mobile screenshots were inspected.

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
