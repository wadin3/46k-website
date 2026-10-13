# 46K — AI Brand System v2.0

**Official October 2026 instruction and asset package.**

## Contents

- `46K_00_START_HERE_v2.0.md` — entry point and reading order.
- `46K_AI_Quick_Context_v2.0.md` — brand voice, palette, positioning and guardrails.
- `46K_AI_Production_Spec_v2.0.md` — full brand and design system (carried forward from v1.3 with logo updates).
- `46K_Asset_Production_Protocol_v2.0.md` — production workflow and logo placement rules.
- `46K_Visual_Reference_Index_v2.0.md` — visual references and updated REF_01 handling.
- `46K_Official_Logo_Asset_Protocol_v2.0.md` — binding LOCKED_ASSET policy.
- `46K_Content_Machine_Instructions_v2.0.md` — practical article and asset production workflow.
- `logos/` — four visually approved official logo PNG originals.
- `backgrounds/` — approved split Paper/Graphite texture.
- `ASSET_MANIFEST.md` — actual file dimensions, alpha information and checksums.

## Install / migrate

1. Back up the previous AI instruction files.
2. Replace older `.md` brand instructions with these seven v2.0 `.md` instruction files. Keep `ASSET_MANIFEST.md` and this README for reference.
3. Place all four `logos/*.png` in a stable brand asset location accessible to Content Machine, with the **same filenames**.
4. Place `backgrounds/46K_Paper_Graphite_Texture.png` in the background asset location.
5. Update Content Machine's asset paths if the files live in a different folder; never change the actual image bytes as part of this migration.
6. Retire old logo SVGs, flat variants, logo package v1.x and old REF_01 from **production use**. Archive rather than delete if you want history.
7. Keep existing visual references REF_02–REF_08 as STYLE_REFERENCE. They are not included again in this package.
8. Test one light and one dark website/social composition using the actual embedded PNGs before rollout.

## Project Sources limitation

If your 46K ChatGPT Project does not accept `.md`, upload the instruction files to GitHub or a supported document format; do not assume ZIP contents will be automatically read by new chats. Make sure Content Machine has direct access to both instructions and image files.

## Approval and verification

The four logo designs are **visually approved by the owner**. The files are the approved sources, but no claim is made that separate AI-generated variants are pixel-identical. Only format/dimensions/alpha presence were checked in this package. Do not redesign them during installation.
