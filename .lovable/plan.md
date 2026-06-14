## Goal

On the landing-page hero slider, the nav header text (Home, Menus, Culinary Specialists, About, Our People, Contact + logo/menu icon) is hard to read when the slider transitions to **image 2** (the lighter/whiter wine image). Keep the current cream colour on **image 1** (the main Glass House branding image), and switch the nav text to a dark colour only while image 2 is showing — then switch back to cream when it cycles back to image 1.

## Approach

The cross-fade is currently driven purely by CSS, so nothing in the app knows which slide is visible. To make the header react reliably, drive the active slide from React state shared between the hero and the header, so the colour change stays perfectly in sync with the image.

### 1. Share the active slide state

- Create a small shared signal for "is the light hero image currently active." Simplest reliable option: a lightweight React context (e.g. `HeroThemeContext`) provided in `Layout` (which already renders both `Header` and the page content), defaulting to "dark image / cream text."
- The home hero updates this signal as the slider advances; every other page leaves it at the default so nothing changes off the home page.

### 2. Drive the slider in React (replace CSS-only cycling)

- In `src/pages/Index.tsx`, advance the visible slide with a timer in state (one image shown at a time, cross-fading), instead of relying solely on the CSS `crossFade` keyframes. Each slide shows for the existing 15s interval so the visual pacing is unchanged.
- When the active slide is image 2 (`heroWine`), set the shared signal to "light image"; when it's image 1 (`heroGlasshouse`), set it back to "dark image."
- Reset the signal to default when leaving the home page.

### 3. Make the header colour respond

In `src/components/site/Header.tsx`:
- Read the shared signal. Only when the header is in its transparent state on the home page (`transparent === true`) AND the light image is active, render the nav links, logo and mobile menu icon in a dark colour (charcoal) instead of cream.
- The brass "Book" button, hover states, and active-link brass colour stay as-is (brass reads fine on both images).
- On image 1, and any time the header is in its solid/scrolled state, the text stays cream exactly as today — no change to the main branding image.

## Visual detail

- Image 1 (`heroGlasshouse`): nav text stays `text-cream` — unchanged.
- Image 2 (`heroWine`): nav text becomes `text-charcoal` (with a matching darker hover, e.g. still brass) for the duration that image is on screen, transitioning smoothly via the existing `transition-colors`.
- The change is scoped to the transparent home-hero header only; scrolled header and all other pages are untouched.

## Files changed

- `src/components/site/Layout.tsx` — provide the shared hero-theme context.
- `src/pages/Index.tsx` — drive the slider in React and publish which image is active.
- `src/components/site/Header.tsx` — switch nav/logo/menu-icon colour to dark while image 2 is active in the transparent home hero.
</content>
<summary>Make the hero slider drive a shared "active image" signal so the header nav text turns dark only while the lighter image 2 is showing, while image 1 keeps its cream branding colour.</summary>
</invoke>
