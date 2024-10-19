import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/utility/Navbar";
import Breadcrumb from "../components/utility/Breadcrumbs";
import BackButton from "../components/utility/BackButton";

const AddService = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "https://carenet-vercel.vercel.app/serviceRoute/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) throw new Error("Failed to create service");

        navigate("/services/home");
      } catch (error) {
        console.error("Error creating service:", error);
      }
    }
  };

  const breadcrumbItems = [
    { name: "Manage Services", href: "/services/home" },
    { name: "Add Service", href: "/add-service" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <div className="hidden sm:block w-1/6 md:w-1/5 lg:w-1/4">
          <SideBar />
        </div>
        <div className="w-full sm:w-5/6 flex flex-col items-center p-4 mt-1 sm:mt-0">
          <div className="flex flex-row items-center mb-4 w-full max-w-lg">
            <BackButton />
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
            Add New Service
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md space-y-10"
          >
            {["title", "name", "description", "price", "image"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "price" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className={`mt-1 border ${
                    errors[field] ? "border-red-500" : "border-green-500"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors[field] && (
                  <span className="text-red-500 text-sm">{errors[field]}</span>
                )}
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
              >
                Add Service
              </button>
              <button
                type="button"
                onClick={() => navigate("/services/home")}
                className="bg-gray-300 text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
