import React from "react";
import useStore from "../store/store";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const AllServices = useStore((state) => state.services);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {AllServices.slice(0, 6).map((item, index) => (
        <ServiceCard
          key={item._id || item.id || index}
          id={item.id ?? index}
          icon={item.icon}
          name={item.name}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Services;
