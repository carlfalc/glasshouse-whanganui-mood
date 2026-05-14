// Coffee admin PIN login. Validates the staff PIN and returns a one-time
// email OTP for the shared admin auth account, which the client then
// exchanges for a Supabase session via supabase.auth.verifyOtp.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SHARED_ADMIN_EMAIL = "staff@glasshouse-coffee.local";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

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

  const { data: pinRow, error: pinErr } = await admin
    .from("admin_pin_settings")
    .select("pin")
    .limit(1)
    .maybeSingle();

  if (pinErr || !pinRow) {
    console.error("admin-pin-login: pin read failed", pinErr);
    return json({ error: "PIN is not configured" }, 500);
  }

  if (pin !== pinRow.pin) {
    return json({ error: "Incorrect PIN" }, 401);
  }

  // Ensure the shared admin auth user exists. createUser is idempotent for our
  // purposes: if the email already exists we ignore the resulting error.
  const { error: createErr } = await admin.auth.admin.createUser({
    email: SHARED_ADMIN_EMAIL,
    email_confirm: true,
  });
  if (createErr && !/already/i.test(createErr.message)) {
    console.error("admin-pin-login: createUser failed", createErr);
    return json({ error: "Could not prepare admin account" }, 500);
  }

  const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: SHARED_ADMIN_EMAIL,
  });

  if (linkErr || !linkData?.properties?.email_otp) {
    console.error("admin-pin-login: generateLink failed", linkErr);
    return json({ error: "Could not start admin session" }, 500);
  }

  return json({
    email: SHARED_ADMIN_EMAIL,
    token: linkData.properties.email_otp,
  });
});
