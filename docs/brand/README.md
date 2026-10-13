# 46K Brand Library

The supplied October 2026 v2.0 documents are preserved unchanged in
`v2.0/`. Start with [START HERE](v2.0/46K_00_START_HERE_v2.0.md), then
follow its reading order. The [full specification](v2.0/46K_AI_Production_Spec_v2.0.md)
defines the written system; the [logo protocol](v2.0/46K_Official_Logo_Asset_Protocol_v2.0.md)
defines handling of the exact approved PNG originals.

## Repository paths

| Material | Repository location | Role |
| --- | --- | --- |
| Nine original Markdown files | `docs/brand/v2.0/` | Brand specification, workflows and source manifest |
| Six reference boards | `docs/brand/v2.0/references/` | STYLE_REFERENCE; internal design calibration |
| Four official logo PNGs | `public/brand/logos/` | LOCKED_ASSET; production originals |
| Approved optional background | `public/brand/backgrounds/46K_Paper_Graphite_Texture.png` | Supporting production background |

The relative `logos/` and `backgrounds/` paths in the original documents
refer to the source bundle. In this repository they map to the public
paths above. Do not create duplicate logo copies inside the documentation.
Astro serves public assets without the `public/` prefix; account for the
configured deployment base when using them in the website.

## Verified production originals

The four uploaded logo files were verified against the source
`ASSET_MANIFEST.md` SHA-256 values on 2026-10-13. Only their filenames were
standardized; the image bytes are unchanged.

| Previous upload filename | Canonical production filename |
| --- | --- |
| `46K Full Signature Light.png` | `46K_FullSignature_Light.png` |
| `46K Full Signature Dark.png` | `46K_FullSignature_Dark.png` |
| `46K essential Light.png` | `46K_Essential_Light.png` |
| `46K essential Dark.png` | `46K_Essential_Dark.png` |

The supporting background also matches the source manifest. This verifies
file identity; it does not add a claim about visual quality or image rights.

## Reference inventory

Available: REF_02 Overall Creative Direction, REF_03 Graphic Language,
REF_04 Photography & Imagery, REF_05 Layout, Data & UI, REF_06 Applications,
and REF_08 Performance Calibration.

REF_07 Gold & Materiality is named in the index but was not supplied.
REF_01 is superseded and is not required. Finished test screens, final
font selections and reusable production templates are not supplied.

## Interpretation

- Explicit current user instructions take precedence over attached documents.
- Written colors and rules override incidental details in reference boards.
- Reference boards are not website artwork, approved copy, real scientific
  data, production UI or substitutes for official logos.
- The Quick Context contains an older flat-Gold fallback sentence. Its
  v2.0 logo override and the Official Logo Protocol prohibit that fallback;
  always use the unchanged official PNGs.
- Keep internal references outside `public/`; do not publish them as site media.
- Organizing these assets does not approve new editorial content or a redesign.

## Website status

GitHub Pages was enabled by the owner on 2026-10-13. The deployment workflow
is prepared in [PR #1](https://github.com/wadin3/46k-website/pull/1), which
was still open during this import. A successful live deployment has not
yet been confirmed. Logo placement and visual redesign are separate work.
