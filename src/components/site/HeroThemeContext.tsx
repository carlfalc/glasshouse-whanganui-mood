import { createContext, useContext, useState, ReactNode } from "react";

interface HeroThemeValue {
  /** True when the lighter hero image is currently active and header text should darken. */
  lightImageActive: boolean;
  setLightImageActive: (active: boolean) => void;
}

const HeroThemeContext = createContext<HeroThemeValue>({
  lightImageActive: false,
  setLightImageActive: () => {},
});

export const HeroThemeProvider = ({ children }: { children: ReactNode }) => {
  const [lightImageActive, setLightImageActive] = useState(false);
  return (
    <HeroThemeContext.Provider value={{ lightImageActive, setLightImageActive }}>
      {children}
    </HeroThemeContext.Provider>
  );
};

export const useHeroTheme = () => useContext(HeroThemeContext);
