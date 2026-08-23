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
      className="absolute w-full left-0 my-0 py-2 px-14 mx-0 bg-white dark:bg-graphite hidden md:flex flex-col shadow-lg dark:shadow-black/40"
    >
      <div className="m-6 ml-4 flex align-middle">
        <Link
          to={props.page ? "/products" : "/services"}
          className="font-semibold text-xl text-graphite dark:text-silver hover:text-theme dark:hover:text-accent"
        >
          See all
        </Link>
      </div>
      <hr className="border-slate/30" />
      <div className="grid grid-cols-3 mx-10 my-4 justify-content-center items-start">
        {doc &&
          doc.map((item) => (
            <Link
              key={item.id}
              to={props.page ? item.url : "/services/" + 5 + item.id + 8}
              className="font-semibold my-1 text-xl text-graphite dark:text-silver hover:text-theme dark:hover:text-accent"
              target="_blank"
            >
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default memo(Dropdown);
