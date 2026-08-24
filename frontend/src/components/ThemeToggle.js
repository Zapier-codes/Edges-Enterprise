import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full " +
        "text-[var(--text-primary)] hover:bg-[var(--accent-gold)]/10 " +
        "transition-colors duration-200 focus:outline-none focus-visible:ring-2 " +
        "focus-visible:ring-[var(--accent-gold)] " +
        className
      }
    >
      {/* Sun icon — shown in dark mode (tap to go light) */}
      <svg
        className={
          "absolute h-5 w-5 transition-all duration-300 " +
          (isDark
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0")
        }
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon icon — shown in light mode (tap to go dark) */}
      <svg
        className={
          "absolute h-5 w-5 transition-all duration-300 " +
          (isDark
            ? "opacity-0 rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100")
        }
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
