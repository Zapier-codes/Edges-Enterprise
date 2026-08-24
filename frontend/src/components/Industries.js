import React from "react";
import education from "./../resources/education.png";
import travel from "./../resources/travel.png";
import finance from "./../resources/finance.png";
import health from "./../resources/health.png";

const Industries = () => {
  const industries = [
    { name: "Healthcare", img: health, desc: "Our applications have been instrumental in revolutionizing healthcare education and patient management, driving significant advancements in the industry." },
    { name: "Travel", img: travel, desc: "With our dedicated team of software developers, machine learning experts, and data engineers, we empower leading travel & hospitality search engines." },
    { name: "Finance", img: finance, desc: "Our experts have collaborated with a diverse array of organizations, assisting them in adapting to the rapid and dynamic transformations within the financial sector." },
    { name: "Education", img: education, desc: "We have joined forces with prominent education and financial institutions, as well as nonprofits, to revolutionize and modernize global learning approaches." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
      {industries.map((ind, idx) => (
        <div
          key={idx}
          className="relative flex flex-col p-10 md:p-12 space-y-6 justify-end min-h-[320px] overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${ind.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent" />
          <div className="relative z-10">
            <h3 className="font-bold text-2xl md:text-3xl text-[var(--text-primary)] mb-3">{ind.name}</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">{ind.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Industries;
