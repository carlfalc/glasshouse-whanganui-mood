import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePinTab() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{4,12}$/.test(pin)) return toast.error("PIN must be 4–12 digits");
    if (pin !== confirmPin) return toast.error("PINs do not match");

    setSaving(true);
    const { error } = await supabase.functions.invoke("admin-change-pin", {
      body: { pin },
    });
    setSaving(false);

    if (error) {
      const message =
        (error as { context?: { error?: string } }).context?.error ?? error.message ?? "Could not update PIN";
      return toast.error(message);
    }

    setPin("");
    setConfirmPin("");
    toast.success("Staff PIN updated");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Staff PIN</h2>
      <p className="text-sm text-slate-500 mb-6">
        Anyone with this PIN can sign in to the coffee admin. Share it only with trusted staff.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="new-pin">New PIN</Label>
          <Input
            id="new-pin"
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={12}
            className="mt-1 tracking-[0.5em] text-center text-lg"
            placeholder="••••"
          />
        </div>
        <div>
          <Label htmlFor="confirm-pin">Confirm PIN</Label>
          <Input
            id="confirm-pin"
            type="password"
            inputMode="numeric"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={12}
            className="mt-1 tracking-[0.5em] text-center text-lg"
            placeholder="••••"
          />
        </div>
        <Button
          type="submit"
          disabled={saving || pin.length < 4}
          className="bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white"
        >
          {saving ? "Saving…" : "Update PIN"}
        </Button>
      </form>
    </div>
  );
}
