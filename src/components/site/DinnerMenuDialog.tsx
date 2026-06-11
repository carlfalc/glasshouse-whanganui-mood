import { useState } from "react";
import { Printer, Share2, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import menuPdf from "@/assets/Glasshouse_Dinner_Menu.pdf.asset.json";

interface Item {
  name: string;
  price?: string;
  description?: string;
  tags?: string;
}
interface Section {
  title: string;
  items: Item[];
}
interface Group {
  heading: string;
  sections: Section[];
}

const groups: Group[] = [
  {
    heading: "Bar(ish) Snacks & Pizzas",
    sections: [
      {
        title: "Bar(ish) Snacks",
        items: [
          { name: "Fries", price: "$10", description: "House seasoning, confit garlic and citrus aioli, tomato sauce", tags: "GF, DF, VG" },
          { name: "Homemade cornbread", price: "$11", description: "Served with burnt butter", tags: "GF, V" },
          { name: "Fried chicken bites", price: "$19", description: "Buttermilk fried chicken, pickles, citrus and garlic aioli. Add Buffalo hot sauce on the (glass)house", tags: "GF" },
          { name: "Chicken burger", price: "$29", description: "Buttermilk fried chicken burger, lettuce, cheese, pickles, aioli on a brioche bun with fries", tags: "GFA" },
          { name: "Beef burger", price: "$29", description: "Beef burger, cheese, lettuce, tomato, beetroot relish, aioli on a brioche bun with fries. Add a fried egg on the (glass)house", tags: "GFA, DFA" },
          { name: "Veggie burger", price: "$26", description: "Veggie patty, lettuce, tomato, sweet and savoury fruit chutney, vegan aioli on a brioche bun with fries", tags: "GFA, VG" },
        ],
      },
      {
        title: "Pizzas",
        items: [
          { name: "Marinara", price: "$20", description: "Tomato sauce, confit garlic, olives, rocket", tags: "VG" },
          { name: "Hawaiian", price: "$20", description: "Tomato sauce, ham, cheese, pineapple" },
          { name: "Margherita", price: "$20", description: "Tomato sauce, cheese, soft mozzarella, basil", tags: "V" },
          { name: "Jamon", price: "$25", description: "Cured Spanish ham, tomato sauce, cheese, soft mozzarella, basil" },
          { name: "Smoked chicken and cranberry", price: "$25", description: "Tomato sauce, cheese, smoked chicken, cranberry sauce, rocket" },
          { name: "Pork belly", price: "$25", description: "Tomato sauce, pork belly, halloumi, sriracha" },
        ],
      },
    ],
  },
  {
    heading: "Shares",
    sections: [
      {
        title: "Small Shares",
        items: [
          { name: "Market fish ceviche", price: "$20", description: "Fresh raw fish, tomato salsa, pickled chilli, lime, sesame infused oil", tags: "GF, DF" },
          { name: "Tomato burrata salad", price: "$20", description: "Creamy burrata, burst roasted cherry tomatoes, homemade basil pesto, fresh basil and warm crusty bread", tags: "V, GFA, contains nuts" },
          { name: "Horopito salt and pepper squid", price: "$20", description: "Fried squid fillets, horopito togarashi seasoning, citrus and confit garlic aioli, pecorino and rocket salad", tags: "GF, DFA" },
          { name: "Miso pork belly bites", price: "$20", description: "12-hour slow cooked pork belly, miso caramel, pickled apple, sesame and Sichuan seasoning", tags: "GF, DF" },
          { name: "Chicken liver pâté", price: "$20", description: "Rich brandy chicken liver pâté, pickled cucumber, fresh tomato, Glasshouse crackers", tags: "GF" },
          { name: "Potato bake", price: "$15 / $25", description: "Gratinated agria potatoes in a creamy vintage cheddar sauce. Share for 2 / share for 5", tags: "GF, V" },
        ],
      },
      {
        title: "Larger Shares",
        items: [
          { name: "Charcuterie board", price: "$40", description: "Cured meats, selection of homemade pickles, marinated olives, beetroot relish, Glasshouse crackers", tags: "GF, DF" },
          { name: "Cheese board", price: "$40", description: "A selection of 3 local and imported cheeses, seasonal fruit chutney, pickled cucumbers and Glasshouse crackers", tags: "GF, V" },
        ],
      },
    ],
  },
  {
    heading: "Mains & Desserts",
    sections: [
      {
        title: "Mains",
        items: [
          { name: "Glasshouse Angus steak (250g)", price: "$45", description: "Pan-fried Pure Angus fillet, fondant potatoes, burnt butter fried broccolini and red wine jus. Side of Béarnaise sauce $4", tags: "GF" },
          { name: "Chicken roulade risotto", price: "$39", description: "Pan-fried rolled chicken, romesco risotto, chimichurri, pickled lemon, pecorino cheese", tags: "GF" },
          { name: "Seared market fish and scallops", price: "$39", description: "Fresh market fish, scallops, edamame beans, sesame seed and saffron velouté", tags: "GF" },
          { name: "Mushroom gnocchi", price: "$38", description: "Hand-rolled gnocchi pan-fried in butter, mushrooms, spinach, mozzarella curd", tags: "GF, V" },
          { name: "Sweet and spicy dumplings", price: "$30", description: "Fried vegan rice paper dumplings, miso sauce, pickled lemon, microherb salad, chunky chilli oil", tags: "GF, VG" },
          { name: "Seasonal special", description: "A creative dish designed every few weeks by the kitchen team to celebrate seasonal ingredients and flair. Ask your waiter" },
        ],
      },
      {
        title: "Desserts",
        items: [
          { name: "Rich dark chocolate crémeux", price: "$20", description: "Honeycomb, raspberry, white chocolate", tags: "GF, chocolate may contain traces of nuts" },
          { name: "Basque cheesecake", price: "$19", description: "Berry and bayleaf compote, lemon curd, chantilly cream", tags: "GF" },
          { name: "Petite fours", price: "$20", description: "A selection of 4 small desserts, some homemade and others made by Sweet Street Gluten Free Bakery", tags: "GF, contain nuts" },
        ],
      },
      {
        title: "Kids Menu",
        items: [
          { name: "Fish and chips", price: "$10", description: "Crumbed hoki fish, fries and tomato sauce", tags: "GF, DF" },
          { name: "Mini cheeseburger", price: "$10", description: "Beef slider, cheese, tomato sauce, fries and tomato sauce", tags: "GFA, DFA" },
          { name: "Mini chicken burger", price: "$10", description: "Fried chicken, lettuce, cheese, aioli, fries and tomato sauce", tags: "GFA" },
          { name: "Gnocchi", price: "$10", description: "Gnocchi, cream sauce, cheese", tags: "GF, V" },
          { name: "Chicken bites", price: "$10", description: "Buttermilk chicken bites, fries and tomato sauce", tags: "GF" },
          { name: "Ice cream", price: "$9", description: "Choice of chocolate sauce, caramel sauce, strawberry sauce", tags: "GF, V" },
        ],
      },
    ],
  },
];

const dietaryGuide =
  "GF Gluten Free • GFA Gluten Free Available • DF Dairy Free • DFA Dairy Free Available • V Vegetarian • VG Vegan. Please advise your server of any allergies or dietary requirements.";

const buildPrintHtml = () => {
  const sectionHtml = groups
    .flatMap((g) => g.sections)
    .map(
      (sec) => `
      <h2>${sec.title}</h2>
      ${sec.items
        .map(
          (it) => `
        <div class="item">
          <div class="row"><span class="name">${it.name}</span>${it.price ? `<span class="price">${it.price}</span>` : ""}</div>
          ${it.description ? `<p class="desc">${it.description}</p>` : ""}
          ${it.tags ? `<p class="tags">${it.tags}</p>` : ""}
        </div>`,
        )
        .join("")}`,
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><title>Glasshouse Dinner Menu</title>
  <style>
    body{font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;max-width:720px;margin:40px auto;padding:0 24px;}
    h1{text-align:center;letter-spacing:.3em;font-size:28px;text-transform:uppercase;}
    h2{border-bottom:1px solid #999;padding-bottom:6px;margin-top:32px;font-size:14px;letter-spacing:.2em;text-transform:uppercase;}
    .item{margin:14px 0;}
    .row{display:flex;justify-content:space-between;align-items:baseline;}
    .name{font-size:17px;}
    .price{font-weight:bold;}
    .desc{font-size:13px;color:#444;margin:4px 0 0;}
    .tags{font-size:11px;color:#888;font-style:italic;margin:2px 0 0;}
    .guide{margin-top:40px;font-size:11px;text-align:center;color:#666;}
  </style></head><body>
  <h1>Glasshouse Dinner Menu</h1>
  ${sectionHtml}
  <p class="guide">${dietaryGuide}</p>
  </body></html>`;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DinnerMenuDialog = ({ open, onOpenChange }: Props) => {
  const [sharing, setSharing] = useState(false);

  const handlePrint = () => {
    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) {
      toast.error("Please allow pop-ups to print the menu.");
      return;
    }
    w.document.write(buildPrintHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  const handleShare = async () => {
    const shareUrl = new URL(menuPdf.url, window.location.origin).href;
    const shareData = {
      title: "Glasshouse Dinner Menu",
      text: "Take a look at the Glasshouse dinner menu",
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
    a.download = menuPdf.original_filename || "Glasshouse_Dinner_Menu.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-border p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
          <DialogTitle className="font-serif text-xl text-cream">Dinner Menu</DialogTitle>
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
          <h2 className="text-center font-serif text-3xl md:text-4xl text-cream">Dinner Menu</h2>
          <div className="w-12 h-px bg-brass mx-auto mt-6 mb-10" />

          <div className="space-y-12">
            {groups
              .flatMap((g) => g.sections)
              .map((sec) => (
                <div key={sec.title}>
                  <h3 className="text-[11px] uppercase tracked text-brass border-b border-border pb-3 mb-6">
                    {sec.title}
                  </h3>
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
                          {it.tags && (
                            <p className="text-[11px] italic text-cream/40 mt-1">{it.tags}</p>
                          )}
                        </div>
                        {it.price && <span className="font-serif text-lg text-brass shrink-0">{it.price}</span>}
                      </li>
                    ))}
                  </ul>
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

export default DinnerMenuDialog;
