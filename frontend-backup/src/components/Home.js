import React from "react";
import banner from "./../resources/home-banner.svg";
import userAvatar from "./../resources/userAvatar.svg";
import officeAvatar from "./../resources/officeAvatar.svg";
import documentAvatar from "./../resources/documentAvatar.svg";
import starAvatar from "./../resources/starAvatar.svg";
import office from "./../resources/office.jpg";
import { useNavigate } from "react-router-dom";
import HomeSecond from "./HomeSecond";
import Testimonial from "./Testimonial";
import Reveal from "./motion/Reveal";
import EdgeCard from "./motion/EdgeCard";
import AmbientGlow from "./motion/AmbientGlow";

const STATS = [
  { icon: userAvatar, value: "800+", label: "People on board" },
  { icon: officeAvatar, value: "3", label: "Global Offices" },
  { icon: documentAvatar, value: "50+", label: "Projects completed" },
  { icon: starAvatar, value: "4.7", label: "Overall Rating" },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mx-auto my-0 p-0">
      <img src={banner} alt="banner" className="" loading="lazy" />
      <div className="relative justify-center items-center text-center flex flex-col m-4 p-4">
        <AmbientGlow />
        <Reveal as="h1" className="md:text-6xl text-4xl font-bold">
          A Journey of <span className="text-theme dark:text-accent">Success</span>
        </Reveal>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 lg:space-x-12 py-4 p-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="p-2">
              <EdgeCard
                cut="edge-cut-sm"
                className="flex flex-col items-center justify-center text-center px-8 py-6 space-y-2 w-44"
              >
                <img src={stat.icon} className="max-w-16 max-h-16" alt="" />
                <h1 className="text-4xl font-bold">{stat.value}</h1>
                <p className="text-metal dark:text-slate">{stat.label}</p>
              </EdgeCard>
            </Reveal>
          ))}
        </div>

        <div className="edge-divider w-full max-w-3xl my-8" />

        <div className="flex flex-col md:bg-transparent bg-[#dbeafe] dark:md:bg-transparent dark:bg-graphite lg:flex-row -mx-10 my-4 lg:p-2 md:relative justify-center lg:justify-end items-center lg:items-center md:items-end">
          <img
            src={office}
            className="lg:h-4/6 md:h-3/5 md:w-2/5 h-2/3  md:top-auto md:left-10 md:absolute lg:w-5/12"
            alt=""
            loading="lazy"
          />

          <Reveal
            delay={0.15}
            className="md:bg-[#dbeafe] dark:md:bg-graphite md:ps-24 flex flex-col text-left items-start justify-center lg:h-[32rem] lg:w-3/5 md:h-[22rem] md:w-3/5 md:mx-0 md:my-0 my-4 mx-2  md:p-10 space-y-4 lg:space-y-12 r-8"
          >
            <h1 className="font-bold md:text-3xl text-3xl lg:text-4xl">
              Discovering your needs
            </h1>
            <p className="md:text-l lg:text-xl">
              Our team of over 100 blends the skills of engineers, developers,
              UX architects, and designers to craft impactful solutions.
              Together, we have aided businesses in their journey toward digital
              transformation by delivering custom software that drives change.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="edge-cut-sm font-semibold text-white bg-theme px-5 py-2 hover:bg-black dark:hover:bg-accent dark:hover:text-midnight transition-colors"
            >
              Learn More
            </button>
          </Reveal>
        </div>
      </div>

      <HomeSecond />
      <Testimonial />
    </div>
  );
};

export default Home;
