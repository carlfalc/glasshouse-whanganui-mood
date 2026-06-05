import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border text-cream">
      <div className="container-narrow py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <Link to="/" className="font-serif text-3xl">​</Link>
          <p className="mt-6 text-sm text-cream/70 leading-relaxed">
            379 Victoria Avenue<br />
            The Avenue Hotel<br />
            Whanganui, New Zealand
          </p>
          <p className="mt-4 text-sm text-cream/70">
            <a href="tel:062424177" className="hover:text-brass">06 242 4177</a><br />
            <span className="text-cream/50">hello@glasshousewhanganui.nz</span>
          </p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracked text-brass mb-6">Navigate</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/menus" className="hover:text-brass">Menus</Link></li>
            <li><Link to="/about" className="hover:text-brass">About</Link></li>
            <li><Link to="/our-people" className="hover:text-brass">Our People</Link></li>
            <li><Link to="/vouchers" className="hover:text-brass">Vouchers</Link></li>
            <li><Link to="/contact" className="hover:text-brass">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracked text-brass mb-6">Hours</h4>
          <p className="text-sm text-cream/70 leading-relaxed">
            Mon – Thursday · Dinner from 4pm<br />
            Friday to Saturday · 10am to Late<br />
            Sun · 10am to 8pm
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="text-cream/70 hover:text-brass"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="text-cream/70 hover:text-brass"><Facebook size={18} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-narrow py-6 flex flex-col md:flex-row justify-between gap-2 text-[11px] uppercase tracked text-cream/50">
          <span>© ​ Whanganui</span>
          <span>Creative New Zealand Dining.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
