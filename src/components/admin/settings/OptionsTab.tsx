import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Option = {
  id: string;
  option_group: string;
  name: string;
  price_modifier: number;
  is_active: boolean;
  sort_order: number;
};

const GROUPS = ["Sizes", "Milks", "Extras"] as const;

export function OptionsTab() {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Option | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_options")
      .select("*")
      .order("option_group")
      .order("sort_order");
    if (error) toast.error(error.message);
    else setOptions((data ?? []) as Option[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: Partial<Option>) => {
    setOptions((p) => p.map((o) => (o.id === id ? { ...o, ...patch } : o)));
    const { error } = await supabase.from("menu_options").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else toast.success("Saved ✓");
  };

  const remove = async (opt: Option) => {
    const { error } = await supabase.from("menu_options").delete().eq("id", opt.id);
    if (error) return toast.error(error.message);
    setOptions((p) => p.filter((o) => o.id !== opt.id));
    toast.success("Deleted");
  };

  const add = async (group: string, name: string, mod: number): Promise<void> => {
    const { data, error } = await supabase
      .from("menu_options")
      .insert({ option_group: group, name, price_modifier: mod, is_active: true, sort_order: 99 })
      .select().single();
    if (error) { toast.error(error.message); return; }
    setOptions((p) => [...p, data as Option]);
    toast.success("Added");
  };

  if (loading) return <p className="text-slate-500 text-sm">Loading…</p>;

  return (
    <div className="space-y-8">
      {GROUPS.map((group) => {
        const rows = options.filter((o) => o.option_group === group);
        return (
          <div key={group} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
              {group}
            </div>
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-12 gap-2 px-6 py-2 text-xs uppercase tracking-wide text-slate-500">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Price Modifier</div>
                <div className="col-span-2">Active</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {rows.map((o) => (
                <OptionRow
                  key={o.id}
                  option={o}
                  onUpdate={(patch) => update(o.id, patch)}
                  onDelete={() => setDeleteTarget(o)}
                />
              ))}
            </div>
            <AddInline group={group} onAdd={add} />
          </div>
        );
      })}

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { if (deleteTarget) remove(deleteTarget); setDeleteTarget(null); }}
              className="bg-red-600 hover:bg-red-700"
            >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function OptionRow({
  option, onUpdate, onDelete,
}: { option: Option; onUpdate: (p: Partial<Option>) => void; onDelete: () => void }) {
  const [name, setName] = useState(option.name);
  const [mod, setMod] = useState(String(option.price_modifier));
  useEffect(() => { setName(option.name); }, [option.name]);
  useEffect(() => { setMod(String(option.price_modifier)); }, [option.price_modifier]);

  return (
    <div className="grid grid-cols-12 gap-2 px-6 py-2 items-center">
      <Input
        className="col-span-6"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => { if (name !== option.name) onUpdate({ name }); }}
      />
      <Input
        className="col-span-3"
        type="number" step="0.10"
        value={mod}
        onChange={(e) => setMod(e.target.value)}
        onBlur={() => {
          const n = parseFloat(mod);
          if (!isNaN(n) && n !== option.price_modifier) onUpdate({ price_modifier: n });
        }}
      />
      <div className="col-span-2">
        <Switch checked={option.is_active} onCheckedChange={(v) => onUpdate({ is_active: v })} />
      </div>
      <div className="col-span-1 text-right">
        <Button size="icon" variant="ghost" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>
    </div>
  );
}

function AddInline({
  group, onAdd,
}: { group: string; onAdd: (group: string, name: string, mod: number) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mod, setMod] = useState("0.00");
  const label = group === "Sizes" ? "Size" : group === "Milks" ? "Milk" : "Extra";

  if (!open) {
    return (
      <div className="px-6 py-3 border-t border-slate-100">
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add {label}
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-3 border-t border-slate-100 flex gap-2 items-center">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
      <Input placeholder="0.00" type="number" step="0.10" value={mod}
        onChange={(e) => setMod(e.target.value)} className="w-32" />
      <Button
        size="sm"
        onClick={async () => {
          if (!name) return;
          await onAdd(group, name, parseFloat(mod) || 0);
          setName(""); setMod("0.00"); setOpen(false);
        }}
        className="bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white"
      >Save</Button>
      <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    </div>
  );
}
