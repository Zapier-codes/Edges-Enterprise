import React from "react";
import logo from "../resources/logowhite.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#090909] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="flex flex-col space-y-6">
            <img src={logo} className="w-40" alt="Edges Enterprise" />
            <p className="text-[#666666] text-sm leading-relaxed">
              Software engineering, fintech, telecommunications and enterprise technology solutions.
            </p>
            <div className="flex flex-row space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#666666] hover:text-[#FED500] transition-colors">
                <i className="fa-brands fa-facebook fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#666666] hover:text-[#FED500] transition-colors">
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#666666] hover:text-[#FED500] transition-colors">
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#666666] hover:text-[#FED500] transition-colors">
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="text-[#666666] hover:text-[#FED500] transition-colors">
                <i className="fa-brands fa-whatsapp fa-lg"></i>
              </a>
            </div>
          </div>

          {/* General */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase">General</h3>
            <Link to="/about" className="text-[#666666] hover:text-white text-sm transition-colors">About Us</Link>
            <Link to="/services" className="text-[#666666] hover:text-white text-sm transition-colors">Services</Link>
            <Link to="/products" className="text-[#666666] hover:text-white text-sm transition-colors">Products</Link>
            <Link to="/careers" className="text-[#666666] hover:text-white text-sm transition-colors">Careers</Link>
            <Link to="/contact" className="text-[#666666] hover:text-white text-sm transition-colors">Contact</Link>
          </div>

          {/* Services */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase">Services</h3>
            <span className="text-[#666666] text-sm">Custom Software</span>
            <span className="text-[#666666] text-sm">Web Development</span>
            <span className="text-[#666666] text-sm">Mobile Apps</span>
            <span className="text-[#666666] text-sm">Cloud Solutions</span>
            <span className="text-[#666666] text-sm">UI/UX Design</span>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase">Contact</h3>
            <span className="text-[#666666] text-sm">Kaduna, Kaduna State, Nigeria</span>
            <span className="text-[#666666] text-sm">Abuja, FCT, Nigeria</span>
            <a href="mailto:contact@edgesenterprise.com" className="text-[#666666] hover:text-[#FED500] text-sm transition-colors">
              contact@edgesenterprise.com
            </a>
            <a href="mailto:hr@edgesenterprise.com" className="text-[#666666] hover:text-[#FED500] text-sm transition-colors">
              hr@edgesenterprise.com
            </a>
          </div>
        </div>

        <hr className="border-[#222222] my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <small className="text-[#666666] text-xs">
            Copyright {new Date().getFullYear()} Edges Enterprise. All rights reserved.
          </small>
          <div className="flex space-x-6">
            <span className="text-[#666666] text-xs hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-[#666666] text-xs hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
