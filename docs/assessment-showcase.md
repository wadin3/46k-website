# Assessment section 03

Based on the owner's `Mäta 03.docx` and twelve approved supplied PNGs.
Originals remain unchanged in the supplied Downloads folder. Only WebP
encoding at quality 96 was performed; no image content was regenerated.

Original total: 25,351,854 bytes. WebP total: 3,403,780 bytes (86.6% smaller).
Previous quality-90 export was 2,048,100 bytes; the revised balance favors
fine details in the illustrative device screens. No artificial upscaling.
Full source dimensions retained for the device interfaces and diagrams.
No external media or animation dependencies.

Three data-defined series in ProductShowcase.astro: Test, Profile,
Development. Width units 3/2/1/2 (reordered per series) satisfy wide +
narrow = two medium widths. Mobile/tablet uses 2x2 compositions with extra
width for the text card, keeping complete words readable.
Text backgrounds carry localized HTML, never rasterized type.
Word spans prohibit hyphenation. A measured, resize/font-aware fit reduces
type only when translated words or the line stack exceed the card. Test
copy has an explicit paragraph-level line break after its first sentence.

The Web Animations API uses a shared 18-second cycle, offset by six
seconds per group: five seconds stationary, one second eased movement.
All assets decode before starting. Loading begins near the section.
The first series has a stable footprint before enhancement and without
JavaScript. Reduced-motion visitors receive all three static series.
Offscreen and hidden-tab animations pause; hover never pauses.
No navigation controls, focus targets or live-region announcements.
Localized conceptual-product disclosure covers all illustrative screens.

This remains a review preview, not a release or deployed product.
