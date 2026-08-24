import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import notify from "./toast.js";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const patchResetPassword = useStore((state) => state.patchResetPassword);

  const [data, setData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.passwordConfirm) {
      notify("Passwords do not match");
      return;
    }
    try {
      await patchResetPassword({ password: data.password, passwordConfirm: data.passwordConfirm, token });
      notify("Password reset successful");
      navigate("/login");
    } catch (error) {
      notify("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">New password</h2>
        <p className="text-[var(--text-dim)] mb-8">Create a strong password for your account</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">New Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              value={data.passwordConfirm}
              onChange={handleChange}
              className="w-full p-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] focus:ring-1 focus:ring-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#FED500] text-[#090909] font-semibold rounded-lg hover:bg-[#e5c000] transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
