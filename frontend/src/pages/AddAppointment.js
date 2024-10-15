import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/utility/Navbar";
import Breadcrumb from "../components/utility/Breadcrumbs";
import BackButton from "../components/utility/BackButton";

const AddAppointment = () => {
  const { state } = useLocation(); // Access the service data passed via navigation
  const service = state?.service || {}; // Get service data if available

  const [formData, setFormData] = useState({
    appointmentDate: "",
    time: "",
    appointmentReason: service.title || "", // Pre-fill with service title if available
    location: service.location || "", // Pre-fill with service location if available
    notes: "",
    doctorId: "",
  });

  const [doctors, setDoctors] = useState([]); // State to hold doctor data
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://carenet-vercel.vercel.app/doctorRoute/");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setDoctors(data); // Set doctors in state
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors when the user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  // Validate form inputs
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
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "https://carenet-vercel.vercel.app/appointmentRoute/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) throw new Error("Failed to create appointment");

        navigate("/services/home"); // Redirect back to services page
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    }
  };

  // Breadcrumb for navigation
  const breadcrumbItems = [
    { name: "Services", href: "/services/home" },
    { name: "Add Appointment", href: "/add-appointment" },
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
        <div className="w-full sm:w-5/6 flex flex-col p-4 mt-1 sm:mt-0">
          <div className="flex flex-row items-center mb-4">
            <BackButton />
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">
            Add New Appointment
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                  className={`mt-1 border ${
                    errors.appointmentDate
                      ? "border-red-500"
                      : "border-green-500"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.appointmentDate && (
                  <span className="text-red-500 text-sm">
                    {errors.appointmentDate}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className={`mt-1 border ${
                    errors.time ? "border-red-500" : "border-green-500"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.time && (
                  <span className="text-red-500 text-sm">{errors.time}</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  Appointment Reason
                </label>
                <input
                  type="text"
                  name="appointmentReason"
                  value={formData.appointmentReason}
                  onChange={handleChange}
                  required
                  className={`mt-1 border ${
                    errors.appointmentReason
                      ? "border-red-500"
                      : "border-green-500"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.appointmentReason && (
                  <span className="text-red-500 text-sm">
                    {errors.appointmentReason}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={`mt-1 border ${
                    errors.location ? "border-red-500" : "border-green-500"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.location && (
                  <span className="text-red-500 text-sm">
                    {errors.location}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  Doctor
                </label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                  className={`mt-1 border ${
                    errors.doctorId ? "border-red-500" : "border-green-500"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.firstName} {doctor.lastName} -{" "}
                      {doctor.specialization}
                    </option>
                  ))}
                </select>
                {errors.doctorId && (
                  <span className="text-red-500 text-sm">
                    {errors.doctorId}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className={`mt-1 border ${
                    errors.notes ? "border-red-500" : "border-green-500"
                  } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.notes && (
                  <span className="text-red-500 text-sm">{errors.notes}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-4">
              <button
                type="submit"
                onClick={() => navigate("/PaymentPage")}
                className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
              >
                Add Appointment
              </button>
              <button
                type="button"
                onClick={() => navigate("/services/home")}
                className="bg-gray-300 text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-400 transition duration-200 mt-2 md:mt-0"
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

export default AddAppointment;
