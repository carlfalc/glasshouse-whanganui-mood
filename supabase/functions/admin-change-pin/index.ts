// Allows a signed-in coffee admin to update the shared staff PIN.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization") ?? "";
  const accessToken = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!accessToken) return json({ error: "Missing authorization" }, 401);

  let payload: { pin?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const pin = typeof payload.pin === "string" ? payload.pin.trim() : "";
  if (!/^\d{4,12}$/.test(pin)) {
    return json({ error: "PIN must be 4–12 digits" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return json({ error: "Server is not configured" }, 500);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userResp, error: userErr } = await admin.auth.getUser(accessToken);
  if (userErr || !userResp?.user?.email) {
    return json({ error: "Invalid session" }, 401);
  }

  const email = userResp.user.email.toLowerCase();
  const { data: adminMatch, error: adminErr } = await admin
    .from("coffee_admin_users")
    .select("id")
    .ilike("email", email)
    .maybeSingle();
  if (adminErr) {
    console.error("admin-change-pin: admin check failed", adminErr);
    return json({ error: "Authorization check failed" }, 500);
  }
  if (!adminMatch) return json({ error: "Not authorised" }, 403);

  const { data: existing, error: existingErr } = await admin
    .from("admin_pin_settings")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (existingErr) {
    console.error("admin-change-pin: read failed", existingErr);
    return json({ error: "Could not read current PIN" }, 500);
  }

  if (existing) {
    const { error: updErr } = await admin
      .from("admin_pin_settings")
      .update({ pin, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (updErr) {
      console.error("admin-change-pin: update failed", updErr);
      return json({ error: "Could not update PIN" }, 500);
    }
  } else {
    const { error: insErr } = await admin.from("admin_pin_settings").insert({ pin });
    if (insErr) {
      console.error("admin-change-pin: insert failed", insErr);
      return json({ error: "Could not save PIN" }, 500);
    }
  }

  return json({ ok: true });
});
