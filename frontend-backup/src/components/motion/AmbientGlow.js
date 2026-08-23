import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Purely decorative, blurred gradient blobs for hero/section
 * backgrounds — the "ambient" half of the futuristic direction.
 * aria-hidden, and holds still for prefers-reduced-motion.
 */
const AmbientGlow = ({ className = "" }) => {
  const prefersReducedMotion = useReducedMotion();

  const pulse = prefersReducedMotion
    ? {}
    : {
        animate: { opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] },
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden -z-10 ${className}`}
    >
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-theme/30 dark:bg-theme/25 blur-3xl"
        initial={{ opacity: 0.35 }}
        {...pulse}
      />
      <motion.div
        className="absolute top-10 -right-16 h-80 w-80 rounded-full bg-accent/25 dark:bg-accent/20 blur-3xl"
        initial={{ opacity: 0.3 }}
        {...pulse}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-purple/20 dark:bg-purple/25 blur-3xl"
        initial={{ opacity: 0.25 }}
        {...pulse}
      />
    </div>
  );
};

export default AmbientGlow;
