import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const STORAGE_KEY = "edges-theme";

const getSystemPrefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch (e) {
    // localStorage may be unavailable (privacy mode, etc.) — fall through
  }
  return getSystemPrefersDark() ? "dark" : "light";
};

const ThemeContext = createContext({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Reflect the theme on <html class="dark"> and persist it.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore write failures
    }
  }, [theme]);

  // If the user has never explicitly chosen a theme, keep following the OS.
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      let hasExplicitChoice = false;
      try {
        hasExplicitChoice = !!window.localStorage.getItem(STORAGE_KEY + "-explicit");
      } catch (err) {
        hasExplicitChoice = false;
      }
      if (!hasExplicitChoice) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };
    media.addEventListener
      ? media.addEventListener("change", handleChange)
      : media.addListener(handleChange);
    return () => {
      media.removeEventListener
        ? media.removeEventListener("change", handleChange)
        : media.removeListener(handleChange);
    };
  }, []);

  const setTheme = useCallback((next) => {
    try {
      window.localStorage.setItem(STORAGE_KEY + "-explicit", "true");
    } catch (e) {
      // ignore
    }
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark", toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
