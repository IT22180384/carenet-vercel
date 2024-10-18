import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

import {
  faTrashAlt,
  faEdit,
  faSearch,
  faFileDownload,
  faCreditCard,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { SnackbarProvider, useSnackbar } from "notistack";
import SideBar from "../components/SideBar";
import Navbar from "../components/utility/Navbar";
import Breadcrumb from "../components/utility/Breadcrumbs";
import BackButton from "../components/utility/BackButton";
import AppointmentForm from "../components/Tharushi/AppointmentForm";

const Bookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://carenet-vercel.vercel.app/appointmentRoute/appointments"
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again.");
      enqueueSnackbar("Failed to fetch bookings", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        "https://carenet-vercel.vercel.app/doctorRoute/"
      );
      if (!response.ok) throw new Error("Failed to fetch doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      enqueueSnackbar("Failed to fetch doctors", { variant: "error" });
    }
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((doc) => doc._id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(
          `https://carenet-vercel.vercel.app/appointmentRoute/appointments/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete the booking");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
        enqueueSnackbar("Booking deleted successfully", { variant: "success" });
      } catch (error) {
        console.error("Error deleting booking:", error);
        setError(
          "An error occurred while deleting the booking. Please try again."
        );
        enqueueSnackbar("Failed to delete booking", { variant: "error" });
      }
    }
  };

  const handleEdit = (appointment) => {
    setEditMode(true);
    setCurrentAppointment(appointment);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `https://carenet-vercel.vercel.app/appointmentRoute/appointments/${currentAppointment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update the booking");

      const updatedAppointment = await response.json();
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id
            ? updatedAppointment
            : appointment
        )
      );
      setEditMode(false);
      setCurrentAppointment(null);
      enqueueSnackbar("Booking updated successfully", { variant: "success" });
    } catch (error) {
      console.error("Error updating booking:", error);
      setError(
        "An error occurred while updating the booking. Please try again."
      );
      enqueueSnackbar("Failed to update booking", { variant: "error" });
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentAppointment(null);
  };

  const handleReport = () => {
    const doc = new jsPDF("p", "mm", [297, 420]);

    doc.setFontSize(18);
    doc.text("Bookings Report", doc.internal.pageSize.getWidth() / 2, 13, {
      align: "center",
    });

    const headers = [
      ["Booking Date", "Time", "Reason", "Location", "Patient", "Doctor"],
    ];

    const data = appointments.map((appointment) => [
      appointment.appointmentDate || "",
      appointment.time || "",
      appointment.appointmentReason || "",
      appointment.location || "",
      `${appointment.patientId?.firstName || ""} ${
        appointment.patientId?.lastName || ""
      }`,
      getDoctorName(appointment.doctorId),
      appointment.paymentStatus || "",
    ]);

    const tableWidth = 250;
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = (pageWidth - tableWidth) / 2;

    doc.autoTable({
      head: headers,
      body: data,
      startY: 25,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 },
      },
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: [255, 255, 255],
      },
      margin: { top: 20, left: marginLeft },
    });

    doc.save("bookings_report.pdf");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = `${appointment.patientId?.firstName || ""} ${
      appointment.patientId?.lastName || ""
    }`.toLowerCase();
    const doctorName = getDoctorName(appointment.doctorId).toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      (patientName.includes(search) || doctorName.includes(search)) &&
      appointment.paymentStatus === "Paid"
    );
  });
  const handlePay = (appointment) => {
    alert(`Initiate payment process for appointment ${appointment._id}`);
    navigate("/PaymentPage", { state: { appointmentId: appointment._id } }); 
};

  const breadcrumbItems = [{ name: "Bookings", href: "/bookings/home" }];

  return (
    <SnackbarProvider>
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
            {editMode ? (
              <AppointmentForm
                appointment={currentAppointment}
                onUpdate={handleUpdate}
                onCancel={handleCancelEdit}
              />
            ) : (
              <div className="overflow-x-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-8 py-4">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <h1 className="text-lg font-semibold text-left">
                      Booking Details
                    </h1>
                    <p className="mt-1 text-sm font-normal text-gray-500">
                      Easily access stored Booking Records within the system for
                      thorough insights.
                    </p>
                    <div className="py-4 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon
                          icon={faSearch}
                          className="text-gray-500 h-4 w-4"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-full px-3 py-1 w-full text-sm pl-10"
                        style={{ paddingRight: "2.5rem" }}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-auto">
                    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                      <button
                        onClick={handleReport}
                        className="w-full md:w-auto flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                      >
                        Generate report{" "}
                        <FontAwesomeIcon
                          icon={faFileDownload}
                          className="ml-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                  <p className="text-center">Loading bookings...</p>
                ) : (
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
                    <thead className="text-xs text-gray-700 shadow-md uppercase bg-gray-100 border-l-4 border-gray-500">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Booking Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Reason
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Patient
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Doctor
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment, index) => (
                        <tr key={appointment._id} className="hover:bg-gray-100">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">
                            {formatDate(appointment.appointmentDate)}
                          </td>
                          <td className="px-6 py-4">{appointment.time}</td>

                          <td className="px-6 py-4">
                            {appointment.appointmentReason}
                          </td>
                          <td className="px-6 py-4">{appointment.location}</td>
                          <td className="px-6 py-4">
                            {`${appointment.patientId?.firstName || ""} ${
                              appointment.patientId?.lastName || ""
                            }`}
                          </td>
                          <td className="px-6 py-4">
                            {getDoctorName(appointment.doctorId)}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDelete(appointment._id)}
                              >
                                <FontAwesomeIcon className="text-red-600 hover:text-red-800" />
                                <FontAwesomeIcon icon={faTrash} /> Delete
                              </button>
                              <button
                                onClick={() => handlePay(appointment)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <FontAwesomeIcon icon={faCreditCard} /> Pay
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};
export default Bookings;
