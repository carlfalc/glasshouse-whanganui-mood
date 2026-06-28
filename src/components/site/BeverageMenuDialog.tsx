import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import page1 from "@/assets/cellar-menu-page-1.jpg.asset.json";
import page2 from "@/assets/cellar-menu-page-2.jpg.asset.json";
import page3 from "@/assets/cellar-menu-page-3.jpg.asset.json";
import page4 from "@/assets/cellar-menu-page-4.jpg.asset.json";
import page5 from "@/assets/cellar-menu-page-5.jpg.asset.json";
import page6 from "@/assets/cellar-menu-page-6.jpg.asset.json";
import page7 from "@/assets/cellar-menu-page-7.jpg.asset.json";
import page8 from "@/assets/cellar-menu-page-8.jpg.asset.json";

const pages = [page1, page2, page3, page4, page5, page6, page7, page8].map((p) => p.url);

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BeverageMenuDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto bg-background border-border p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <DialogTitle className="font-serif text-xl text-cream">The Cellar — Beverages</DialogTitle>
        </div>

        <div
          className="p-4 md:p-6 space-y-6 select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          {pages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Glasshouse The Cellar beverage menu page ${i + 1}`}
              className="w-full h-auto rounded shadow-lg pointer-events-none"
              draggable={false}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BeverageMenuDialog;
