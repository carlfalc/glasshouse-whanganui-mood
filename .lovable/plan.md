## Problem

The PDF "Culinary Specialists" content was pasted directly into `src/pages/OurPeople.tsx`, overwriting the original "Our People" team org-chart (staff names + photos). Both menu items ("Culinary Specialists" and "Our People") currently point to `/our-people`, so the team page is gone.

## Goal

- Keep the current Culinary Specialists content, but serve it at `/culinary-specialists`.
- Restore the original "Our People" team page (org-chart of staff names) at `/our-people`.
- Point each menu item to its correct route.

## Changes

1. **Create `src/pages/CulinarySpecialists.tsx`** — move the current content of `OurPeople.tsx` (the Kia ora letter, Kitchen Team credentials, French-Trained Sous Chef + Telegraph link, Front of House & Bar with the MONIN announcement popup, Global Footprint, Why This Matters) into this new file, renamed component `CulinarySpecialists`.

2. **Rebuild `src/pages/OurPeople.tsx`** as the original team org-chart layout:
   - **Executive Chef** — Matthew Tressider, centered alone at top.
   - **Sous Chefs** (rows of three) — Robbie Beint, Kumar Sanket, Naureen Shaik, Muhammad Rehan, Saroj Bhandari.
   - **Breakfast Chef** — Nicola Wright, centered alone at bottom.
   - Each member rendered as a card: portrait (`about-hero.jpg` placeholder, as before), name, role, and a placeholder bio line (bios to be added later).
   - Same cream/brass styling, fonts, and `Layout` wrapper as the rest of the site.

3. **`src/App.tsx`** — add a route `"/culinary-specialists"` → `CulinarySpecialists`, keep `"/our-people"` → `OurPeople`.

4. **`src/components/site/Header.tsx`** — change the "Culinary Specialists" nav item `to` from `/our-people` to `/culinary-specialists`; leave "Our People" → `/our-people`.

5. **Verify** other links: `Footer.tsx` ("Our People" → `/our-people`) and `Index.tsx` tile ("Our People" → `/our-people`) stay as-is and remain correct.

## Notes

- Original bios weren't finalized ("I'll add bios later"), so cards will use a short placeholder bio that's easy to replace.
- Portraits reuse `about-hero.jpg` as in the original implementation; real headshots can be swapped in later.

## Technical details

- Routes registered in `src/App.tsx` via `react-router-dom`.
- Team data as an array (`name`, `role`, `bio`) grouped/filtered by role for the three layout tiers; responsive grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for Sous Chefs.
