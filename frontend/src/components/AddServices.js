import React, { useState } from "react";
import notify from "./toast.js";
import useStore from "../store/store";

const AddServices = () => {
  const postServiceData = useStore((state) => state.postServiceData);
  const [serviceImage, setServiceImage] = useState(null);
  const [feature, setFeature] = useState({ name: "", description: "" });
  const [service, setService] = useState({
    name: "", description: "", features: [feature], technologies: [""],
  });

  const handlefeatureChange = (e, index) => {
    const { name, value } = e.target;
    setFeature((prev) => ({ ...prev, [name]: value }));
    setService((prev) => {
      const newArray = [...prev.features];
      newArray[index] = { ...prev.features[index], [name]: value };
      return { ...prev, features: newArray };
    });
  };

  const handleTechnologyChange = (index, value) => {
    const newArray = [...service.technologies];
    newArray[index] = value;
    setService((prev) => ({ ...prev, technologies: newArray }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddfeature = () => {
    setService((prev) => ({ ...prev, features: [...prev.features, { name: "", description: "" }] }));
  };
  const handleAddTechnology = () => {
    setService((prev) => ({ ...prev, technologies: [...prev.technologies, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("description", service.description);
      service.technologies.forEach((tech, index) => {
        formData.append(`technologies[${index}]`, tech);
      });
      service.features.forEach((fea, index) => {
        formData.append(`features[${index}][name]`, fea.name);
        formData.append(`features[${index}][description]`, fea.description);
      });
      formData.append("image", serviceImage);
      await postServiceData(formData);
      notify("Added");
    } catch (error) {
      notify("Enter Correct Data");
      return;
    }
  };

  return (
    <div className="bg-[#090909] p-6 border border-[#222222] rounded-lg space-y-5">
      <h3 className="text-white font-semibold text-lg mb-2">Add Service</h3>
      <div>
        <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Name</label>
        <input
          type="text" name="name" value={service.name} onChange={handleChange}
          className="w-full p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none transition-colors placeholder-[#444]"
          placeholder="Service name" required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Description</label>
        <textarea
          name="description" value={service.description} onChange={handleChange}
          className="w-full p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none transition-colors placeholder-[#444]"
          placeholder="Service description" rows={4} required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#a0a0a0] mb-2">Service Image</label>
        <input
          type="file" onChange={(e) => setServiceImage(e.target.files[0])}
          className="block w-full text-sm text-[#a0a0a0] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FED500] file:text-[#090909] hover:file:bg-[#e5c000] bg-[#111111] border border-[#222222] rounded-lg p-2"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#a0a0a0]">Features</label>
        {service.features.map((fea, index) => (
          <div key={index} className="grid grid-cols-2 gap-3">
            <input
              type="text" name="name" value={fea.name} onChange={(e) => handlefeatureChange(e, index)}
              className="p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none placeholder-[#444]"
              placeholder="Feature name"
            />
            <input
              type="text" name="description" value={fea.description} onChange={(e) => handlefeatureChange(e, index)}
              className="p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none placeholder-[#444]"
              placeholder="Feature description"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddfeature} className="text-sm text-[#FED500] hover:underline">
          + Add another feature
        </button>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#a0a0a0]">Technologies</label>
        {service.technologies.map((tech, index) => (
          <input
            key={index} type="text" value={tech} onChange={(e) => handleTechnologyChange(index, e.target.value)}
            className="w-full p-3 bg-[#111111] border border-[#222222] rounded-lg text-white focus:border-[#FED500] outline-none placeholder-[#444]"
            placeholder="Technology"
          />
        ))}
        <button type="button" onClick={handleAddTechnology} className="text-sm text-[#FED500] hover:underline">
          + Add another technology
        </button>
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

export default AddServices;
