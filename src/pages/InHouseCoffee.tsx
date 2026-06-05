import { useState } from "react";
import Layout from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Minus, Plus } from "lucide-react";

const ROOM_NUMBERS = [
  ...Array.from({ length: 14 }, (_, i) => i + 1), // 1-14
  ...Array.from({ length: 14 }, (_, i) => 801 + i), // 801-814
  ...Array.from({ length: 23 }, (_, i) => 844 + i), // 844-866
];

const COFFEES = [
  "Flat White",
  "Latte",
  "Cappuccino",
  "Long Black",
  "Short Black / Espresso",
  "Americano",
  "Mocha",
  "Hot Chocolate",
  "Chai Latte",
  "Macchiato",
  "Piccolo",
  "Filter / Drip",
];

const MILK_OPTIONS = [
  "Full Cream",
  "Trim / Skim",
  "Soy",
  "Almond",
  "Oat",
  "Coconut",
  "Lactose-Free",
];

const InHouseCoffee = () => {
  const [accomNumber, setAccomNumber] = useState<string>("");
  const [name, setName] = useState("");
  const [selectedCoffee, setSelectedCoffee] = useState<string | null>(null);
  const [sugar, setSugar] = useState(0);
  const [milk, setMilk] = useState("Full Cream");
  const [decaf, setDecaf] = useState(false);
  const [delivery, setDelivery] = useState<"room" | "counter">("room");
  const [cupType, setCupType] = useState<"cup" | "takeaway" | "">("");
  const [takeawaySize, setTakeawaySize] = useState<"regular" | "large" | "">("");

  const openCoffee = (coffee: string) => {
    if (!accomNumber) {
      toast({
        title: "Please select your room or unit number",
        variant: "destructive",
      });
      return;
    }
    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    setSelectedCoffee(coffee);
    setSugar(0);
    setMilk("Full Cream");
    setDecaf(false);
    setDelivery("room");
    setCupType("");
    setTakeawaySize("");
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!cupType) {
      toast({ title: "Please choose a Cup or Takeaway Cup", variant: "destructive" });
      return;
    }
    if (cupType === "takeaway" && !takeawaySize) {
      toast({ title: "Please select Regular or Large", variant: "destructive" });
      return;
    }
    const cupLabel =
      cupType === "takeaway"
        ? `Takeaway Cup (${takeawaySize === "regular" ? "Regular" : "Large"})`
        : "Cup";

    const item = {
      coffee: selectedCoffee,
      decaf,
      sugar,
      milk,
      cup: cupLabel,
    };

    setSaving(true);
    try {
      const { error } = await supabase.from("coffee_orders").insert({
        room_number: accomNumber,
        guest_name: name.trim(),
        fulfilment_type: delivery === "room" ? "room_delivery" : "counter_pickup",
        items: [item],
        order_total: 0,
        charged_to_room: true,
        notes: `${decaf ? "Decaf " : ""}${selectedCoffee}. ${cupLabel}. Sugar: ${sugar}. Milk: ${milk}.`,
      });

      if (error) {
        toast({ title: "Could not place order", description: error.message, variant: "destructive" });
        return;
      }

      toast({
        title: "Order received",
        description: `${decaf ? "Decaf " : ""}${selectedCoffee} for ${name} — Room/Unit ${accomNumber}. ${cupLabel}. ${
          delivery === "room" ? "Room/Unit delivery." : "Pick up from Glass House counter."
        }`,
      });
      setSelectedCoffee(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout
      title="In House Coffee Order — Glass House"
      description="Order coffee to your room or unit at Glass House, Whanganui."
    >
      <section className="bg-background pt-32 pb-24">
        <div className="container-narrow max-w-3xl">
          <p className="text-[11px] uppercase tracked text-brass mb-6 text-center">
            Room Service
          </p>
          <h1 className="font-serif text-cream text-3xl md:text-4xl lg:text-5xl tracked-tight uppercase mb-10 text-center">
            In House Coffee Order
          </h1>

          {/* Room/Unit number */}
          <div className="mb-6">
            <Label className="text-cream mb-2 block">Select Room or Unit Number</Label>
            <Select value={accomNumber} onValueChange={setAccomNumber}>
              <SelectTrigger>
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {ROOM_NUMBERS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="mb-10">
            <Label className="text-cream mb-2 block">Your Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              maxLength={60}
            />
          </div>

          {/* Coffee selection */}
          <h2 className="font-serif text-cream text-2xl uppercase tracked-tight mb-4">
            Select a Coffee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COFFEES.map((c) => (
              <Button
                key={c}
                variant="outline"
                className="justify-start h-auto py-4 text-base"
                onClick={() => openCoffee(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Customisation Dialog */}
      <Dialog
        open={!!selectedCoffee}
        onOpenChange={(o) => !o && setSelectedCoffee(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif uppercase tracked-tight">
              {selectedCoffee}
            </DialogTitle>
            <DialogDescription>
              {name} — Room/Unit {accomNumber}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Sugar */}
            <div>
              <Label className="mb-2 block">Sugar</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => setSugar((s) => Math.max(0, s - 1))}
                  disabled={sugar === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-lg font-medium">
                  {sugar}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => setSugar((s) => Math.min(6, s + 1))}
                  disabled={sugar === 6}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Milk */}
            <div>
              <Label className="mb-2 block">Milk</Label>
              <RadioGroup value={milk} onValueChange={setMilk}>
                {MILK_OPTIONS.map((m) => (
                  <div key={m} className="flex items-center space-x-2">
                    <RadioGroupItem value={m} id={`milk-${m}`} />
                    <Label htmlFor={`milk-${m}`} className="cursor-pointer">
                      {m}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Decaf */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="decaf"
                checked={decaf}
                onCheckedChange={(c) => setDecaf(c === true)}
              />
              <Label htmlFor="decaf" className="cursor-pointer">
                Decaf
              </Label>
            </div>

            {/* Cup choice */}
            <div>
              <Label className="mb-2 block">Cup Choice</Label>
              <RadioGroup
                value={cupType}
                onValueChange={(v: "cup" | "takeaway") => {
                  setCupType(v);
                  if (v !== "takeaway") setTakeawaySize("");
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cup" id="cup-in" />
                  <Label htmlFor="cup-in" className="cursor-pointer">
                    Cup
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="takeaway" id="cup-takeaway" />
                  <Label htmlFor="cup-takeaway" className="cursor-pointer">
                    Takeaway Cup
                  </Label>
                </div>
              </RadioGroup>

              {cupType === "takeaway" && (
                <div className="mt-3 pl-6">
                  <Label className="mb-2 block">Takeaway Size</Label>
                  <RadioGroup
                    value={takeawaySize}
                    onValueChange={(v: "regular" | "large") => setTakeawaySize(v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="size-regular" />
                      <Label htmlFor="size-regular" className="cursor-pointer">
                        Regular
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="size-large" />
                      <Label htmlFor="size-large" className="cursor-pointer">
                        Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            {/* Delivery */}
            <div>
              <Label className="mb-2 block">Delivery</Label>
              <RadioGroup
                value={delivery}
                onValueChange={(v: "room" | "counter") => setDelivery(v)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="room" id="del-room" />
                  <Label htmlFor="del-room" className="cursor-pointer">
                    Room/Unit delivery
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="counter" id="del-counter" />
                  <Label htmlFor="del-counter" className="cursor-pointer">
                    Pick up from Glass House counter
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <p className="text-sm text-muted-foreground border-t border-border pt-4">
            This will be charged to your room {accomNumber}.
          </p>


          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCoffee(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default InHouseCoffee;
