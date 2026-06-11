import { useState } from "react";
import { Printer, Share2, Download, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import menuPdf from "@/assets/Glasshouse_Brunch_Lunch_Menu.pdf.asset.json";

interface Item {
  name: string;
  price?: string;
  description?: string;
  tags?: string;
}
interface Section {
  title: string;
  description?: string;
  items?: Item[];
}

const sections: Section[] = [
  {
    title: "Breakfast",
    items: [
      { name: "Eggs your way", price: "$18", description: "Poached, scrambled or fried eggs served on toasted sourdough, rye or gluten free bread" },
      { name: "Extras", description: "Streaky bacon $5 · Pork & fennel sausages $5 · Chimichurri mushrooms $5 · Homemade baked beans $5 · Rosti $5 · Grilled halloumi $6 · Fried tomato $4 · Wilted spinach $4 · Hollandaise $3", tags: "All sides GF" },
      { name: "Glasshouse breakfast", price: "$29", description: "Eggs your way on sourdough toast, bacon, sausage, rosti, grilled tomato, chimichurri mushrooms and hollandaise sauce", tags: "GFA" },
      { name: "Eggs Benedict", price: "$25", description: "With choice of bacon, wilted spinach and mushrooms, or smoked salmon. Poached eggs and hollandaise sauce on an English muffin", tags: "GFA" },
      { name: "Mushrooms on toast", price: "$25", description: "Fried mushrooms tossed in chimichurri, cannellini bean skordalia on sourdough", tags: "GFA, VG" },
      { name: "Buttermilk pancakes", price: "$25", description: "Maple syrup, strawberry and thyme compote, butter and chantilly cream", tags: "V" },
      { name: "Fried chicken & waffles", price: "$25", description: "Maple syrup, streaky bacon, sweet microherbs. Buffalo hot sauce optional" },
    ],
  },
  {
    title: "Burgers",
    items: [
      { name: "Chicken burger", price: "$29", description: "Buttermilk fried chicken, lettuce, cheese, pickles, aioli, fries", tags: "GFA" },
      { name: "Beef burger", price: "$29", description: "Cheese, lettuce, tomato, beetroot relish, aioli, fries", tags: "GFA, DFA" },
      { name: "Veggie burger", price: "$26", description: "Lettuce, tomato, fruit chutney, vegan aioli, fries", tags: "GFA, VG" },
    ],
  },
  {
    title: "Small Shares & Sides",
    items: [
      { name: "Fries", price: "$10", description: "House seasoning, confit garlic and citrus aioli, tomato sauce", tags: "GF, DF, VG" },
      { name: "Tomato burrata salad", price: "$20", description: "Creamy burrata, burst roasted cherry tomatoes, homemade basil pesto, fresh basil and warm crusty bread", tags: "V, GFA, contains nuts" },
      { name: "Fried chicken bites", price: "$19", description: "Buttermilk fried chicken, pickles, citrus and garlic aioli", tags: "GF" },
      { name: "Horopito salt & pepper squid", price: "$20", description: "Fried squid fillets, horopito togarashi seasoning, citrus and confit garlic aioli, pecorino and rocket salad", tags: "GF, DFA" },
      { name: "Miso pork belly bites", price: "$24", description: "12-hour slow cooked pork belly, miso caramel, pickled apple, sesame and Sichuan seasoning", tags: "GF, DF" },
      { name: "Chicken liver pâté", price: "$24", description: "Rich brandy chicken liver pâté, pickled cucumber, fresh tomato, Glasshouse crackers", tags: "GF" },
      { name: "Potato bake", price: "$15 / $25", description: "Gratinated agria potatoes in a creamy vintage cheddar sauce. Share for 2 / share for 5", tags: "GF, V" },
      { name: "Charcuterie board", price: "$40", description: "Cured meats, selection of homemade pickles, marinated olives, beetroot relish, Glasshouse crackers. For 2", tags: "GF, DF" },
      { name: "Cheese board", price: "$40", description: "A selection of 3 local and imported cheeses, seasonal fruit chutney, pickled cucumbers and Glasshouse crackers. For 2", tags: "GF, V" },
    ],
  },
  {
    title: "Mains",
    items: [
      { name: "Glasshouse Angus steak (250g)", price: "$45", description: "Pan-fried Pure Angus fillet, fondant potatoes, burnt butter fried broccolini, red wine jus. Side of Béarnaise sauce $4", tags: "GF" },
      { name: "Chicken roulade risotto", price: "$39", description: "Pan-fried rolled chicken, romesco risotto, chimichurri, pickled lemon, pecorino", tags: "GF" },
      { name: "Seared market fish and scallops", price: "$39", description: "Fresh market fish, scallops, edamame beans, sesame seed and saffron velouté", tags: "GF" },
      { name: "Mushroom gnocchi", price: "$38", description: "Hand-rolled gnocchi pan-fried in butter, mushrooms, spinach, mozzarella curd", tags: "GF, V" },
      { name: "Sweet & spicy dumplings", price: "$30", description: "Fried vegan rice paper dumplings, miso sauce, pickled lemon, microherb salad, chunky chilli oil", tags: "GF, VG" },
      { name: "Seasonal special", description: "A creative dish designed every few weeks by the kitchen team to celebrate seasonal ingredients and flair. Ask your waiter" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Dark chocolate crémeux", price: "$20", description: "Homemade honeycomb, raspberry, white chocolate", tags: "GF - may contain traces of nuts" },
      { name: "Basque cheesecake", price: "$19", description: "Berry and bayleaf compote, lemon curd, chantilly cream", tags: "GF" },
      { name: "Petite fours", price: "$20", description: "A selection of 4 small desserts, some homemade and others by Sweet Street Gluten Free Bakery", tags: "GF - contain nuts" },
    ],
  },
  {
    title: "Pizzas",
    items: [
      { name: "Marinara", price: "$20", description: "Confit garlic, olives, rocket", tags: "VG" },
      { name: "Hawaiian", price: "$20", description: "Ham, cheese, pineapple" },
      { name: "Margherita", price: "$20", description: "Soft mozzarella, basil", tags: "V" },
      { name: "Jamon", price: "$25", description: "Spanish ham, mozzarella, basil" },
      { name: "Smoked chicken", price: "$25", description: "Cranberry sauce, rocket" },
      { name: "Pork belly", price: "$25", description: "Halloumi, sriracha" },
    ],
  },
];

const dietaryGuide =
  "Served from 10am. GF Gluten Free • GFA Gluten Free Available • DF Dairy Free • DFA Dairy Free Available • V Vegetarian • VG Vegan. Please advise your server of any allergies or dietary requirements.";

type PageSize = "A4" | "Letter" | "Legal";
interface PrintOptions {
  pageSize: PageSize;
  fitToPage: boolean;
}

const buildPrintHtml = ({ pageSize, fitToPage }: PrintOptions) => {
  const sectionHtml = sections
    .map((sec) => {
      const itemsHtml = (sec.items ?? [])
        .map(
          (it) => `
        <div class="item">
          <div class="row"><span class="name">${it.name}</span>${it.price ? `<span class="price">${it.price}</span>` : ""}</div>
          ${it.description ? `<p class="desc">${it.description}</p>` : ""}
          ${it.tags ? `<p class="tags">${it.tags}</p>` : ""}
        </div>`,
        )
        .join("");
      const descHtml = sec.description ? `<p class="secdesc">${sec.description}</p>` : "";
      return `<h2>${sec.title}</h2>${descHtml}${itemsHtml}`;
    })
    .join("");

  const fitCss = fitToPage
    ? `html,body{height:auto;} body{zoom:.85;-webkit-print-color-adjust:exact;} .item{margin:10px 0;} h2{margin-top:22px;}`
    : "";

  return `<!doctype html><html><head><meta charset="utf-8"><title>Glasshouse Brunch & Lunch Menu</title>
  <style>
    @page{size:${pageSize} portrait;margin:${fitToPage ? "10mm" : "18mm"};}
    body{font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;max-width:720px;margin:40px auto;padding:0 24px;}
    h1{text-align:center;letter-spacing:.3em;font-size:28px;text-transform:uppercase;}
    h2{border-bottom:1px solid #999;padding-bottom:6px;margin-top:32px;font-size:14px;letter-spacing:.2em;text-transform:uppercase;break-after:avoid;}
    .secdesc{font-size:13px;color:#444;}
    .item{margin:14px 0;break-inside:avoid;}
    .row{display:flex;justify-content:space-between;align-items:baseline;}
    .name{font-size:17px;}
    .price{font-weight:bold;}
    .desc{font-size:13px;color:#444;margin:4px 0 0;}
    .tags{font-size:11px;color:#888;font-style:italic;margin:2px 0 0;}
    .guide{margin-top:40px;font-size:11px;text-align:center;color:#666;}
    ${fitCss}
  </style></head><body>
  <h1>Brunch &amp; Lunch</h1>
  ${sectionHtml}
  <p class="guide">${dietaryGuide}</p>
  </body></html>`;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BrunchLunchMenuDialog = ({ open, onOpenChange }: Props) => {
  const [sharing, setSharing] = useState(false);
  const [pageSize, setPageSize] = useState<PageSize>("A4");
  const [fitToPage, setFitToPage] = useState(true);

  const handlePrint = () => {
    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) {
      toast.error("Please allow pop-ups to print the menu.");
      return;
    }
    w.document.write(buildPrintHtml({ pageSize, fitToPage }));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-border p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <DialogTitle className="font-serif text-xl text-cream">Brunch &amp; Lunch</DialogTitle>
          <div className="flex items-center gap-2 pr-8">
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

        <div className="px-6 md:px-10 py-8">
          <p className="text-center text-[11px] uppercase tracked text-brass mb-2">Glasshouse</p>
          <h2 className="text-center font-serif text-3xl md:text-4xl text-cream">Brunch &amp; Lunch</h2>
          <div className="w-12 h-px bg-brass mx-auto mt-6 mb-10" />

          <div className="space-y-12">
            {sections.map((sec) => (
              <div key={sec.title}>
                <h3 className="text-[11px] uppercase tracked text-brass border-b border-border pb-3 mb-6">
                  {sec.title}
                </h3>
                {sec.description && (
                  <p className="text-sm text-cream/60 mb-6 leading-relaxed">{sec.description}</p>
                )}
                {sec.items && sec.items.length > 0 && (
                  <ul className="space-y-6">
                    {sec.items.map((it) => (
                      <li key={it.name} className="flex gap-6 items-baseline">
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3">
                            <h4 className="font-serif text-lg text-cream">{it.name}</h4>
                          </div>
                          {it.description && (
                            <p className="text-sm text-cream/60 mt-1 leading-relaxed">{it.description}</p>
                          )}
                          {it.tags && <p className="text-[11px] italic text-cream/40 mt-1">{it.tags}</p>}
                        </div>
                        {it.price && <span className="font-serif text-lg text-brass shrink-0">{it.price}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] uppercase tracked text-cream/50 mt-14 leading-relaxed">
            {dietaryGuide}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrunchLunchMenuDialog;
