import React from "react";
import useCountUp from "../hooks/useCountUp";

const StatCounter = ({ icon, value, label }) => {
  const [ref, display] = useCountUp(value);

  return (
    <div
      ref={ref}
      tabIndex={0}
      className="flex flex-col items-center text-center space-y-3 outline-none focus-visible:ring-2 focus-visible:ring-[#FED500] rounded-lg py-2"
    >
      <img src={icon} className="w-12 h-12 opacity-80" alt="" />
      <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tabular-nums">{display}</h2>
      <p className="text-[var(--text-dim)] text-sm">{label}</p>
    </div>
  );
};

export default StatCounter;
