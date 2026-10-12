# 46K editorial workflow

Every article is a Markdown file under `src/content/articles/` with frontmatter matching `src/content.config.ts`.

## Categories
UNDERSTAND, ASSESS, DEVELOP, 2046.

## Types
- editorial: long-form story; serif typography; Paper background.
- research: explainer; sober color palette; sources and precise claims.
- insight: short, emphatic football interpretation with darker cover.

## Safeguards
- New files default to `draft: true`.
- Published articles must have `draft: false`; only these are included in Explore and in generated article pages.
- Editors verify every cited source, quotation and scientific statement before publishing.
- Evidence labels: WE KNOW / EVIDENCE SUGGESTS / WE THINK.
- Don't claim any cognitive test predicts professional success or measures definitive football intelligence.
- Images must be owned/licensed and have alt text. Do not regenerate the 46K logo.
- For GitHub review: create article in a branch, open pull request, read preview/build status, merge only after approval.

## Future
Check Pages CMS behavior for rich-text and nested sources against the installed CMS version. Markdown is canonical; keep MDX components outside CMS-managed text until interoperability has been verified.
