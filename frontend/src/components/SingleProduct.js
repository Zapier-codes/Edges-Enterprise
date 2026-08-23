import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../resources/logo.svg";
import text from "./../resources/text.png";
import web from "./../resources/web.png";
import matours from "./../resources/matours.png";

const SingleProduct = ({ name, description, id, url }) => {
  const [hover, setHover] = useState(false);
  const logos = [matours, text, web, logo];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col items-start justify-center py-10 px-8 md:px-10 space-y-4 bg-[#111111] border border-[#222222] rounded-lg transition-all duration-300 min-h-[280px]"
      style={{ borderColor: hover ? '#FED500' : '#222222' }}
    >
      <img src={logos[id]} className="w-16 h-16 object-contain opacity-80" alt="" />
      <h3 className="text-xl md:text-2xl font-bold text-white">{name}</h3>
      <p className="text-[#a0a0a0] text-sm leading-relaxed flex-grow">{description}</p>
      <Link
        to={url}
        className="mt-4 inline-flex items-center text-[#FED500] text-sm font-semibold hover:underline"
        target="_blank"
      >
        Visit Website <span className="ml-2">→</span>
      </Link>
    </div>
  );
};

export default memo(SingleProduct);
