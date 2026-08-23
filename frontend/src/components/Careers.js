import React from "react";
import careersBanner from "./../resources/careersBanner.svg";
import careersImg from "./../resources/careerImg.svg";
import interview from "./../resources/interview.jpg";

const Careers = () => {
  return (
    <div className="bg-[#090909]">
      <div className="relative w-full overflow-hidden">
        <img src={careersBanner} alt="career" className="w-full opacity-50" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-6">
            Join <span className="gold-gradient-text">Our Team</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <img src={careersImg} className="w-48 h-48 mx-auto mb-8 opacity-80" alt="career" loading="lazy" />
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Unlock your potential with our personalized hiring platform!
        </h2>
        <p className="text-[#a0a0a0] text-base max-w-2xl mx-auto">
          Find the ideal job that matches your expertise and take the next step in your career today.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img src={interview} className="w-full rounded-lg border border-[#222222]" alt="" loading="lazy" />
          </div>
          <div className="lg:w-1/2 bg-[#111111] border border-[#222222] rounded-lg p-8 md:p-12 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">Fresh Graduate Hiring</h3>
            <p className="text-[#a0a0a0] text-base leading-relaxed">
              Recently graduated? Thrive yourself with Edges Enterprise by registering to our Fresh Graduate Hiring Program before 3rd January {new Date().getFullYear() + 1}!
            </p>
            <button disabled className="rounded-full bg-[#FED500] text-[#090909] px-6 py-3 text-sm font-semibold opacity-50 cursor-not-allowed">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24 px-6 bg-[#111111] border-y border-[#222222]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "fa-kit-medical", title: "Medical Allowance" },
              { icon: "fa-utensils", title: "Free Lunch Facility" },
              { icon: "fa-van-shuttle", title: "Conveyance Service" },
              { icon: "fa-plus", title: "Yearly Increments" },
              { icon: "fa-award", title: "Awards and Prizes" },
              { icon: "fa-dumbbell", title: "Gym and Fitness" },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-start p-8 border border-[#222222] bg-[#090909] rounded-lg card-hover">
                <div className="flex items-center space-x-4">
                  <i className={`fa-solid ${b.icon} fa-xl text-[#FED500]`}></i>
                  <h3 className="text-xl font-bold text-white">{b.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
