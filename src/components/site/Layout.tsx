import { ReactNode, useEffect } from "react";
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
  useEffect(() => {
    window.scrollTo(0, 0);
    window.fbq?.("track", "PageView");
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
