import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import notify from "./toast.js";
import loginImg from "./../resources/login.svg";

const Login = () => {
  const navigate = useNavigate();
  const postLoginData = useStore((state) => state.postLoginData);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postLoginData(loginData);
      setIsLoggedIn(true);
      notify("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      notify("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">Welcome back</h2>
          <p className="text-[var(--text-dim)] mb-8">Sign in to access your dashboard</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
                placeholder="you@edgesenterprise.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/forgotPassword" className="text-sm text-[#FED500] hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#FED500] text-[#090909] font-semibold rounded-lg hover:bg-[#e5c000] transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-[var(--text-dim)] text-sm">
            Don't have an account? <Link to="/signup" className="text-[#FED500] hover:underline">Sign up</Link>
          </p>
        </div>
        <div className="md:w-1/2 bg-[var(--bg-primary)] flex items-center justify-center p-12">
          <img src={loginImg} alt="Login" className="w-full max-w-sm opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default Login;
