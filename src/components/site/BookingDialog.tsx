import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const BOOKING_URL =
  "https://bookings.nowbookit.com/?accountid=fd783466-dac6-4d4e-b82a-8c0b0f85e9a8&venueid=14762&colors=hex,056f00";
const RESIZER_SRC = "https://plugins.nowbookit.com/iframe-resizer-build/bundle.js";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ open, onOpenChange }: Props) => {
  useEffect(() => {
    if (!open) return;
    if (document.querySelector(`script[src="${RESIZER_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = RESIZER_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-border p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <DialogTitle className="font-serif text-xl text-cream">Book a Table</DialogTitle>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracked text-cream/80 hover:text-brass transition-colors pr-8"
          >
            <ExternalLink className="h-4 w-4" /> Open booking page
          </a>
        </div>

        <div className="px-2 sm:px-4 py-4">
          <iframe
            data-id="nbi-widget"
            src={BOOKING_URL}
            title="Glasshouse table booking"
            className="w-full min-h-[640px] border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
