import React, { useState } from "react";
import Industries from "./Industries";
import Services from "./Services";
import Products from "./Products";

const HomeSecond = () => {
  const [page, setPage] = useState("Services");
  const handleChangePage = (val) => {
    if (val === "Products") setPage("Products");
    else if (val === "Services") setPage("Services");
    else setPage("Industries");
  };

  return (
    <div className="flex flex-col py-16 md:py-24 px-6 bg-[var(--bg-primary)] slide-texture">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#FED500] text-xs font-semibold tracking-[0.2em] uppercase mb-4 inline-block">
            02 — Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            We've achieved partnerships, certifications, and customer growth
          </h2>
          <p className="text-[var(--text-muted)] text-base md:text-lg max-w-3xl mx-auto">
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
                ? "border-[#FED500] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-primary)]"
            }`}
          >
            Industries
          </button>
          <button
            onClick={() => handleChangePage("Services")}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
              page === "Services"
                ? "border-[#FED500] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-primary)]"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => handleChangePage("Products")}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
              page === "Products"
                ? "border-[#FED500] text-[var(--text-primary)]"
                : "border-transparent text-[var(--text-dim)] hover:text-[var(--text-primary)]"
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
