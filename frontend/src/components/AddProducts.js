import React, { useState } from "react";
import notify from "./toast.js";
import useStore from "../store/store";

const AddProducts = () => {
  const postProductData = useStore((state) => state.postProductData);
  const [product, setProduct] = useState({ name: "", url: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postProductData(product);
      notify("Added");
    } catch (error) {
      notify("Enter Correct Data");
      return;
    }
  };

  return (
    <div className="bg-[#090909] p-6 border border-[#222222] rounded-lg space-y-5">
      <h3 className="text-white font-semibold text-lg mb-2">Add Product</h3>
      <div>
        <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Name</label>
        <input
          type="text" name="name" value={product.name} onChange={handleChange}
          className="w-full p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none transition-colors placeholder-[#444]"
          placeholder="Product name" required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#a0a0a0] mb-2">URL</label>
        <input
          type="text" name="url" value={product.url} onChange={handleChange}
          className="w-full p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none transition-colors placeholder-[#444]"
          placeholder="https://..." required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Description</label>
        <input
          type="text" name="description" value={product.description} onChange={handleChange}
          className="w-full p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none transition-colors placeholder-[#444]"
          placeholder="Short description" required
        />
      </div>
      <button
        type="submit" onClick={handleSubmit}
        className="rounded-full bg-[#FED500] text-[#090909] px-6 py-2 text-sm font-semibold hover:bg-[#e5c000] transition-colors"
      >
        Submit
      </button>
    </div>
  );
};

export default AddProducts;
