import React, { useEffect, useState } from "react";

const AppointmentForm = ({ appointment, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    time: "",
    appointmentStatus: "",
    appointmentReason: "",
    location: "",
    notes: "",
    paymentStatus: "",
    patientId: "",
    doctorId: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointment) {
      setFormData({
        appointmentDate: appointment.appointmentDate.split("T")[0], // Format for input field
        time: appointment.time || "",
        appointmentStatus: appointment.appointmentStatus,
        appointmentReason: appointment.appointmentReason,
        location: appointment.location,
        notes: appointment.notes || "",
        paymentStatus: appointment.paymentStatus,
        patientId: appointment.patientId || "",
        doctorId: appointment.doctorId || "",
      });
    }
  }, [appointment]);

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
      onUpdate(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {appointment ? "Edit Appointment" : "Add Appointment"}
      </h2>
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
              errors.appointmentDate ? "border-red-500" : "border-green-500"
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
            Appointment Status
          </label>
          <select
            name="appointmentStatus"
            value={formData.appointmentStatus}
            onChange={handleChange}
            required
            className={`mt-1 border ${
              errors.appointmentStatus ? "border-red-500" : "border-green-500"
            } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
          {errors.appointmentStatus && (
            <span className="text-red-500 text-sm">
              {errors.appointmentStatus}
            </span>
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
              errors.appointmentReason ? "border-red-500" : "border-green-500"
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
            <span className="text-red-500 text-sm">{errors.location}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Payment Status
          </label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            required
            className={`mt-1 border ${
              errors.paymentStatus ? "border-red-500" : "border-green-500"
            } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          {errors.paymentStatus && (
            <span className="text-red-500 text-sm">{errors.paymentStatus}</span>
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
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-200"
        >
          {appointment ? "Update" : "Add"}
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

export default AppointmentForm;
