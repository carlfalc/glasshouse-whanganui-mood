# Embed the NowBookit booking tool on the "Book" buttons

## Recommendation
Use the **Embedded Version (iframe, transparent background, no logo)** inside a popup modal — not the plain button link.

Why: the iframe keeps guests on the Glasshouse site to complete their reservation (better branding, no jarging redirect to an external domain), and the transparent/no-logo version blends with the site's dark theme. The plain button link would bounce users off-site to `bookings.nowbookit.com`. We'll still keep the raw link as a fallback ("Open booking page") for anyone who has trouble loading the embed.

## What changes
There are three "Book" buttons today, all currently `tel:` links:
- `src/components/site/Header.tsx` — desktop nav (line 72) and mobile nav (line 81)
- `src/pages/Index.tsx` — hero CTA (line 74)

All three will be converted to buttons that open a shared **Booking dialog**.

## Implementation

1. **New component `src/components/site/BookingDialog.tsx`**
   - Built on the existing shadcn `Dialog` (same pattern as the menu dialogs).
   - Renders the NowBookit iframe:
     `https://bookings.nowbookit.com/?accountid=fd783466-dac6-4d4e-b82a-8c0b0f85e9a8&venueid=14762&colors=hex,056f00`
   - Loads the NowBookit iframe-resizer script (`https://plugins.nowbookit.com/iframe-resizer-build/bundle.js`) once, on mount, so the embed auto-sizes.
   - Iframe set to full width, min-height (~600–700px) with vertical scroll for smaller screens; styled to fit the dark theme.
   - Footer link "Open booking page in a new tab" → the direct booking URL (fallback).
   - Dialog title "Book a Table" for accessibility/SEO.

2. **Shared open state**
   - Simplest approach: each location keeps local `useState` for open/close and renders its own `<BookingDialog>` instance. (Header and Index are separate trees, so a small local state in each is cleanest — no global context needed.)

3. **Header.tsx**
   - Replace the two `tel:` anchors with `<button>`s that set `bookingOpen = true`.
   - Render one `<BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />`.
   - Keep identical brass button styling.

4. **Index.tsx**
   - Replace the hero `tel:` anchor with a `<button>` opening the dialog.
   - Render a `<BookingDialog>` instance.
   - Keep identical styling.

## Notes / technical detail
- The phone number (`tel:0062424177`) is removed from these CTAs since they become booking actions; the phone number remains available on the Contact page.
- The external script is loaded dynamically (injected `<script>` tag) and guarded so it's only added once even with multiple dialog instances.
- No backend changes required; this is purely a frontend embed.
