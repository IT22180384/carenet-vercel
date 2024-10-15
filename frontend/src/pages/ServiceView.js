import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/utility/Navbar";
import Breadcrumb from "../components/utility/Breadcrumbs";
import BackButton from "../components/utility/BackButton";

const ServiceView = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <h1 className="text-3xl font-bold text-black-600">
                Offering The Most Advanced Clinical Programs
              </h1>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                </div>
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
                          <h2 className="text-xl font-semibold text-black-600 mb-2">
                            {service.title}
                          </h2>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {service.description}
                          </p>
                          <p className="text-blue-700 font-bold text-lg mb-4">
                            Rs.{service.price}
                          </p>
                          <button
                              onClick={() => handleBook(service)}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default ServiceView;