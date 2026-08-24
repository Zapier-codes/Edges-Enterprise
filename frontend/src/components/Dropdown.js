import React from "react";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import { memo } from "react";

const Dropdown = (props) => {
  let doc;
  let products = useStore((state) => state.products);
  let services = useStore((state) => state.services);
  if (props.page) {
    doc = products;
  } else {
    doc = services;
  }
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      className="absolute w-full left-0 my-0 py-4 px-14 mx-0 bg-[var(--bg-surface)] border border-[var(--border-color)] hidden md:flex flex-col z-50"
    >
      <div className="m-6 ml-4 flex align-middle">
        <Link to={props.page ? "/products" : "/services"} className="font-semibold text-[#FED500] text-lg hover:underline">
          See all →
        </Link>
      </div>
      <hr className="border-[var(--border-color)]" />
      <div className="grid grid-cols-3 mx-10 my-4 justify-content-center items-start">
        {doc && doc.map((item) => (
          <Link
            key={item._id || item.id}
            to={props.page ? item.url : "/services/" + 5 + item.id + 8}
            className="font-semibold my-2 text-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            target={props.page ? "_blank" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(Dropdown);
