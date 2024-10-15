import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/utility/Navbar";
import Breadcrumb from "../components/utility/Breadcrumbs";
import BackButton from "../components/utility/BackButton";
import ServiceUpdate from "../components/Tharushi/ServiceUpdate";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://health-care-system-csse.vercel.app/serviceRoute/");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBook = (service) => {
    navigate("/add-appointment", { state: { service } });
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setEditMode(true);
  };

  const handleServiceUpdate = async (updatedService) => {
    try {
      const response = await fetch(
          `https://health-care-system-csse.vercel.app/serviceRoute/${selectedService._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedService),
          }
      );
      if (!response.ok) throw new Error("Failed to update service");

      const updatedData = await response.json();

      setServices((prevServices) =>
          prevServices.map((service) =>
              service._id === updatedData._id ? updatedData : service
          )
      );
      setEditMode(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Failed to update service. Please try again.");
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(
            `https://health-care-system-csse.vercel.app/serviceRoute/${serviceId}`,
            {
              method: "DELETE",
            }
        );
        if (!response.ok) throw new Error("Failed to delete the service");

        setServices((prevServices) =>
            prevServices.filter((service) => service._id !== serviceId)
        );
      } catch (error) {
        console.error("Error deleting service:", error);
        setError("Failed to delete service. Please try again.");
      }
    }
  };

  const breadcrumbItems = [{ name: "Services", href: "/services" }];

  return (
      <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="flex flex-1">
          <div className="hidden lg:block w-1/4 xl:w-1/5">
            <SideBar />
          </div>
          <div className="w-full lg:w-3/4 xl:w-4/5 flex flex-col p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <BackButton />
                <Breadcrumb items={breadcrumbItems} />
              </div>
              <h1 className="text-3xl font-bold text-blue-600">
                Available Services
              </h1>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                  {editMode ? (
                      <ServiceUpdate
                          service={selectedService}
                          onUpdate={handleServiceUpdate}
                          onCancel={() => setEditMode(false)}
                      />
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                            >
                              <img
                                  src={service.image || "https://via.placeholder.com/300x200"}
                                  alt={service.name}
                                  className="w-full h-48 object-cover"
                              />
                              <div className="p-6">
                                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                                  {service.title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                  {service.description}
                                </p>
                                <p className="text-blue-700 font-bold text-lg mb-4">
                                  Rs.{service.price}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                      onClick={() => handleBook(service)}
                                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200 flex-grow"
                                  >
                                    Book
                                  </button>
                                  <button
                                      onClick={() => handleEdit(service)}
                                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow transition duration-200"
                                  >
                                    Edit
                                  </button>
                                  <button
                                      onClick={() => handleDelete(service._id)}
                                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </>
            )}
          </div>
        </div>
      </div>
  );
};

export default Services;