import React from "react";
import { motion } from "framer-motion";

/**
 * The site's signature surface: a chamfered top-right corner (the
 * "edge"), a hairline gradient border, and a soft glow that
 * intensifies on hover/focus. Use for stat panels, service cards,
 * and any elevated content block.
 */
const EdgeCard = ({ children, className = "", cut = "", as = "div" }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={
        `edge-cut ${cut} relative bg-white dark:bg-graphite border border-theme/15 dark:border-accent/20 ` +
        `shadow-sm hover:shadow-[0_0_28px_-6px_rgba(11,99,246,0.45)] dark:hover:shadow-[0_0_28px_-6px_rgba(0,209,255,0.4)] ` +
        `transition-shadow duration-300 ${className}`
      }
    >
      {children}
    </MotionTag>
  );
};

export default EdgeCard;
