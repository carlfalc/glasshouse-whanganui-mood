import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import dinner1 from "@/assets/dinner-menu-v4-page-1.png.asset.json";
import dinner2 from "@/assets/dinner-menu-v4-page-2.png.asset.json";
import dinner3 from "@/assets/dinner-menu-v4-page-3.png.asset.json";
import dinner4 from "@/assets/dinner-menu-v4-page-4.png.asset.json";
import dinner5 from "@/assets/dinner-menu-v4-page-5.png.asset.json";
import dinner6 from "@/assets/dinner-menu-v4-page-6.png.asset.json";
import dinner7 from "@/assets/dinner-menu-v4-page-7.png.asset.json";
import dinner8 from "@/assets/dinner-menu-v4-page-8.png.asset.json";
import cellar1 from "@/assets/cellar-menu-v3-page-1.jpg.asset.json";
import cellar2 from "@/assets/cellar-menu-v3-page-2.jpg.asset.json";
import cellar3 from "@/assets/cellar-menu-v3-page-3.jpg.asset.json";
import cellar4 from "@/assets/cellar-menu-v3-page-4.jpg.asset.json";
import cellar5 from "@/assets/cellar-menu-v3-page-5.jpg.asset.json";
import cellar6 from "@/assets/cellar-menu-v3-page-6.jpg.asset.json";
import cellar7 from "@/assets/cellar-menu-v3-page-7.jpg.asset.json";
import cellar8 from "@/assets/cellar-menu-v3-page-8.jpg.asset.json";

const dinnerPages = [dinner1, dinner2, dinner3, dinner4, dinner5, dinner6, dinner7, dinner8].map(
  (p) => p.url,
);
const cellarPages = [cellar1, cellar2, cellar3, cellar4, cellar5, cellar6, cellar7, cellar8].map(
  (p) => p.url,
);

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoomServiceMenuDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto bg-background border-border p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <DialogTitle className="font-serif text-xl text-cream">
            Room Service — Coming Soon
          </DialogTitle>
        </div>

        <div
          className="p-4 md:p-6 space-y-6 select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-brass">Dinner</p>
          {dinnerPages.map((src, i) => (
            <img
              key={`dinner-${i}`}
              src={src}
              alt={`Glasshouse dinner menu page ${i + 1}`}
              className="w-full h-auto rounded shadow-lg pointer-events-none"
              draggable={false}
            />
          ))}
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-brass pt-4">
            Beverages — The Cellar
          </p>
          {cellarPages.map((src, i) => (
            <img
              key={`cellar-${i}`}
              src={src}
              alt={`Glasshouse beverage menu page ${i + 1}`}
              className="w-full h-auto rounded shadow-lg pointer-events-none"
              draggable={false}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomServiceMenuDialog;
