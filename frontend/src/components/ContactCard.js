import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Renders as a normal pill button until hovered/focused/tapped, at which
 * point a business-card panel pops out beneath it with real contact info.
 * Works on touch (tap toggles) as well as mouse/keyboard (hover/focus).
 */
const ContactCard = ({ className = "" }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const handleBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="rounded-full bg-[#FED500] text-[#090909] px-6 py-2.5 text-sm font-semibold hover:bg-[#e5c000] transition-colors duration-200"
      >
        Contact Us
      </button>

      <div
        className={`contact-card absolute right-0 mt-3 w-72 max-w-[85vw] origin-top-right rounded-xl border border-[#222222] bg-[#111111] shadow-2xl p-6 z-50 transition-all duration-250 ${
          open ? "contact-card--open" : "pointer-events-none opacity-0 scale-95 translate-y-1"
        }`}
      >
        <span className="contact-card__shine" aria-hidden="true" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-bold text-lg tracking-tight">Edges Enterprise</span>
            <span className="w-2 h-2 rounded-full bg-[#FED500]" />
          </div>
          <p className="text-[#666666] text-xs uppercase tracking-wide mb-1">Software Development Studio</p>
          <div className="h-px bg-[#222222] my-4" />
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#666666]">Email</dt>
              <dd className="text-[#a0a0a0] text-right">contact@edgesenterprise.com</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#666666]">Response time</dt>
              <dd className="text-[#a0a0a0] text-right">Within 1 business day</dd>
            </div>
          </dl>
          <Link
            to="/contact"
            className="mt-5 block text-center rounded-full bg-[#FED500] text-[#090909] px-5 py-2 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
          >
            Send a message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
