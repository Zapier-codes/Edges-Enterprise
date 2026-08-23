import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import notify from "./toast.js";
import signupImg from "./../resources/signup.svg";

const Signup = () => {
  const navigate = useNavigate();
  const postSignUpData = useStore((state) => state.postSignUpData);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.passwordConfirm) {
      notify("Passwords do not match");
      return;
    }
    try {
      await postSignUpData(signupData);
      notify("Account created successfully");
      navigate("/login");
    } catch (error) {
      notify("Error creating account");
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Create account</h2>
          <p className="text-[#666666] mb-8">Join Edges Enterprise today</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleChange}
                className="w-full p-3 bg-[#090909] border border-[#222222] rounded-lg text-white focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                className="w-full p-3 bg-[#090909] border border-[#222222] rounded-lg text-white focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="you@edgesenterprise.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
                className="w-full p-3 bg-[#090909] border border-[#222222] rounded-lg text-white focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                value={signupData.passwordConfirm}
                onChange={handleChange}
                className="w-full p-3 bg-[#090909] border border-[#222222] rounded-lg text-white focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[#444]"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#FED500] text-[#090909] font-semibold rounded-lg hover:bg-[#e5c000] transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-[#666666] text-sm">
            Already have an account? <Link to="/login" className="text-[#FED500] hover:underline">Sign in</Link>
          </p>
        </div>
        <div className="md:w-1/2 bg-[#0a0a0a] flex items-center justify-center p-12">
          <img src={signupImg} alt="Signup" className="w-full max-w-sm opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
