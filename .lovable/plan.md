## What's happening

The header navigation fix is already live and confirmed working in the preview. The full horizontal menu (Home, Menus, Culinary Specialists, About, Our People, Contact) shows along the top on wider screens.

The reason you still see the hamburger is the **breakpoint**: the menu currently switches to horizontal only at **768px wide and up**. Your preview window is ~726px wide, just below that line, so it still shows the hamburger. It is not a caching problem.

## The decision

There are six menu items plus a Book button. On genuinely small phone screens they won't fit on one line, which is why a hamburger exists at all. The question is where to draw the line.

### Option A — Lower the breakpoint (recommended)
Switch the horizontal menu to appear from a smaller width (e.g. ~640px) so it shows on tablets and narrow desktop windows like yours, only collapsing to a hamburger on actual phones. The labels would wrap to a second line if space is tight.

### Option B — Always horizontal, never a hamburger
Remove the hamburger entirely so the headings are always along the top at every screen size. On small phones the items would shrink/wrap and could look cramped, but it matches "put it back exactly how it was."

## Technical detail
- File: `src/components/site/Header.tsx`
- Option A: change the `md:flex` / `md:hidden` breakpoints to `sm:` (or a custom `min-[640px]`) on the desktop `<nav>`, the mobile button wrapper, and the mobile overlay.
- Option B: make the desktop `<nav>` always `flex`, remove the hamburger button block and the mobile overlay.
