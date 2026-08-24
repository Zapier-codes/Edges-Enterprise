import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import notify from "./toast.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const patchForgotPassword = useStore((state) => state.patchForgotPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patchForgotPassword({ email });
      notify("Reset link sent to your email");
    } catch (error) {
      notify("Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Reset password</h2>
        <p className="text-[var(--text-dim)] mb-8">Enter your email and we'll send you a reset link</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
              placeholder="you@edgesenterprise.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#FED500] text-[#090909] font-semibold rounded-lg hover:bg-[#e5c000] transition-colors"
          >
            Send Reset Link
          </button>
        </form>
        <p className="mt-6 text-center text-[var(--text-dim)] text-sm">
          Remember your password? <Link to="/login" className="text-[#FED500] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
