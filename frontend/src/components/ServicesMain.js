import React from "react";
import servicesBanner from "./../resources/servicesBanner.svg";
import ServiceCard from "./ServiceCard";
import useStore from "../store/store";

const ServicesMain = () => {
  const { services } = useStore();
  return (
    <div className="bg-[#090909]">
      {/* Banner */}
      <div className="relative w-full overflow-hidden">
        <img src={servicesBanner} alt="" className="w-full opacity-50" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <span className="text-[#FED500] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            What We Do
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Delivering Exceptional <br /> <span className="gold-gradient-text">Engineering Services</span>
          </h1>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <ServiceCard
              key={item._id || item.id || index}
              id={item.id ?? index}
              icon={item.icon}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesMain;
