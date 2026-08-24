import React from "react";

/**
 * Hand-built line-art icons, one per service. Each is a plain SVG so the
 * hover/focus motion in ServiceCard (rotate/scale/stroke-color) applies
 * uniformly via CSS on the wrapping element — no icon library dependency.
 */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

const icons = {
  webDev: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <rect x="4" y="8" width="32" height="24" rx="2" />
      <path d="M4 14h32" />
      <path d="M13 21l-4 3 4 3" />
      <path d="M20 21l-4 9" strokeWidth="1.3" />
      <path d="M23 27l4-3-4-3" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <path d="M8 32c0-9 4-15 4-15a9 9 0 0 1 16 5c0 5-4 6-7 6h-2a3 3 0 0 0 0 6h1" />
      <circle cx="14" cy="17" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="20" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="26" cy="16" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <rect x="12" y="4" width="16" height="32" rx="3" />
      <path d="M17 30h6" />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <path d="M20 5l4 4-15 15-5 1 1-5z" />
      <path d="M26 8l6 6" />
      <path d="M6 34h28" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <path d="M6 8h4l4 18h16l4-13H13" />
      <circle cx="17" cy="32" r="2" />
      <circle cx="27" cy="32" r="2" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <path d="M12 27a7 7 0 0 1-1-13.9A9 9 0 0 1 28 15a6 6 0 0 1-1 12H12z" />
      <path d="M16 32v-3M20 32v-3M24 32v-3" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <rect x="4" y="16" width="9" height="9" rx="1.5" />
      <rect x="27" y="16" width="9" height="9" rx="1.5" />
      <path d="M13 20.5h14" />
      <path d="M20 16v-4M20 12h-4M20 12h4" />
    </svg>
  ),
  qa: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <path d="M20 4l13 5v9c0 9-6 15-13 18-7-3-13-9-13-18V9z" />
      <path d="M14 20l4 4 8-8" />
    </svg>
  ),
  enterprise: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <rect x="8" y="10" width="24" height="24" />
      <path d="M14 34V16M20 34V16M26 34V16" strokeWidth="1.2" />
      <path d="M8 10l12-6 12 6" />
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <circle cx="20" cy="20" r="14" />
      <circle cx="20" cy="20" r="8" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <ellipse cx="20" cy="9" rx="12" ry="4" />
      <path d="M8 9v11c0 2.2 5.4 4 12 4s12-1.8 12-4V9" />
      <path d="M8 20v11c0 2.2 5.4 4 12 4s12-1.8 12-4V20" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 40 40" {...stroke}>
      <circle cx="20" cy="20" r="14" />
      <circle cx="20" cy="20" r="5" />
      <path d="M10 10l6 6M30 10l-6 6M10 30l6-6M30 30l-6-6" />
    </svg>
  ),
};

const ServiceIcon = ({ type, className = "" }) => (
  <span className={`service-icon inline-flex ${className}`}>
    {icons[type] || icons.custom}
  </span>
);

export default ServiceIcon;
