# 46K Website

Mission: Decoding Football Intelligence. Ambition: Sweden, World Champions 2046.
Operating model: UNDERSTAND -> ASSESS -> DEVELOP.

## Reviewable preview - 2026-10-13

PR #2 contains the brand library, the deployment work originally in PR #1,
and the first complete website preview. The branch is ready for owner review;
it is not merged or publicly deployed.

- Astro static site with three published Markdown articles; drafts remain excluded.
- Shared responsive layout for Home, Explore, Assessment, Mission and Connect.
- Official unchanged PNG logos in `public/brand/logos/`, used in the header and footer.
- Supplied v2.0 documents and six style boards in `docs/brand/`; start at its README.
- REF_07 is not required, by the owner's instruction.
- Homepage lists the existing articles automatically and uses a proposed generated
  training image. Its origin and production prompt are in `docs/brand/GENERATED_ASSETS.md`.
- Contact: `wadin.psykologi@gmail.com`, supplied by the owner.
- Explore validates category filters and displays an empty state when appropriate.
- Internal routes and asset URLs support both root and GitHub project-path hosting.
- Locked dependencies in `package-lock.json`; CI installs with `npm ci`.
- Pages CMS media folder exists. The CMS editing flow has not yet been verified.

## Verification

- GitHub Actions run `38442836105`, commit `fce760195cfe349916a0474ffd1caafaea413d81`,
  passed both production builds and generated HTML checks.
- Checked all eight generated pages for internal links, asset files, deployment
  prefix, language, unique h1, main landmark and image alt attributes.
- Checked both `/` and `/46k-website` hosting configurations.
- Playwright rendered the actual build artifact at 320, 390 and 1440px:
  all eight routes, images and horizontal overflow checks passed.
- Browser checks passed for empty/unknown/valid filters, the contact link and
  keyboard access to the skip link. Desktop and mobile screenshots were inspected.
- Because Windows sandbox networking blocks the local server, browser QA used
  intercepted requests served from the unmodified build artifact. An offline,
  clickable HTML export is provided separately for owner review.
- Local Astro build remains blocked by Windows sandbox `EPERM` filesystem errors.
  CI verification is independent of that local restriction.

## Publication

The owner enabled GitHub Pages. PR #2 includes the deployment workflow from
PR #1 and reads Pages' configured origin and base path when building on main.
A public Pages deployment has not yet been run or verified. Main-branch deployment
is the next step after approval of the preview. Do not change DNS until verified.

## Editorial safeguards

- Distinguish established evidence, emerging evidence and 46K interpretation.
- Assessment remains explicitly research and development, not a validated product.
- Do not make deterministic talent predictions or invent study/test results.
- Generated imagery depicts fictional people and situations; it is not evidence.
- New scientific or editorial content goes through review.
- No hourly monitoring is enabled.

## Remaining work

1. Review the preview and deploy the approved version.
2. Verify the resulting Pages URL and custom-domain configuration.
3. Connect and test the Pages CMS article editing, draft and media workflows.
4. Develop the next editorial content with sources and owner review.
