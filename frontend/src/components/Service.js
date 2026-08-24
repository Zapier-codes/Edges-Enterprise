import React, { useEffect, useState } from "react";
import serviceImg from "./../resources/careerImg.svg";
import { Link, useParams } from "react-router-dom";
import useStore from "../store/store";

const Service = () => {
  const { getServiceImage } = useStore();
  const [found, setFound] = useState(null);
  const { services } = useStore();
  const params = useParams().id.slice(1, -1);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const foundService = services.find((item) => params === item._id);
    setFound(foundService);
    if (foundService) {
      const getImage = async () => {
        try {
          const response = await getServiceImage(foundService.image);
          const fileBlob = new Blob([response.data]);
          const fileUrl = URL.createObjectURL(fileBlob);
          setImg(fileUrl);
        } catch (error) {
          console.log(error);
        }
      };
      getImage();
    }
    // eslint-disable-next-line
  }, [services, params]);

  if (!found || !img) return null;

  return (
    found && (
      <div className="bg-[var(--bg-primary)] min-h-screen">
        <div className="mx-auto md:my-6 mb-24 px-6 md:px-10 py-8 flex flex-col-reverse justify-between md:flex-row items-center md:space-x-6 space-y-8">
          <div className="flex flex-col md:items-start items-center space-y-8 md:space-y-16 md:w-1/2">
            <h1 className="text-4xl md:text-5xl mt-8 font-bold text-[var(--text-primary)]">{found.name}</h1>
            <p className="text-xl md:text-2xl text-[var(--text-muted)]">{found.description}</p>
            <Link
              to="/contact"
              className="bg-[#FED500] rounded-full font-semibold text-[#090909] p-3 px-6 hover:bg-[#e5c000] transition-colors"
            >
              Start your Project
            </Link>
          </div>
          <div className="flex md:w-1/2 md:justify-end items-center justify-center">
            <img src={img || serviceImg} className="w-11/12 h-3/4 md:h-[400px] rounded-lg border border-[var(--border-color)]" alt="" loading="lazy" />
          </div>
        </div>

        <div className="flex flex-col mx-auto bg-[var(--bg-surface)] border-y border-[var(--border-color)] space-y-16 py-16 px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[var(--text-primary)]">
            What makes it stand out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {found.features.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start px-8 py-12 space-y-6 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg card-hover">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{item.name}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:flex-row my-16 p-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center md:w-1/2 text-[var(--text-primary)] mb-8 md:mb-0">
            Technology Stack <br /> Used
          </h2>
          <div className="flex flex-col text-center md:w-1/2 p-6 space-y-px">
            {found.technologies && found.technologies.map((tech, idx) => (
              <div key={idx} className="flex justify-center text-center bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 hover:border-[#FED500] transition-colors">
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{tech}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Service;
