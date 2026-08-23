import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="bg-[#090909] min-h-screen">
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-[#a0a0a0] text-base">
              From groundbreaking projects to ongoing ventures, we're here to
              assist and innovate with you. We'll reach back to you within 3
              working days.
            </p>
          </div>

          <form action="#" className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-[#a0a0a0]">
                Name
              </label>
              <input
                type="text"
                className="block p-3 w-full text-sm text-white bg-[#111111] rounded-lg border border-[#222222] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[#a0a0a0]">
                Email
              </label>
              <input
                type="email"
                className="block p-3 w-full text-sm text-white bg-[#111111] rounded-lg border border-[#222222] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="name@edgesenterprise.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[#a0a0a0]">
                Select Service
              </label>
              <select
                className="block p-3 w-full text-sm text-white bg-[#111111] rounded-lg border border-[#222222] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors"
                required
              >
                <option value="" disabled selected className="text-[#444]">
                  Select the services you need
                </option>
                <option value="software">Custom Software Development</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App Development</option>
                <option value="cloud">Cloud Solutions</option>
                <option value="uiux">UI/UX Design</option>
                <option value="ecommerce">E-commerce Solutions</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[#a0a0a0]">
                Your Organization
              </label>
              <input
                type="text"
                className="block p-3 w-full text-sm text-white bg-[#111111] rounded-lg border border-[#222222] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="Your organization"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[#a0a0a0]">
                Your message
              </label>
              <textarea
                rows="6"
                className="block p-3 w-full text-sm text-white bg-[#111111] rounded-lg border border-[#222222] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[#a0a0a0]">
                Your Budget
              </label>
              <input
                type="text"
                className="block p-3 w-full text-sm text-white bg-[#111111] rounded-lg border border-[#222222] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="in USD$"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-5 text-sm font-semibold text-[#090909] bg-[#FED500] rounded-lg hover:bg-[#e5c000] transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Job CTA */}
      <section className="py-16 px-6 bg-[#111111] border-t border-[#222222]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Looking to join our team?
          </h3>
          <p className="text-[#a0a0a0] text-base">
            We're always looking for exceptional talent to help us build the future.
          </p>
          <Link
            to="/careers"
            className="inline-block rounded-full bg-[#FED500] text-[#090909] px-8 py-3 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
