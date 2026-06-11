# Hide Order Coffee from visitors

Goal: keep the entire coffee ordering system live and reachable by direct URL, but remove it from anywhere a normal visitor would discover it — so the site can go live before coffee ordering opens.

## What changes

1. **Remove the "Order Coffee" link from the main navigation** (`src/components/site/Header.tsx`). It currently shows in both the desktop nav and the mobile menu. Removing the single `navItems` entry hides it in both places.

2. **Leave everything else untouched:**
   - All routes stay registered in `App.tsx` (`/order-coffee`, `/order-coffee/in-house`, and the `/coffee/admin/*` pages), so they remain fully functional via direct link.
   - The Order Coffee pages, admin login, and backend stay live.
   - The hidden "Admin" link lives on the Order Coffee page itself — since that page is no longer linked, you (the team) can still reach it by going directly to `/order-coffee`.

## Result

A visitor landing on the site sees: Home · Menus · Culinary Specialists · About · Our People · Contact — no Order Coffee. When you're ready to open ordering in a few weeks, I just add the nav link back.

## Technical detail

Delete the `{ to: "/order-coffee", label: "Order Coffee" }` object from the `navItems` array in `Header.tsx`. No route or page deletions.