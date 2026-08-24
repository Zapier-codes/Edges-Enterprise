import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Fixed-position floating action button, bottom-right on every page.
 * Click to expand a small panel with quick contact options. Closes on
 * outside click, Escape, or route navigation via the panel's own links.
 */
const ContactBubble = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const options = [
    {
      key: "message",
      label: "Send a message",
      sub: "We reply within 1 business day",
      href: "/contact",
      internal: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      key: "email",
      label: "Email us",
      sub: "contact@edgesenterprise.com",
      href: "mailto:contact@edgesenterprise.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 4h16v16H4z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      ),
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      sub: "Chat with our team",
      href: "https://whatsapp.com",
      icon: <i className="fa-brands fa-whatsapp fa-lg" />,
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Expanded panel */}
      <div
        className={`mb-3 w-72 max-w-[85vw] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden origin-bottom-right transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 border-b border-[var(--border-color)]">
          <p className="text-[var(--text-primary)] font-bold">Let's talk</p>
          <p className="text-[var(--text-dim)] text-xs mt-0.5">
            Pick whatever's easiest for you
          </p>
        </div>
        <div className="py-2">
          {options.map((opt) =>
            opt.internal ? (
              <Link
                key={opt.key}
                to={opt.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <span className="text-[#FED500]">{opt.icon}</span>
                <span className="flex flex-col text-left">
                  <span className="text-[var(--text-primary)] text-sm font-semibold">
                    {opt.label}
                  </span>
                  <span className="text-[var(--text-dim)] text-xs">{opt.sub}</span>
                </span>
              </Link>
            ) : (
              <a
                key={opt.key}
                href={opt.href}
                target={opt.href.startsWith("http") ? "_blank" : undefined}
                rel={opt.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <span className="text-[#FED500]">{opt.icon}</span>
                <span className="flex flex-col text-left">
                  <span className="text-[var(--text-primary)] text-sm font-semibold">
                    {opt.label}
                  </span>
                  <span className="text-[var(--text-dim)] text-xs">{opt.sub}</span>
                </span>
              </a>
            )
          )}
        </div>
      </div>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="relative h-14 w-14 rounded-full bg-[#FED500] text-[#090909] shadow-lg shadow-black/20 flex items-center justify-center hover:bg-[#e5c000] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FED500] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#FED500] contact-bubble-ping" aria-hidden="true" />
        )}
        <span className="relative z-10">
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="w-6 h-6">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default ContactBubble;
