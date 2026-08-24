import React, { useState } from "react";
import { Link } from "react-router-dom";
import ServiceIcon from "./icons/ServiceIcons";
import useTypewriter from "../hooks/useTypewriter";

const ServiceCard = ({ name, description, id, icon }) => {
  const [active, setActive] = useState(false);
  const typed = useTypewriter(description || "", active, 14);

  return (
    <div
      className="service-card group relative overflow-hidden rounded-xl bg-[#111111] border border-[#222222] p-8 md:p-9 min-h-[290px] flex flex-col cursor-default"
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* custom background: dot grid + gold glow, revealed on pop-out */}
      <span className="service-card__grid" aria-hidden="true" />
      <span className="service-card__glow" aria-hidden="true" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="service-icon-wrap mb-6 flex items-center justify-center w-14 h-14 rounded-lg bg-[#1a1a1a] border border-[#222222] text-[#FED500]">
          <ServiceIcon type={icon} className="w-7 h-7" />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{name}</h3>

        <p className="text-[#a0a0a0] text-sm leading-relaxed flex-grow min-h-[4.5rem]">
          {active ? typed : description}
          {active && typed.length < (description || "").length && (
            <span className="typewriter-caret" aria-hidden="true" />
          )}
        </p>

        <Link
          to={`/services/${5 + id + 8}`}
          className="mt-5 inline-flex items-center text-[#FED500] text-sm font-semibold hover:underline"
        >
          Learn More <span className="ml-2 service-card__arrow">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
