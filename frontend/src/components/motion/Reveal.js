import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps children in a fade + slide-up animation that triggers once,
 * when the element scrolls into view. Use `delay` to stagger a group
 * of siblings, and `y` to control how far it travels (px).
 * Respects prefers-reduced-motion: skips the travel, keeps a quick fade.
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  y = 24,
  duration = 0.5,
  as = "div",
}) => {
  const MotionTag = motion[as] || motion.div;
  const prefersReducedMotion = useReducedMotion();
  const travel = prefersReducedMotion ? 0 : y;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: prefersReducedMotion ? 0.15 : duration, delay }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
