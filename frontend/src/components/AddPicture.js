import React, { useState } from "react";
import useStore from "../store/store";
import notify from "./toast.js";

const AddPicture = () => {
  const updatePicture = useStore((state) => state.patchUpdatePicture);
  const [userImage, setUserImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", userImage);
    try {
      await updatePicture(formData);
      notify("Added");
      window.location.reload();
    } catch (error) {
      notify("Please provide correct format images only");
      return;
    }
  };

  return (
    <div className="bg-[#090909] p-6 border border-[#222222] rounded-lg">
      <h3 className="text-white font-semibold text-lg mb-4">Update Profile Picture</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-[#a0a0a0]">Add Image</label>
        <input
          className="block w-full text-sm text-[#a0a0a0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FED500] file:text-[#090909] hover:file:bg-[#e5c000] bg-[#111111] border border-[#222222] rounded-lg p-2"
          type="file"
          onChange={(e) => setUserImage(e.target.files[0])}
        />
        <button
          className="rounded-full bg-[#FED500] text-[#090909] px-6 py-2 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
          type="submit"
        >
          Add Picture
        </button>
      </form>
    </div>
  );
};

export default AddPicture;
