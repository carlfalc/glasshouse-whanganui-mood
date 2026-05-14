import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type CafeRow = {
  id: string;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function CafeHoursTab() {
  const [rows, setRows] = useState<CafeRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cafe_settings")
      .select("*")
      .order("day_of_week");
    if (error) toast.error(error.message);
    else setRows((data ?? []) as CafeRow[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: Partial<CafeRow>) => {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    const { error } = await supabase.from("cafe_settings").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else toast.success("Saved ✓");
  };

  if (loading) return <p className="text-slate-500 text-sm">Loading…</p>;

  const fmt = (t: string | null) => (t ? t.slice(0, 5) : "");

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
        <div className="col-span-3">Day</div>
        <div className="col-span-3">Open Time</div>
        <div className="col-span-3">Close Time</div>
        <div className="col-span-3">Closed Today</div>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.id} className="grid grid-cols-12 gap-2 px-6 py-3 items-center">
            <div className="col-span-3 font-medium text-slate-900">{DAYS[row.day_of_week]}</div>
            <div className="col-span-3">
              <Input
                type="time"
                value={fmt(row.open_time)}
                disabled={row.is_closed}
                onChange={(e) => update(row.id, { open_time: e.target.value })}
              />
            </div>
            <div className="col-span-3">
              <Input
                type="time"
                value={fmt(row.close_time)}
                disabled={row.is_closed}
                onChange={(e) => update(row.id, { close_time: e.target.value })}
              />
            </div>
            <div className="col-span-3">
              <Switch
                checked={row.is_closed}
                onCheckedChange={(v) => update(row.id, { is_closed: v })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
