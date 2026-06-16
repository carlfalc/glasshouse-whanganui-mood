import { useState, useMemo } from "react";
import { Printer, Share2, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import menuPdf from "@/assets/Glasshouse_Brunch_Lunch_Menu.pdf.asset.json";
import logo from "@/assets/hero-glasshouse-logo.png";

const buildMenuHtml = (logoUrl: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Glasshouse Brunch &amp; Lunch Menu</title>
<style>
  @page { size: A3 landscape; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 420mm; height: 297mm; margin: 0; padding: 0; overflow: hidden; }
  body {
    font-family: 'EB Garamond', 'Garamond', 'Cormorant Garamond', Georgia, serif;
    background: #f5efe0; color: #2a2418; position: relative;
    display: flex; flex-direction: column; -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .header { background: #0d3a2c; padding: 8mm 20mm 6mm; text-align: center; position: relative; border-bottom: 2px solid #c9a961; flex-shrink: 0; }
  .header::before, .header::after { content: ''; position: absolute; left: 0; right: 0; height: 1px; background: #c9a961; opacity: 0.4; }
  .header::before { top: 3mm; }
  .header::after { bottom: 3mm; }
  .logo-img { height: 28mm; width: auto; display: block; margin: 0 auto 2mm; }
  .tagline { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 11pt; letter-spacing: 5pt; color: #f5efe0; font-weight: 300; padding-left: 5pt; }
  .menu-label, .menu-label-right { position: absolute; top: 50%; transform: translateY(-50%); font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14pt; letter-spacing: 3pt; color: #c9a961; font-style: italic; text-align: center; line-height: 1.2; }
  .menu-label { left: 18mm; }
  .menu-label-right { right: 18mm; }
  .columns { display: flex; padding: 6mm 12mm 4mm; gap: 6mm; flex: 1; min-height: 0; overflow: hidden; }
  .column { flex: 1; padding: 0 3mm; position: relative; }
  .column:not(:last-child)::after { content: ''; position: absolute; right: -3mm; top: 5%; bottom: 5%; width: 1px; background: repeating-linear-gradient(to bottom, #c9a961 0, #c9a961 2mm, transparent 2mm, transparent 4mm); opacity: 0.4; }
  .section-header { text-align: center; margin: 4mm 0 3mm; position: relative; }
  .section-header:first-child { margin-top: 0; }
  .section-header h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16pt; font-weight: 500; letter-spacing: 5pt; color: #0d3a2c; text-transform: uppercase; display: inline-block; position: relative; padding: 1mm 8mm; }
  .section-header h2::before, .section-header h2::after { content: ''; position: absolute; top: 50%; width: 6mm; height: 1px; background: #c9a961; }
  .section-header h2::before { right: 100%; }
  .section-header h2::after { left: 100%; }
  .ornament { font-size: 8pt; color: #c9a961; margin-top: 0.5mm; letter-spacing: 3pt; }
  .item { margin-bottom: 2mm; }
  .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5mm; }
  .item-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 12pt; font-weight: 600; color: #0d3a2c; letter-spacing: 0.3pt; }
  .item-name-inner { font-style: italic; font-weight: 400; color: #6b5d3e; font-size: 9pt; margin-left: 2mm; }
  .dots { flex: 1; border-bottom: 1px dotted #c9a961; margin: 0 2mm 2pt; opacity: 0.6; }
  .item-price { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 12pt; font-weight: 600; color: #0d3a2c; }
  .item-desc { font-size: 9pt; color: #4a3f28; line-height: 1.3; font-style: italic; padding-right: 3mm; }
  .item-extra { font-size: 8.5pt; color: #6b5d3e; margin-top: 0.3mm; font-style: italic; }
  .diet { font-size: 7.5pt; color: #8a7a52; margin-top: 0.3mm; letter-spacing: 0.5pt; font-style: italic; }
  .extras-box { background: rgba(13, 58, 44, 0.06); border-left: 2px solid #c9a961; padding: 2.5mm 3.5mm; margin: 2.5mm 0; }
  .extras-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 10pt; font-weight: 600; color: #0d3a2c; letter-spacing: 1pt; margin-bottom: 1.5mm; text-transform: uppercase; }
  .extras-list { font-size: 9pt; color: #4a3f28; line-height: 1.5; }
  .extras-list span { white-space: nowrap; display: inline-block; }
  .extras-list .sep { color: #c9a961; margin: 0 2pt; }
  .pizza-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
  .pizza-table td { padding: 0.7mm 0; vertical-align: top; color: #4a3f28; }
  .pizza-table .pname { font-weight: 600; color: #0d3a2c; white-space: nowrap; padding-right: 2mm; }
  .pizza-table .pprice { font-weight: 600; color: #0d3a2c; text-align: right; white-space: nowrap; }
  .pizza-table .pdesc { font-style: italic; font-size: 8.5pt; }
  .pizza-band { background: rgba(13, 58, 44, 0.05); border-top: 1px solid #c9a961; border-bottom: 1px solid #c9a961; padding: 2.5mm 14mm 3mm; flex-shrink: 0; }
  .pizza-band-header { text-align: center; margin-bottom: 2mm; }
  .pizza-band-header h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 14pt; font-weight: 500; letter-spacing: 6pt; color: #0d3a2c; text-transform: uppercase; display: inline-block; position: relative; padding: 1mm 10mm; }
  .pizza-band-header h2::before, .pizza-band-header h2::after { content: ''; position: absolute; top: 50%; width: 18mm; height: 1px; background: #c9a961; }
  .pizza-band-header h2::before { right: 100%; }
  .pizza-band-header h2::after { left: 100%; }
  .pizza-grid { width: 100%; border-collapse: collapse; }
  .pizza-grid td { text-align: center; padding: 0 3mm; vertical-align: top; width: 16.66%; }
  .pcname { display: block; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 11pt; font-weight: 600; color: #0d3a2c; margin-bottom: 0.5mm; }
  .pcprice { color: #0d3a2c; margin-left: 3pt; }
  .pcdesc { display: block; font-size: 8.5pt; font-style: italic; color: #4a3f28; line-height: 1.25; }
  .footer { background: #0d3a2c; padding: 3mm 20mm; border-top: 1px solid #c9a961; color: #d4b574; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 9pt; letter-spacing: 2pt; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
  .footer-legend { text-align: center; flex: 1; }
  .footer-legend strong { color: #d4b574; font-weight: 600; }
  .footer-legend span { margin: 0 4pt; }
  .footer-tag { font-style: italic; color: #c9a961; opacity: 0.85; }
</style>
</head>
<body>
<div class="header">
  <div class="menu-label">~ Brunch ~<br><span style="font-size:10pt; letter-spacing:2pt;">Whanganui</span><br><span style="font-size:8pt; letter-spacing:1pt; font-style:normal; color:#f5efe0; opacity:0.85;">glasshousemenu.com</span></div>
  <img src="${logoUrl}" class="logo-img" alt="Glasshouse">
  <div class="tagline">WHERE&nbsp;&nbsp;THE&nbsp;&nbsp;GARDEN&nbsp;&nbsp;COMES&nbsp;&nbsp;INSIDE</div>
  <div class="menu-label-right">~ Lunch ~<br><span style="font-size:10pt; letter-spacing:2pt;">Whanganui</span></div>
</div>

<div class="columns">
  <div class="column">
    <div class="section-header"><h2>Breakfast</h2><div class="ornament">❦ &nbsp; ✦ &nbsp; ❦</div></div>
    <div class="item">
      <div class="item-header"><span class="item-name">Eggs your way</span><span class="dots"></span><span class="item-price">17</span></div>
      <div class="item-desc">Poached, scrambled or fried eggs served on toasted sourdough, rye or gluten free bread</div>
      <div class="extras-box">
        <div class="extras-title">Extras</div>
        <div class="extras-list">
          <span>Streaky bacon $5</span><span class="sep">·</span>
          <span>Pork &amp; fennel sausages $5</span><span class="sep">·</span>
          <span>Chimichurri mushrooms $5</span><span class="sep">·</span>
          <span>Homemade baked beans $5</span><span class="sep">·</span>
          <span>Rosti $5</span><span class="sep">·</span>
          <span>Grilled halloumi $6</span><span class="sep">·</span>
          <span>Fried tomato $4</span><span class="sep">·</span>
          <span>Wilted spinach $4</span><span class="sep">·</span>
          <span>Hollandaise $3</span>
        </div>
        <div class="diet" style="margin-top: 1.5mm;">All sides GF</div>
      </div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Glasshouse breakfast</span><span class="dots"></span><span class="item-price">29</span></div>
      <div class="item-desc">Eggs your way on sourdough toast, bacon, sausage, rosti, grilled tomato, chimichurri mushrooms and hollandaise sauce</div>
      <div class="diet">GFA</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Eggs Benedict</span><span class="dots"></span><span class="item-price">25</span></div>
      <div class="item-desc">With choice of bacon, wilted spinach and mushrooms, or smoked salmon. Poached eggs and hollandaise sauce on an English muffin</div>
      <div class="diet">GFA</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Mushrooms on toast</span><span class="dots"></span><span class="item-price">25</span></div>
      <div class="item-desc">Fried mushrooms tossed in chimichurri, cannellini bean skordalia on sourdough</div>
      <div class="diet">GFA, VG</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Buttermilk pancakes</span><span class="dots"></span><span class="item-price">25</span></div>
      <div class="item-desc">Maple syrup, strawberry and thyme compote, butter and chantilly cream</div>
      <div class="diet">V</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Fried chicken &amp; waffles</span><span class="dots"></span><span class="item-price">25</span></div>
      <div class="item-desc">Maple syrup, streaky bacon, sweet microherbs</div>
      <div class="item-extra">Buffalo hot sauce optional</div>
    </div>
    <div class="section-header"><h2>Burgers</h2><div class="ornament">❦ &nbsp; ✦ &nbsp; ❦</div></div>
    <table class="pizza-table">
      <tr><td class="pname">Chicken burger</td><td class="pdesc">Buttermilk fried chicken, lettuce, cheese, pickles, aioli, fries&nbsp;·&nbsp;<span style="white-space:nowrap">GFA</span></td><td class="pprice">29</td></tr>
      <tr><td class="pname">Beef burger</td><td class="pdesc">Cheese, lettuce, tomato, beetroot relish, aioli, fries. Add a fried egg on the (glass)house if you'd like&nbsp;·&nbsp;<span style="white-space:nowrap">GFA, DFA</span></td><td class="pprice">29</td></tr>
      <tr><td class="pname">Veggie burger</td><td class="pdesc">Lettuce, tomato, fruit chutney, vegan aioli, fries&nbsp;·&nbsp;<span style="white-space:nowrap">GFA, VG</span></td><td class="pprice">26</td></tr>
    </table>
  </div>

  <div class="column">
    <div class="section-header"><h2>Shares</h2><div class="ornament">❦ &nbsp; ✦ &nbsp; ❦</div></div>
    <div class="item">
      <div class="item-header"><span class="item-name">Fries</span><span class="dots"></span><span class="item-price">10</span></div>
      <div class="item-desc">House seasoning, confit garlic and citrus aioli, tomato sauce</div>
      <div class="diet">GF, DF, VG</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Tomato burrata salad</span><span class="dots"></span><span class="item-price">20</span></div>
      <div class="item-desc">Handmade ViaVio burrata, roast cherry tomatoes &amp; cornbread</div>
      <div class="diet">V, GFA</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Fried chicken bites</span><span class="dots"></span><span class="item-price">19</span></div>
      <div class="item-desc">Buttermilk fried chicken, pickles, citrus and garlic aioli</div>
      <div class="diet">GF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Horopito salt &amp; pepper squid</span><span class="dots"></span><span class="item-price">20</span></div>
      <div class="item-desc">Fried squid fillets, horopito togarashi seasoning, citrus and confit garlic aioli, pecorino and rocket salad</div>
      <div class="diet">GF, DFA</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Miso pork belly bites</span><span class="dots"></span><span class="item-price">24</span></div>
      <div class="item-desc">12-hour slow cooked pork belly, miso caramel, pickled apple, sesame and Sichuan seasoning</div>
      <div class="diet">GF, DF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Chicken liver pâté</span><span class="dots"></span><span class="item-price">24</span></div>
      <div class="item-desc">Rich brandy chicken liver pâté, pickled cucumber, fresh tomato, Glasshouse crackers</div>
      <div class="diet">GF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Potato bake <span class="item-name-inner">share 2 / share 5</span></span><span class="dots"></span><span class="item-price">15 / 25</span></div>
      <div class="item-desc">Gratinated Agria potatoes in a creamy vintage cheddar sauce</div>
      <div class="diet">GF, V</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Charcuterie board <span class="item-name-inner">for 2</span></span><span class="dots"></span><span class="item-price">40</span></div>
      <div class="item-desc">Cured meats, selection of homemade pickles, marinated olives, beetroot relish, Glasshouse crackers</div>
      <div class="diet">GF, DF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Cheese board <span class="item-name-inner">for 2</span></span><span class="dots"></span><span class="item-price">40</span></div>
      <div class="item-desc">A selection of 3 local and imported cheeses, seasonal fruit chutney, pickled cucumbers and Glasshouse crackers</div>
      <div class="diet">GF, V</div>
    </div>
  </div>

  <div class="column">
    <div class="section-header"><h2>Mains</h2><div class="ornament">❦ &nbsp; ✦ &nbsp; ❦</div></div>
    <div class="item">
      <div class="item-header"><span class="item-name">Glasshouse Angus steak (250g)</span><span class="dots"></span><span class="item-price">45</span></div>
      <div class="item-desc">Pan-fried Pure Angus fillet, fondant potatoes, burnt butter fried broccolini, red wine jus</div>
      <div class="item-extra">Side of Béarnaise sauce $4</div>
      <div class="diet">GF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Chicken roulade risotto</span><span class="dots"></span><span class="item-price">39</span></div>
      <div class="item-desc">Pan-fried rolled chicken, romesco risotto, chimichurri, pickled lemon, pecorino</div>
      <div class="diet">GF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Seared market fish and scallops</span><span class="dots"></span><span class="item-price">39</span></div>
      <div class="item-desc">Fresh market fish, scallops, edamame beans, sesame seed and saffron velouté</div>
      <div class="diet">GF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Mushroom gnocchi</span><span class="dots"></span><span class="item-price">38</span></div>
      <div class="item-desc">Hand-rolled gnocchi pan-fried in butter, mushrooms, spinach, mozzarella curd</div>
      <div class="diet">GF, V</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Sweet &amp; spicy dumplings</span><span class="dots"></span><span class="item-price">30</span></div>
      <div class="item-desc">Fried vegan rice paper dumplings, miso sauce, pickled lemon, microherb salad, chunky chilli oil</div>
      <div class="diet">GF, VG</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Seasonal special</span><span class="dots"></span><span class="item-price" style="font-style:italic; font-size:10pt;">—</span></div>
      <div class="item-desc">A creative dish designed every few weeks by the kitchen team to celebrate seasonal ingredients and flair. Ask your waiter</div>
    </div>
    <div class="section-header"><h2>Desserts</h2><div class="ornament">❦ &nbsp; ✦ &nbsp; ❦</div></div>
    <div class="item">
      <div class="item-header"><span class="item-name">Dark chocolate crémeux</span><span class="dots"></span><span class="item-price">20</span></div>
      <div class="item-desc">Homemade honeycomb, raspberry, white chocolate</div>
      <div class="diet">GF · may contain traces of nuts</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Basque cheesecake</span><span class="dots"></span><span class="item-price">19</span></div>
      <div class="item-desc">Berry and bayleaf compote, lemon curd, chantilly cream</div>
      <div class="diet">GF</div>
    </div>
    <div class="item">
      <div class="item-header"><span class="item-name">Petite fours</span><span class="dots"></span><span class="item-price">20</span></div>
      <div class="item-desc">A selection of 4 small desserts, some homemade and others by Sweet Street Gluten Free Bakery</div>
      <div class="diet">GF · contain nuts</div>
    </div>
  </div>
</div>

<div class="pizza-band">
  <div class="pizza-band-header"><h2>Pizzas</h2></div>
  <table class="pizza-grid">
    <tr>
      <td><span class="pcname">Marinara <span class="pcprice">$20</span></span><span class="pcdesc">Confit garlic, olives, rocket · VG</span></td>
      <td><span class="pcname">Hawaiian <span class="pcprice">$20</span></span><span class="pcdesc">Ham, cheese, pineapple</span></td>
      <td><span class="pcname">Margherita <span class="pcprice">$20</span></span><span class="pcdesc">Soft mozzarella, basil · V</span></td>
      <td><span class="pcname">Jamon <span class="pcprice">$25</span></span><span class="pcdesc">Spanish ham, mozzarella, basil</span></td>
      <td><span class="pcname">Smoked chicken <span class="pcprice">$25</span></span><span class="pcdesc">Cranberry sauce, rocket</span></td>
      <td><span class="pcname">Pork belly <span class="pcprice">$25</span></span><span class="pcdesc">Halloumi, sriracha</span></td>
    </tr>
  </table>
</div>

<div class="footer">
  <div class="footer-tag">~ Served from 10am ~</div>
  <div class="footer-legend">
    <strong>GF</strong> Gluten Free<span>·</span>
    <strong>GFA</strong> Gluten Free Available<span>·</span>
    <strong>DF</strong> Dairy Free<span>·</span>
    <strong>DFA</strong> Dairy Free Available<span>·</span>
    <strong>V</strong> Vegetarian<span>·</span>
    <span style="white-space:nowrap"><strong>VG</strong> Vegan</span>
  </div>
  <div class="footer-tag">~ Please advise allergies ~</div>
</div>
</body>
</html>`;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BrunchLunchMenuDialog = ({ open, onOpenChange }: Props) => {
  const [sharing, setSharing] = useState(false);

  const logoUrl = useMemo(
    () => new URL(logo, window.location.origin).href,
    [],
  );
  const menuHtml = useMemo(() => buildMenuHtml(logoUrl), [logoUrl]);

  const handlePrint = () => {
    const w = window.open("", "_blank", "width=1000,height=720");
    if (!w) {
      toast.error("Please allow pop-ups to print the menu.");
      return;
    }
    w.document.write(menuHtml);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
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

        <div className="p-4 md:p-6">
          {/* A3 landscape is 420mm x 297mm (~1587 x 1123px). Scale to fit the dialog width. */}
          <div
            className="relative mx-auto w-full overflow-hidden rounded shadow-lg"
            style={{ aspectRatio: "420 / 297" }}
          >
            <iframe
              title="Glasshouse Brunch & Lunch Menu"
              srcDoc={menuHtml}
              scrolling="no"
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{
                width: "1587px",
                height: "1123px",
                // scale so 1587px-wide page fills the container; container width drives it
                transform: "scale(var(--menu-scale))",
              }}
              ref={(el) => {
                if (!el) return;
                const parent = el.parentElement;
                if (!parent) return;
                const apply = () => {
                  parent.style.setProperty(
                    "--menu-scale",
                    String(parent.clientWidth / 1587),
                  );
                };
                apply();
                const ro = new ResizeObserver(apply);
                ro.observe(parent);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrunchLunchMenuDialog;
