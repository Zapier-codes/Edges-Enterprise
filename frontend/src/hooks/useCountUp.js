import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `target` once the returned ref scrolls into view
 * (or receives focus, for keyboard/AT users who tab to it). Runs once.
 * `target` can include a trailing non-numeric suffix, e.g. "800+" or "4.7".
 */
export default function useCountUp(target, duration = 1400) {
  const match = String(target).match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || started) return undefined;

    const start = () => setStarted(true);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && start()),
      { threshold: 0.4 }
    );
    observer.observe(node);
    node.addEventListener("focus", start);

    return () => {
      observer.disconnect();
      node.removeEventListener("focus", start);
    };
  }, [started]);

  useEffect(() => {
    if (!started) return undefined;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(numeric * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const display = `${value.toFixed(decimals)}${suffix}`;
  return [ref, display];
}
