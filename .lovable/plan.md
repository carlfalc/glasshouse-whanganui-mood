# Install Meta (Facebook) Pixel

Add the Meta Pixel (ID `1752939031669933`) so it fires on page load and on every in-app route change, since this is a single-page React app.

## Changes

**1. `index.html`**
- Add the Meta Pixel base `<script>` in `<head>` (initializes `fbq`, calls `fbq('init', ...)` and `fbq('track', 'PageView')`).
- Add the `<noscript>` tracking `<img>` fallback inside `<body>` (per HTML5 rules, the noscript pixel must live in the body, not the head).

**2. `src/components/site/Layout.tsx`**
- In the existing `useLocation` effect that already runs on `location.pathname` changes, add a `window.fbq?.('track', 'PageView')` call so navigation between pages (Menus, About, etc.) also registers a PageView. The first load is already covered by the base code in `index.html`.

**3. `src/vite-env.d.ts`**
- Add a small TypeScript global declaration for `window.fbq` so the tracking call type-checks cleanly.

## Notes
- The initial `fbq('track', 'PageView')` stays in `index.html` for the very first load; the Layout effect handles subsequent client-side navigations to avoid a double count on first load.
- No backend or business-logic changes; this is purely front-end analytics markup.