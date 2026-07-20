# Verify glasshousemenu.com in Google Search Console

You're using the **Domain property** method, which needs one TXT record added to your domain's DNS. Since `glasshousemenu.com` was bought through Lovable, you add it yourself in the Lovable DNS manager — I can't add DNS records for you from here, but the steps below are exact.

## Steps

1. In Lovable, open **Project Settings → Project → Domains**.
2. Find **glasshousemenu.com**, click the **⋯ (three-dot menu) → Configure**.
3. Click **Manage DNS records → Add record**, and enter exactly:
   - **Type:** `TXT`
   - **Name / Host:** `@` (this means the root domain — some UIs show it as blank or as `glasshousemenu.com`; use `@`)
   - **Value / Content:** `google-site-verification=oVZ3iP3Ya8I59fX235iJUYatp5uyEzE9OdQxFO58-Zo`
   - **TTL:** leave default (usually 3600 / 1 hour)
4. Save the record.

## Then

5. Wait 5–30 minutes for DNS to propagate (can take up to a few hours in rare cases).
6. Optional check: open https://dnschecker.org, choose **TXT**, enter `glasshousemenu.com`, and confirm the `google-site-verification=oVZ3iP3Ya8I59fX235iJUYatp5uyEzE9OdQxFO58-Zo` value appears.
7. Go back to Google Search Console and click **Verify** on the Domain property.

## Common reasons verification fails

- **Wrong Name field.** It must be `@` (root), not `www` and not the full domain typed into a subdomain slot.
- **Extra characters.** The value must be exactly `google-site-verification=oVZ3iP3Ya8I59fX235iJUYatp5uyEzE9OdQxFO58-Zo` — no quotes, no trailing spaces, no line breaks.
- **Verified too early.** If you clicked Verify within a minute of saving, DNS hadn't propagated yet. Wait and click Verify again — the record stays valid, you can retry as many times as needed.
- **Old TXT record still there.** If a previous google-site-verification TXT is present with a different code, leave it — multiple TXT records are fine — but make sure the new one is also saved as its own record.

## Fallback if DNS verification keeps failing

Add a second property in Search Console as a **URL prefix** for `https://glasshousemenu.com/` and choose the **HTML tag** method. The `<meta name="google-site-verification" ...>` tag is already in your site's `<head>`, so it verifies instantly once the site is published — no DNS needed.

Reply once you've added the TXT record (or if you hit a snag on any step) and I'll help you push the re-index request for the homepage so the "fine dining" snippet refreshes.
