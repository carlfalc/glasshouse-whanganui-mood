import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useHeroTheme } from "./HeroThemeContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/menus", label: "Menus" },
  { to: "/culinary-specialists", label: "Culinary Specialists" },
  { to: "/about", label: "About" },
  { to: "/our-people", label: "Our People" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lightImageActive } = useHeroTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const transparent = isHome && !scrolled && !open;
  // On the transparent home hero, darken nav text only while the lighter image 2 is showing
  const darkText = transparent && lightImageActive;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        transparent ? "bg-transparent" : "bg-background/95 backdrop-blur border-b border-border"
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-20">
        <Link
          to="/"
          aria-label="Glass House home"
          className={`font-serif text-2xl tracking-tight transition-colors duration-500 ${
            darkText ? "text-charcoal" : "text-cream"
          }`}
        >
          ​
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `text-[11px] uppercase tracked hover:text-brass transition-colors duration-500 ${
                  darkText ? "text-charcoal/85" : "text-cream/85"
                } ${isActive ? "!text-brass" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="tel:0062424177"
            className="inline-block text-[11px] uppercase tracked px-5 py-3 bg-brass text-charcoal hover:bg-brass/90 transition-colors"
          >
            Book
          </a>
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <a
            href="tel:0062424177"
            className="text-[11px] uppercase tracked px-4 py-2.5 bg-brass text-charcoal"
          >
            Book
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className={`transition-colors duration-500 ${darkText ? "text-charcoal" : "text-cream"}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-background transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center gap-8 pt-16">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="font-serif text-4xl text-cream hover:text-brass transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
