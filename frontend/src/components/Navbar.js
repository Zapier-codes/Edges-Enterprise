import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import logo from "./../resources/logo2.svg";
import Dropdown from "./Dropdown";
import ThemeToggle from "./ThemeToggle";
import useStore from "../store/store";

const Navbar = (props) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  const [drop, setDrop] = useState(false);
  const [dropPage, setDropPage] = useState(true);
  const containerRef = useRef(null);

  const handleShowDropdown = (e) => {
    if (e.target.innerText === "Our Products") {
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
        "#000000"
      );
    }
  };

  const handleHideDropdown = useCallback(() => {
    setDrop(false);
    document
      .getElementsByClassName("arrow")[0]
      .setAttribute("stroke", "#0A76DB");
    document
      .getElementsByClassName("arrow")[1]
      .setAttribute("stroke", "#0A76DB");
  }, []);

  useEffect(() => {
    const handleContainerMouseLeave = (e) => {
      if (!containerRef.current.contains(e.target)) {
        setDrop(false);
        document
          .getElementsByClassName("arrow")[0]
          .setAttribute("stroke", "#0A76DB");
        document
          .getElementsByClassName("arrow")[1]
          .setAttribute("stroke", "#0A76DB");
      }
    };

    document.addEventListener("mouseleave", handleContainerMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleContainerMouseLeave);
    };
  }, []);

  return (
    <nav ref={containerRef} className="relative p-6 mx-auto">
      <div className="flex items-center justify-between md:space-x-6 ">
        <Link to="/" className="">
          <img src={logo} className="w-1/2" alt="logo" />
        </Link>
        <ul className="hidden menu space-x-6 md:flex">
          <li className="flex relative items-center">
            <Link
              to="/about"
              className="text-theme dark:text-accent text-lg font-normal mr-6 hover:text-[#000000] dark:hover:text-white"
            >
              About Us
            </Link>
          </li>
          <li className="flex relative items-center">
            <Link
              onMouseEnter={(e) => handleShowDropdown(e)}
              to="/services"
              className="text-theme dark:text-accent  hover:text-[#000000] dark:hover:text-white text-lg font-normal"
            >
              What we do?
              <span className="mx-3 rotate-90 inline-block">
                <svg
                  viewBox="0 0 10 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                >
                  <path
                    className="arrow"
                    d="m1 17.5 8-8-8-8"
                    stroke="#0A76DB"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </Link>
          </li>
          <li className="flex relative items-center ">
            <Link
              onMouseEnter={(e) => handleShowDropdown(e)}
              to="/products"
              className="text-theme dark:text-accent text-lg font-normal hover:text-[#000000] dark:hover:text-white"
            >
              Our Products
              <span className="mx-3 rotate-90 inline-block">
                <svg
                  viewBox="0 0 10 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                >
                  <path
                    className="arrow"
                    d="m1 17.5 8-8-8-8"
                    stroke="#0A76DB"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </Link>
          </li>
          <li className="flex relative items-center">
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="text-theme dark:text-accent ml-2 mr-4 text-lg font-normal hover:text-[#000000] dark:hover:text-white"
            >
              {isLoggedIn ? "Dashboard" : "Our Portal"}
            </Link>
          </li>
          <li className="flex relative items-center">
            <Link
              to="/careers"
              className="text-theme dark:text-accent text-lg font-normal hover:text-[#000000] dark:hover:text-white"
            >
              Careers
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Link
            to="/contact"
            className="rounded-full bg-theme text-[#FFFFFF] lg:p-2 md::px-8 md:text-sm hover:bg-[#000000] dark:hover:bg-accent dark:hover:text-midnight"
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
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
      </div>
      <div className="md:hidden">
        <div
          className="absolute items-center self-end flex-col py-8 mt-10 hidden space-y-6 font-bold bg-white dark:bg-graphite sm:self-center sm:w-auto left-6 right-6 drop-shadow-md dark:shadow-black/40"
          id="menu"
        >
          <Link
            to="/about"
            className="text-theme dark:text-accent font-semibold hover:text-[#000000] dark:hover:text-white"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-theme dark:text-accent font-semibold hover:text-[#000000]] dark:hover:text-white"
          >
            What we do?
          </Link>
          <Link
            to="/products"
            className="text-theme dark:text-accent font-semibold hover:text-[#000000] dark:hover:text-white"
          >
            Our Products
          </Link>
          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className="text-theme dark:text-accent font-semibold hover:text-[#000000] dark:hover:text-white"
          >
            {isLoggedIn ? "Dashboard" : "Our Portal"}
          </Link>
          <Link
            to="/careers"
            className="text-theme dark:text-accent font-semibold hover:text-[#000000] dark:hover:text-white"
          >
            Careers
          </Link>
        </div>
      </div>
      {drop && <Dropdown onMouseLeave={handleHideDropdown} page={dropPage} />}
    </nav>
  );
};

export default memo(Navbar);
