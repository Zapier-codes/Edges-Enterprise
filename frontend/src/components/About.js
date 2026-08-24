import React from "react";
import banner from "./../resources/about-banner.svg";
import features from "./../resources/companyFeatures.svg";

const About = () => {
  return (
    <div className="bg-[var(--bg-primary)]">
      {/* Banner */}
      <div className="relative w-full overflow-hidden">
        <img src={banner} alt="banner" className="w-full opacity-50" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] text-center">
            About <span className="gold-gradient-text">Us</span>
          </h1>
        </div>
      </div>

      {/* Value Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[var(--text-primary)] mb-16">
          Your Preferred Trusted Partner <br /> for Exceptional Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-start p-8 space-y-6 border border-[var(--border-color)] bg-[var(--bg-surface)] rounded-lg card-hover">
            <div className="flex items-center space-x-4">
              <i className="fa-solid fa-handshake fa-xl text-[#FED500]"></i>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Creating Enduring <br /> Partnerships
              </h3>
            </div>
            <div className="w-full h-px bg-[var(--border-color)]" />
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Fostering enduring partnerships through value creation across diverse industries.
            </p>
          </div>

          <div className="flex flex-col items-start p-8 space-y-6 border border-[var(--border-color)] bg-[var(--bg-surface)] rounded-lg card-hover">
            <div className="flex items-center space-x-4">
              <i className="fa-regular fa-gem fa-xl text-[#FED500]"></i>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Delivering Lasting <br /> Value
              </h3>
            </div>
            <div className="w-full h-px bg-[var(--border-color)]" />
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Our skilled engineers are dedicating their expertise to craft tangible value for our clients.
            </p>
          </div>

          <div className="flex flex-col items-start p-8 space-y-6 border border-[var(--border-color)] bg-[var(--bg-surface)] rounded-lg card-hover">
            <div className="flex items-center space-x-4">
              <i className="fa-solid fa-certificate fa-xl text-[#FED500]"></i>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Verified & Certified Proficiency
              </h3>
            </div>
            <div className="w-full h-px bg-[var(--border-color)]" />
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              From enterprise to analytical software, we serve every industry with excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="py-16 md:py-24 px-6 bg-[var(--bg-surface)] border-y border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
            Guided by Our Founding Principles
          </h2>
          <img src={features} alt="Company features" className="mx-auto max-w-4xl w-full opacity-90" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default About;
