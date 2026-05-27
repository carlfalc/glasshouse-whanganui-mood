## Hero image cleanup + layout fix

**1. Clean up the hero image**
Edit `src/assets/hero-glasshouse-logo.png` to remove the "HIGGSFIELD / AI" watermark in the bottom-right corner, keeping the dark green background and the gold "GLASSHOUSE" lettering unchanged. Save back to the same path so the import keeps working.

**2. Stop the headline overlapping the gold "GLASSHOUSE" lettering**
On the home page hero (`src/pages/Index.tsx`), the H1 "Creative New Zealand Dining." currently sits across the gold GLASSHOUSE lettering baked into the image. Adjust the hero so the gold GLASSHOUSE sits clearly above the white headline:

- Shift the text block (headline + Menus/Book buttons) to the bottom of the screen with more bottom padding, so it sits below the gold lettering rather than across it.
- Slightly nudge the background image's vertical focus upward (`object-position: center top`) on the glasshouse slide so the gold word reads in the upper/middle third.
- Keep the dark gradient overlay so the white headline stays legible.

No changes to the wine slide, carousel timing, nav, or other sections.

### Technical notes
- Image edit: use the image edit tool with a prompt to inpaint over the watermark area with the existing dark green textured background.
- Layout: tweak the existing `flex flex-col justify-end pb-24 md:pb-32` block in the hero `<section>` (likely to `justify-end pb-12 md:pb-16` plus an `object-position` utility on the first slide image). No new components.