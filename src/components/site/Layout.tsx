import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { HeroThemeProvider } from "./HeroThemeContext";

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ children, title, description }: Props) => {
  const location = useLocation();
  const firstLoad = useRef(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    // index.html already tracks the initial PageView; only track subsequent navigations
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      window.fbq?.("track", "PageView");
    }
    if (title) document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", description);
    }
  }, [location.pathname, title, description]);

  return (
    <HeroThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </HeroThemeProvider>
  );
};

export default Layout;
