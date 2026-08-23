import React from "react";
import useStore from "../store/store";

const Products = () => {
  const AllProducts = useStore((state) => state.products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222222] border border-[#222222]">
      {AllProducts.slice(0, 4).map((item, index) => (
        <div
          key={item._id || index}
          className="flex flex-col p-10 md:p-12 space-y-6 justify-center bg-[#111111] min-h-[280px] card-hover"
        >
          <h3 className="font-bold text-2xl md:text-3xl text-white">
            {item.name}
          </h3>
          <p className="text-[#a0a0a0] text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Products;
