import React from "react";
import productBanner from "./../resources/productBanner.svg";
import SingleProduct from "./SingleProduct";
import useStore from "../store/store";

const ProductsMain = () => {
  const AllProducts = useStore((state) => state.products);

  return (
    <div className="bg-[var(--bg-primary)]">
      {/* Banner */}
      <div className="relative w-full overflow-hidden">
        <img src={productBanner} alt="" className="w-full opacity-50" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] text-center px-6">
            Delivering High <br /> <span className="gold-gradient-text">Class Engineering Projects</span>
          </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AllProducts.map((item, index) => (
            <SingleProduct
              name={item.name}
              description={item.description}
              key={item.id}
              url={item.url}
              id={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsMain;
