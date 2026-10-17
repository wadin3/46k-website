# Mission Storytelling Preview

Review-only redesign of `/mission/` and `/en/mission/`, based on the owner's
`Legend 46K.docx` and mission design brief supplied on 2026-10-17. Do not merge
or deploy until the owner has reviewed the complete page.

## Content and presentation

`src/data/mission.json` holds the approved Swedish body text and idiomatic
English translation, independent of components. Swedish paragraph wording is
retained; headings use sentence case, whitespace is normalized. The closing
direction statement, conceptual model labels and image disclosures follow the
design brief. The founder's experience is supplied by the owner, not independently
verified. No scientific results, metrics or dated milestones have been added.

`src/components/pages/Mission.astro` composes seven permanent page chapters.
Reusable mission labels, paragraphs, method and direction components are in
`src/components/mission/`. This is not an article or a CMS category. Existing
header, footer, language links, official logos and site routes are unchanged.

The arena opening returns in the final chapter. Ordinary adult training,
perception and player/coach conversation provide a human counterpoint. The
method connects three steps; the route to 2046 is explicitly conceptual, not a
schedule or forecast. Follow our journey leads to existing 2046 editorial
content; Contact us leads to the existing contact page, with no non-functional
newsletter form or invented social account.

## Motion and access

Native chapter anchors and a horizontally scrollable chapter index work without
JavaScript. JavaScript adds active chapter indication and one-time section
reveals. Copy is visible by default. CSS honors reduced motion, keeps native
scrolling and does not lock the viewport or hijack navigation. No animation
dependency is added. Images are optimized WebP; below-fold images load lazily.

## Image provenance

`public/images/mission-arena.webp` and `mission-training.webp` are generated
supporting illustrations of fictional adults and places, not actual future
events. Original prompts and cleanup are in `brand/GENERATED_ASSETS.md`. Existing
perception, feedback and ground illustrations are reused with the same disclosure.

## Checks

`scripts/check-mission.py` checks both compiled routes, all approved paragraphs,
seven chapter IDs, conceptual disclosures, official dark logo and image metadata.
It runs with the existing site/editorial checks for root and project-base builds.
Browser QA additionally covers responsive text bounds, decoded assets, chapter
anchors, language/hash continuity, CTAs, reduced motion and no-JavaScript reading.
