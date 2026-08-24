import { useEffect, useRef, useState } from "react";

/**
 * Types `text` out one character at a time whenever `active` flips to true.
 * Resets to empty (and re-types from scratch) whenever `active` flips to false
 * then true again, so hovering/focusing a card repeatedly replays the effect.
 */
export default function useTypewriter(text, active, speed = 18) {
  const [output, setOutput] = useState("");
  const frame = useRef(null);

  useEffect(() => {
    if (!active) {
      setOutput("");
      return undefined;
    }

    let i = 0;
    setOutput("");

    const tick = () => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i < text.length) {
        frame.current = setTimeout(tick, speed);
      }
    };

    frame.current = setTimeout(tick, speed);
    return () => clearTimeout(frame.current);
  }, [active, text, speed]);

  return output;
}
