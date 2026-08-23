import React from "react";
import banner from "./../resources/home-banner.svg";
import userAvatar from "./../resources/userAvatar.svg";
import officeAvatar from "./../resources/officeAvatar.svg";
import documentAvatar from "./../resources/documentAvatar.svg";
import starAvatar from "./../resources/starAvatar.svg";
import office from "./../resources/office.jpg";
import { useNavigate, Link } from "react-router-dom";
import HomeSecond from "./HomeSecond";
import Testimonial from "./Testimonial";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mx-auto my-0 p-0 bg-[#090909]">
      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <img src={banner} alt="banner" className="w-full opacity-60" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight">
            A Journey of <span className="gold-gradient-text">Success</span>
          </h1>
          <p className="mt-6 text-[#a0a0a0] text-lg md:text-xl max-w-2xl">
            We design and build exceptional technology solutions that drive business transformation across industries.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-[#FED500] text-[#090909] px-8 py-3 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
            >
              Book a strategy call
            </Link>
            <button
              onClick={() => navigate("/about")}
              className="rounded-full border border-[#333] text-white px-8 py-3 text-sm font-semibold hover:border-[#FED500] hover:text-[#FED500] transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 md:py-24 px-6 bg-[#090909]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col items-center text-center space-y-3">
            <img src={userAvatar} className="w-12 h-12 opacity-80" alt="" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">800+</h2>
            <p className="text-[#666666] text-sm">People on board</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <img src={officeAvatar} className="w-12 h-12 opacity-80" alt="" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">3</h2>
            <p className="text-[#666666] text-sm">Global Offices</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <img src={documentAvatar} className="w-12 h-12 opacity-80" alt="" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">50+</h2>
            <p className="text-[#666666] text-sm">Projects completed</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <img src={starAvatar} className="w-12 h-12 opacity-80" alt="" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">4.7</h2>
            <p className="text-[#666666] text-sm">Overall Rating</p>
          </div>
        </div>
      </section>

      {/* RESULTS / TRUST BAR */}
      <section className="py-12 px-6 bg-[#111111] border-y border-[#222222]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <i key={i} className="fa-solid fa-star text-[#FED500] text-sm"></i>
              ))}
            </div>
            <span className="text-white font-semibold text-sm">5.0</span>
            <span className="text-[#666666] text-sm ml-2">94% Job Success</span>
          </div>
          <p className="text-[#a0a0a0] text-sm text-center md:text-right max-w-lg">
            We design and build platforms where two or more sides of a market meet — and transact with trust.
          </p>
        </div>
      </section>

      {/* ABOUT / DISCOVER */}
      <section className="py-16 md:py-24 px-6 bg-[#090909]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <img
              src={office}
              className="w-full rounded-lg border border-[#222222]"
              alt="Our office"
              loading="lazy"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Discovering your needs
            </h2>
            <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed">
              Our team of over 100 blends the skills of engineers, developers,
              UX architects, and designers to craft impactful solutions.
              Together, we have aided businesses in their journey toward digital
              transformation by delivering custom software that drives change.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="self-start rounded-full bg-[#FED500] text-[#090909] px-6 py-3 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* MILESTONE */}
      <section className="py-16 md:py-24 px-6 bg-[#111111]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Products that drive revenue, enable scale, and process real transactions.
            </h2>
            <p className="mt-6 text-[#a0a0a0] text-base md:text-lg">
              See what we've built — from enterprise platforms to consumer-facing applications.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-8 rounded-full border border-[#333] text-white px-6 py-3 text-sm font-semibold hover:border-[#FED500] hover:text-[#FED500] transition-colors"
            >
              Get started
            </button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="text-center">
              <span className="text-7xl md:text-8xl font-bold gold-gradient-text">50+</span>
              <p className="text-[#666666] text-sm mt-2">Projects Delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* TABBED SECTIONS */}
      <HomeSecond />

      {/* TESTIMONIALS */}
      <Testimonial />

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 px-6 bg-[#111111] border-t border-[#222222]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Create to captivate
          </h2>
          <p className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl mx-auto">
            Edges Enterprise is a technology partner for ambitious organizations.
            We don't sell code. We sell confidence in the outcome.
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-full bg-[#FED500] text-[#090909] px-8 py-3 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
          >
            Contact us
          </Link>
        </div>
      </section>

      {/* DISCUSS / BOOK CALL */}
      <section className="py-16 md:py-24 px-6 bg-[#090909]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Let's talk about what your platform needs to be true in 12 months.
            </h2>
            <p className="text-[#a0a0a0] text-base">
              During this call we do a quick intro and discuss your project and its specific needs.
            </p>
            <Link
              to="/contact"
              className="inline-block rounded-full bg-[#FED500] text-[#090909] px-8 py-3 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
            >
              Book a call
            </Link>
          </div>
          <div className="md:w-1/2 bg-[#111111] border border-[#222222] rounded-lg p-8">
            <h3 className="text-white font-semibold text-lg mb-6">Tell us more about your project</h3>
            <p className="text-[#666666] text-sm mb-6">
              Share your project details with us, and we'll respond promptly.
            </p>
            <div className="flex flex-col space-y-4">
              <Link to="/contact" className="text-[#FED500] text-sm font-medium hover:underline">
                Growth ($20k – $50k) →
              </Link>
              <Link to="/contact" className="text-[#FED500] text-sm font-medium hover:underline">
                Scale ($50k – $100k) →
              </Link>
              <Link to="/contact" className="text-[#FED500] text-sm font-medium hover:underline">
                Enterprise ($100k+) →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
