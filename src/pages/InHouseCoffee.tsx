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
import { toast } from "@/hooks/use-toast";
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
  const [delivery, setDelivery] = useState<"room" | "counter">("room");

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
    setDelivery("room");
  };

  const handleSave = () => {
    toast({
      title: "Order received",
      description: `${selectedCoffee} for ${name} — Room/Unit ${accomNumber}. ${
        delivery === "room" ? "Room/Unit delivery." : "Pick up from Glass House counter."
      }`,
    });
    setSelectedCoffee(null);
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
