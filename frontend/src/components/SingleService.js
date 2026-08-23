import React, { memo } from "react";
import { Link } from "react-router-dom";

const SingleService = ({ name, description, id }) => {
  return (
    <div className="flex flex-col items-start justify-center py-10 px-8 md:px-10 space-y-4 bg-[#111111] border border-[#222222] rounded-lg card-hover min-h-[280px]">
      <h3 className="text-xl md:text-2xl font-bold text-white">{name}</h3>
      <p className="text-[#a0a0a0] text-sm leading-relaxed flex-grow">{description}</p>
      <Link
        to={`/services/${5 + id + 8}`}
        className="mt-4 inline-flex items-center text-[#FED500] text-sm font-semibold hover:underline"
      >
        Learn More <span className="ml-2">→</span>
      </Link>
    </div>
  );
};

export default memo(SingleService);
