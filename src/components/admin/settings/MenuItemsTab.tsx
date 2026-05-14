import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  base_price: number;
  is_active: boolean;
  sort_order: number;
};

const CATEGORIES = ["Coffee", "Tea", "Other"] as const;

export function MenuItemsTab() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category")
      .order("sort_order");
    if (error) toast.error(error.message);
    else setItems((data ?? []) as MenuItem[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: Partial<MenuItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    const { error } = await supabase.from("menu_items").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else toast.success("Saved ✓");
  };

  const remove = async (item: MenuItem) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    toast.success("Deleted");
  };

  if (loading) return <p className="text-slate-500 text-sm">Loading…</p>;

  const grouped = CATEGORIES.map((c) => ({ category: c, rows: items.filter((i) => i.category === c) }));

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setAdding(true)}
          className="bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white"
        >
          <Plus className="w-4 h-4 mr-1" /> Add New Item
        </Button>
      </div>

      <div className="space-y-8">
        {grouped.map(({ category, rows }) => (
          <div key={category} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
              {category}
            </div>
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-12 gap-2 px-6 py-2 text-xs uppercase tracking-wide text-slate-500">
                <div className="col-span-5">Name</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Active</div>
                <div className="col-span-2">Sort</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {rows.length === 0 && (
                <div className="px-6 py-4 text-sm text-slate-400">No items</div>
              )}
              {rows.map((item, idx) => (
                <Row
                  key={item.id}
                  item={item}
                  onUpdate={(patch) => update(item.id, patch)}
                  onDelete={() => setDeleteTarget(item)}
                  onMoveUp={idx > 0 ? () => {
                    const above = rows[idx - 1];
                    update(item.id, { sort_order: above.sort_order });
                    update(above.id, { sort_order: item.sort_order });
                  } : undefined}
                  onMoveDown={idx < rows.length - 1 ? () => {
                    const below = rows[idx + 1];
                    update(item.id, { sort_order: below.sort_order });
                    update(below.id, { sort_order: item.sort_order });
                  } : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <AddItemDialog
        open={adding}
        onClose={() => setAdding(false)}
        onAdded={(item) => { setItems((p) => [...p, item]); }}
      />

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
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Row({
  item, onUpdate, onDelete, onMoveUp, onMoveDown,
}: {
  item: MenuItem;
  onUpdate: (patch: Partial<MenuItem>) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(String(item.base_price));
  const [sort, setSort] = useState(String(item.sort_order));

  useEffect(() => { setName(item.name); }, [item.name]);
  useEffect(() => { setPrice(String(item.base_price)); }, [item.base_price]);
  useEffect(() => { setSort(String(item.sort_order)); }, [item.sort_order]);

  return (
    <div className="grid grid-cols-12 gap-2 px-6 py-2 items-center">
      <Input
        className="col-span-5"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => { if (name !== item.name) onUpdate({ name }); }}
      />
      <Input
        className="col-span-2"
        type="number"
        step="0.10"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onBlur={() => {
          const n = parseFloat(price);
          if (!isNaN(n) && n !== item.base_price) onUpdate({ base_price: n });
        }}
      />
      <div className="col-span-2">
        <Switch checked={item.is_active} onCheckedChange={(v) => onUpdate({ is_active: v })} />
      </div>
      <div className="col-span-2 flex items-center gap-1">
        <Input
          type="number"
          className="w-16"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          onBlur={() => {
            const n = parseInt(sort, 10);
            if (!isNaN(n) && n !== item.sort_order) onUpdate({ sort_order: n });
          }}
        />
        <Button size="icon" variant="ghost" disabled={!onMoveUp} onClick={onMoveUp}>
          <ArrowUp className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" disabled={!onMoveDown} onClick={onMoveDown}>
          <ArrowDown className="w-4 h-4" />
        </Button>
      </div>
      <div className="col-span-1 text-right">
        <Button size="icon" variant="ghost" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>
    </div>
  );
}

function AddItemDialog({
  open, onClose, onAdded,
}: { open: boolean; onClose: () => void; onAdded: (item: MenuItem) => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("Coffee");
  const [price, setPrice] = useState("0.00");
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const reset = () => { setName(""); setCategory("Coffee"); setPrice("0.00"); setActive(true); };

  const submit = async () => {
    setSaving(true);
    const { data, error } = await supabase
      .from("menu_items")
      .insert({ name, category, base_price: parseFloat(price) || 0, is_active: active, sort_order: 99 })
      .select()
      .single();
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Added");
    onAdded(data as MenuItem);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New Item</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Base Price ($)</Label>
            <Input type="number" min="0" step="0.10" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={active} onCheckedChange={setActive} /> <Label>Active</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={submit}
            disabled={saving || !name}
            className="bg-[hsl(25_45%_25%)] hover:bg-[hsl(25_45%_20%)] text-white"
          >Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
