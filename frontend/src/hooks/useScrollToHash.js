import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Lets links like <Link to="/#services" /> or <Link to="/#contact" />
 * jump straight to that section instead of just landing at the top of
 * the page. Runs whenever the pathname or hash changes.
 */
export default function useScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Wait a tick so the target route has finished rendering.
    const id = hash.replace("#", "");
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
}
