import React, { useState } from "react";
import Industries from "./Industries";
import Services from "./Services";
import Products from "./Products";

const HomeSecond = () => {
  const [page, setPage] = useState("Industries");
  const handleChangePage = (val) => {
    if (val === "Products") setPage("Products");
    else if (val === "Services") setPage("Services");
    else setPage("Industries");
  };

  return (
    <div className="flex flex-col py-16 md:py-24 px-6 bg-[#090909]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            We've achieved partnerships, certifications, and customer growth
          </h2>
          <p className="text-[#a0a0a0] text-base md:text-lg max-w-3xl mx-auto">
            Edges Enterprise's rich experience and strong work ethic have
            forged valuable industry partnerships, leading to coveted
            certifications from industry leaders.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-row justify-center items-center mb-12">
          <button
            onClick={() => handleChangePage("Industries")}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
              page === "Industries"
                ? "border-[#FED500] text-white"
                : "border-transparent text-[#666666] hover:text-white"
            }`}
          >
            Industries
          </button>
          <button
            onClick={() => handleChangePage("Services")}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
              page === "Services"
                ? "border-[#FED500] text-white"
                : "border-transparent text-[#666666] hover:text-white"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleChangePage("Products")}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
              page === "Products"
                ? "border-[#FED500] text-white"
                : "border-transparent text-[#666666] hover:text-white"
            }`}
          >
            Products
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {page === "Industries" && <Industries />}
          {page === "Services" && <Services />}
          {page === "Products" && <Products />}
        </div>
      </div>
    </div>
  );
};

export default HomeSecond;
