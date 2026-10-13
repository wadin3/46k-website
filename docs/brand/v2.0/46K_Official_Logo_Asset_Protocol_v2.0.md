# 46K — Official Logo & Asset Protocol v2.0

**Status:** ACTIVE / `LOCKED_ASSET` for four logos. Approved by the brand owner in October 2026. This protocol supersedes all older logo specifications, SVGs, flat-gold fallback logos, and AI-generated logo references for production.

## Exact production originals

| File | Background | Content |
| --- | --- | --- |
| `logos/46K_FullSignature_Light.png` | Light / Paper | Graphite 46, Gold K, Graphite divider and three-line descriptor |
| `logos/46K_FullSignature_Dark.png` | Dark / Graphite | Off-white 46, Gold K, off-white divider and three-line descriptor |
| `logos/46K_Essential_Light.png` | Light / Paper | Graphite 46 and Gold K only |
| `logos/46K_Essential_Dark.png` | Dark / Graphite | Off-white 46 and Gold K only |

**Light and Dark refer to the background the logo is designed for**, not to the lightness of its letters. Full Signature text reads `DECODING / FOOTBALL / INTELLIGENCE` on three lines. Essential has no divider or descriptor.

The brand owner has **visually approved all four designs**. The supplied PNG bytes are the production originals. Do not silently replace them with vector reconstructions or new AI outputs. PNG alpha-channel checks are recorded in `ASSET_MANIFEST.md`; this is **not** a claim that separately generated variants are pixel-identical.

## Non-negotiable

- Use only the four named production PNGs, unchanged in visual content.
- No generative redraw, tracing, retyping, new font substitution, re-kerning, sharpening, recoloring, AI regeneration, or replacement of the Gold K.
- Do not try to recreate the logo by prompting an image model to draw `46K`.
- The logo can be scaled proportionally and placed over a suitable background. Never stretch, crop, mask, distort, or overlap it.
- The approved K's actual Gold pixels are authoritative; `#C29D45` is a general brand accent, **not** a replacement for its metallic texture.
- Do not use the old v1.0/v1.2 SVGs or the old REF_01 as production logos. They are `SUPERSEDED — NOT FOR PRODUCTION`.
- If an approved file is unavailable, stop the logo-placement step and request the asset. Never generate a substitute.
- When exporting, verify that the actual embedded PNG has transparency, legible fine text, adequate contrast and intact edges. Avoid misleading previews generated from a different image.

## Content Machine implementation

1. Generate article text, imagery, diagrams and background **without a logo**.
2. Choose Full Signature where space allows; Essential for small areas and avatars.
3. Choose Light for a light background and Dark for a dark background.
4. Composite the correct PNG original as a separate deterministic layer, preserving its pixels and aspect ratio.
5. Preview the **actual exported file** on its intended background and check for clipping or missing pixels.
6. Publish only after the normal editorial and scientific review; brand asset use does not imply content approval.

## Supporting background

`backgrounds/46K_Paper_Graphite_Texture.png` is an **approved visual background** with Paper texture on the left and Graphite texture on the right. It is **not a logo** and must not be used to reconstruct the logo or alter its pixels. Other on-brand backgrounds remain permitted.

## Priority

1. Explicit current user decisions and approvals.
2. The four official original PNG files for exact logo appearance.
3. This v2.0 Logo & Asset Protocol for handling those originals.
4. The current v2.0 brand system for all other visual and verbal rules.
5. Other visual references, which never override locked assets.

**Generate the content. Never regenerate the brand.**
