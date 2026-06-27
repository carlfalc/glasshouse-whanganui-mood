import { useState } from "react";
import { Printer, Share2, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import menuPdf from "@/assets/Glasshouse_Brunch_Lunch_Menu.pdf.asset.json";
import page1 from "@/assets/brunch-lunch-menu-page-1.png";
import page2 from "@/assets/brunch-lunch-menu-page-2.png";

const pages = [page1, page2];

const buildPrintHtml = () => {
  const imgs = pages
    .map(
      (src) =>
        `<img src="${new URL(src, window.location.origin).href}" alt="Glasshouse Brunch & Lunch Menu" />`,
    )
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>Glasshouse Brunch &amp; Lunch Menu</title>
  <style>
    @page { size: A3 landscape; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { background: #fff; }
    img { display: block; width: 100%; height: auto; page-break-after: always; }
    img:last-child { page-break-after: auto; }
  </style></head><body>${imgs}</body></html>`;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BrunchLunchMenuDialog = ({ open, onOpenChange }: Props) => {
  const [sharing, setSharing] = useState(false);

  const handlePrint = () => {
    const w = window.open("", "_blank", "width=1000,height=720");
    if (!w) {
      toast.error("Please allow pop-ups to print the menu.");
      return;
    }
    w.document.write(buildPrintHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  };

  const handleShare = async () => {
    const shareUrl = new URL(menuPdf.url, window.location.origin).href;
    const shareData = {
      title: "Glasshouse Brunch & Lunch Menu",
      text: "Take a look at the Glasshouse brunch & lunch menu",
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        setSharing(true);
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Menu link copied to clipboard");
      }
    } catch {
      /* user cancelled */
    } finally {
      setSharing(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = menuPdf.url;
    a.download = menuPdf.original_filename || "Glasshouse_Brunch_Lunch_Menu.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[92vh] overflow-y-auto bg-background border-border p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <DialogTitle className="font-serif text-xl text-cream">Brunch &amp; Lunch</DialogTitle>
          <div className="flex flex-wrap items-center gap-4 pr-8">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracked text-cream/80 hover:text-brass transition-colors"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
            <button
              onClick={handleShare}
              disabled={sharing}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracked text-cream/80 hover:text-brass transition-colors"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracked text-cream/80 hover:text-brass transition-colors"
            >
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {pages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Glasshouse Brunch & Lunch Menu page ${i + 1}`}
              className="w-full h-auto rounded shadow-lg"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrunchLunchMenuDialog;
