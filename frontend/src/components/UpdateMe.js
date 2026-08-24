import React, { useState } from "react";
import useStore from "../store/store";
import notify from "./toast.js";

const UpdateMe = () => {
  const patchUpdatePassword = useStore((state) => state.patchUpdatePassword);
  const [data, setData] = useState({
    passwordCurrent: "", password: "", passwordConfirm: "",
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
      await patchUpdatePassword(data);
      notify("Password updated successfully");
    } catch (error) {
      notify("Error updating password");
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] p-6 border border-[var(--border-color)] rounded-lg space-y-5 max-w-lg">
      <h3 className="text-[var(--text-primary)] font-semibold text-lg mb-2">Update Password</h3>
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Current Password</label>
        <input
          type="password" name="passwordCurrent" value={data.passwordCurrent} onChange={handleChange}
          className="w-full p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
          placeholder="••••••••" required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">New Password</label>
        <input
          type="password" name="password" value={data.password} onChange={handleChange}
          className="w-full p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
          placeholder="••••••••" required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Confirm New Password</label>
        <input
          type="password" name="passwordConfirm" value={data.passwordConfirm} onChange={handleChange}
          className="w-full p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:border-[#FED500] outline-none transition-colors placeholder-[var(--text-dim)]"
          placeholder="••••••••" required
        />
      </div>
      <button
        type="submit" onClick={handleSubmit}
        className="rounded-full bg-[#FED500] text-[#090909] px-6 py-2 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
      >
        Update Password
      </button>
    </div>
  );
};

export default UpdateMe;
