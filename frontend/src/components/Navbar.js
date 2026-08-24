import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "./../resources/logo2.svg";
import Dropdown from "./Dropdown";
import ContactCard from "./ContactCard";
import useStore from "../store/store";

const Navbar = (props) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const [drop, setDrop] = useState(false);
  const [dropPage, setDropPage] = useState(true);
  const containerRef = useRef(null);

  const handleShowDropdown = (e) => {
    if (e.target.innerText === "Portfolio") {
      setDropPage(true);
    } else {
      setDropPage(false);
    }
    if (
      e.target &&
      e.target.childNodes.length > 1 &&
      e.target.childNodes[1].childNodes[0].childNodes[0]
    ) {
      setDrop(true);
      e.target.childNodes[1].childNodes[0].childNodes[0].setAttribute(
        "stroke",
        "#FED500"
      );
    }
  };

  const handleHideDropdown = useCallback(() => {
    setDrop(false);
    const arrows = document.getElementsByClassName("arrow");
    if (arrows[0]) arrows[0].setAttribute("stroke", "#a0a0a0");
    if (arrows[1]) arrows[1].setAttribute("stroke", "#a0a0a0");
  }, []);

  useEffect(() => {
    const handleContainerMouseLeave = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDrop(false);
        const arrows = document.getElementsByClassName("arrow");
        if (arrows[0]) arrows[0].setAttribute("stroke", "#a0a0a0");
        if (arrows[1]) arrows[1].setAttribute("stroke", "#a0a0a0");
      }
    };
    document.addEventListener("mouseleave", handleContainerMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleContainerMouseLeave);
    };
  }, []);

  return (
    <nav ref={containerRef} className="relative py-4 px-6 mx-auto bg-[#090909] border-b border-[#222222]">
      <div className="flex items-center justify-between md:space-x-6 max-w-7xl mx-auto">
        <Link to="/" className="">
          <img src={logo} className="w-40 md:w-48" alt="Edges Enterprise" />
        </Link>
        <ul className="hidden menu space-x-8 md:flex items-center">
          <li className="flex relative items-center">
            <Link
              to="/about"
              className="text-[#a0a0a0] text-sm font-medium tracking-wide hover:text-white transition-colors duration-200"
            >
              About Us
            </Link>
          </li>
          <li className="flex relative items-center">
            <Link
              onMouseEnter={(e) => handleShowDropdown(e)}
              to="/services"
              className="text-[#a0a0a0] hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 flex items-center"
            >
              What we do?
              <span className="ml-2 rotate-90 inline-block">
                <svg viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg" width="6">
                  <path
                    className="arrow"
                    d="m1 17.5 8-8-8-8"
                    stroke="#a0a0a0"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
          <li className="flex relative items-center">
            <Link
              onMouseEnter={(e) => handleShowDropdown(e)}
              to="/products"
              className="text-[#a0a0a0] text-sm font-medium tracking-wide hover:text-white transition-colors duration-200 flex items-center"
            >
              Portfolio
              <span className="ml-2 rotate-90 inline-block">
                <svg viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg" width="6">
                  <path
                    className="arrow"
                    d="m1 17.5 8-8-8-8"
                    stroke="#a0a0a0"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
          <li className="flex relative items-center">
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="text-[#a0a0a0] text-sm font-medium tracking-wide hover:text-white transition-colors duration-200"
            >
              {isLoggedIn ? "Dashboard" : "Client Portal"}
            </Link>
          </li>
          <li className="flex relative items-center">
            <Link
              to="/careers"
              className="text-[#a0a0a0] text-sm font-medium tracking-wide hover:text-white transition-colors duration-200"
            >
              Careers
            </Link>
          </li>
        </ul>
        <div className="hidden md:block">
          <ContactCard />
        </div>

        <button
          id="menu-btn"
          className="hamburger block md:hidden focus:outline-none"
          onClick={props.hamburger}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      <div className="md:hidden">
        <div
          className="absolute items-center self-end flex-col py-8 mt-6 hidden space-y-6 font-bold bg-[#111111] border border-[#222222] sm:self-center sm:w-auto left-6 right-6 drop-shadow-xl z-50 rounded-lg"
          id="menu"
        >
          <Link to="/about" className="text-[#a0a0a0] font-semibold hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/services" className="text-[#a0a0a0] font-semibold hover:text-white transition-colors">
            What we do?
          </Link>
          <Link to="/products" className="text-[#a0a0a0] font-semibold hover:text-white transition-colors">
            Portfolio
          </Link>
          <Link to={isLoggedIn ? "/dashboard" : "/login"} className="text-[#a0a0a0] font-semibold hover:text-white transition-colors">
            {isLoggedIn ? "Dashboard" : "Client Portal"}
          </Link>
          <Link to="/careers" className="text-[#a0a0a0] font-semibold hover:text-white transition-colors">
            Careers
          </Link>
          <Link to="/contact" className="rounded-full bg-[#FED500] text-[#090909] px-6 py-2.5 text-sm font-semibold">
            Contact Us
          </Link>
        </div>
      </div>
      {drop && (
        <Dropdown page={dropPage} onMouseLeave={handleHideDropdown} />
      )}
    </nav>
  );
};

export default Navbar;
