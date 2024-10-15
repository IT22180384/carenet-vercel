import React, { useEffect, useState } from "react";

const ServiceUpdate = ({ service, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        price: service.price || "",
        image: service.image || "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData); // Pass formData to parent for updating service
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {service ? "Edit Service" : "Add Service"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`mt-1 border ${
              errors.title ? "border-red-500" : "border-green-500"
            } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className={`mt-1 border ${
              errors.description ? "border-red-500" : "border-green-500"
            } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className={`mt-1 border ${
              errors.price ? "border-red-500" : "border-green-500"
            } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className={`mt-1 border ${
              errors.image ? "border-red-500" : "border-green-500"
            } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
        >
          {service ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-400 transition duration-200 mt-2 md:mt-0"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ServiceUpdate;
