import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useStore from "./../store/store";
import fourth from './../resources/1.jpg'
import second from './../resources/2.jpg'
import third from './../resources/3.jpg'
import first from './../resources/4.png'

const Testimonial = () => {
  const [slidesToShow, setSlidesToShow] = useState(2);
  const reviews = useStore((state) => state.reviews);
  const images = [first, second, third, fourth];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div className="bg-[#111111] border-y border-[#222222] py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            What our clients say
          </h2>
          <p className="text-[#a0a0a0] text-base">
            Real feedback from real partners — not after the pitch, after launch.
          </p>
        </div>
        <div className="h-auto pb-8">
          <Slider {...settings}>
            {reviews.map((item, index) => (
              <div className="px-3" key={item._id}>
                <div className="flex flex-col items-start p-8 bg-[#090909] border border-[#222222] rounded-lg min-h-[320px]">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={images[index]}
                      alt=""
                      className="rounded-full w-14 h-14 object-cover border border-[#222222]"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-base">{item.user.name}</h4>
                      <p className="text-[#666666] text-xs">{item.createdAt.split('T')[0]}</p>
                    </div>
                  </div>
                  <p className="text-[#a0a0a0] text-sm leading-relaxed flex-grow">
                    "{item.review}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-[#222222] w-full">
                    <span className="text-[#FED500] text-xs font-medium">{item.service.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
