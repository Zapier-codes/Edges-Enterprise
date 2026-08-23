import React, { useState, useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./../resources/logo2.svg";
import Dropdown from "./Dropdown";
import ThemeToggle from "./ThemeToggle";
import useStore from "../store/store";

const NAV_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/services", label: "What we do?", hasDropdown: true, isProducts: false },
  { to: "/products", label: "Our Products", hasDropdown: true, isProducts: true },
  { to: "/careers", label: "Careers" },
];

const linkClasses =
  "text-theme dark:text-accent text-lg font-normal hover:text-black dark:hover:text-white transition-colors";

const mobileLinkClasses =
  "text-theme dark:text-accent font-semibold text-lg hover:text-black dark:hover:text-white transition-colors";

const Navbar = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  const [drop, setDrop] = useState(false);
  const [dropPage, setDropPage] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef(null);

  const showDropdown = (isProducts) => {
    setDropPage(isProducts);
    setDrop(true);
  };
  const hideDropdown = () => setDrop(false);

  // Close the desktop dropdown when the pointer leaves the navbar entirely.
  useEffect(() => {
    const handleLeave = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDrop(false);
      }
    };
    document.addEventListener("mouseleave", handleLeave);
    return () => document.removeEventListener("mouseleave", handleLeave);
  }, []);

  // Lock body scroll while the mobile menu is open, and close it if the
  // viewport grows past the mobile breakpoint (e.g. rotating a tablet).
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  return (
    <nav ref={containerRef} className="relative p-4 sm:p-6 mx-auto">
      <div className="flex items-center justify-between">
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <img src={logo} className="w-32 sm:w-40 md:w-48" alt="logo" />
        </Link>

        {/* Desktop / tablet nav (md and up) */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {NAV_LINKS.map((item) => (
            <li key={item.to} className="relative flex items-center">
              <Link
                to={item.to}
                onMouseEnter={
                  item.hasDropdown ? () => showDropdown(item.isProducts) : undefined
                }
                className={linkClasses}
              >
                {item.label}
                {item.hasDropdown && (
                  <span className="ml-2 inline-block align-middle">
                    <svg
                      viewBox="0 0 10 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      className="rotate-90"
                    >
                      <path
                        d="m1 17.5 8-8-8-8"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className="flex items-center">
            <Link to={isLoggedIn ? "/dashboard" : "/login"} className={linkClasses}>
              {isLoggedIn ? "Dashboard" : "Our Portal"}
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="rounded-full bg-theme text-white px-6 py-2 text-sm font-medium hover:bg-black dark:hover:bg-accent dark:hover:text-midnight transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile controls (below md) */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="relative h-9 w-9 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-graphite dark:bg-silver rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-graphite dark:bg-silver rounded-full"
              transition={{ duration: 0.15 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-graphite dark:bg-silver rounded-full"
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute left-4 right-4 sm:left-6 sm:right-6 mt-4 z-40 flex flex-col items-center space-y-5 py-8 px-6
                       bg-white dark:bg-graphite rounded-2xl shadow-xl dark:shadow-black/40"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkClasses}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              onClick={() => setMobileOpen(false)}
              className={mobileLinkClasses}
            >
              {isLoggedIn ? "Dashboard" : "Our Portal"}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-theme text-white px-8 py-2 text-sm font-medium hover:bg-black dark:hover:bg-accent dark:hover:text-midnight transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop services/products dropdown */}
      <AnimatePresence>
        {drop && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <Dropdown onMouseLeave={hideDropdown} page={dropPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default memo(Navbar);
