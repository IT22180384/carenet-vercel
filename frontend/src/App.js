import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import QR_Page from "./pages/HealthCard_Pages/QR_Page";
import RegPage from "./pages/HealthCard_Pages/regPage"; // Renamed to RegPage

import Patients from "./pages/Admin/Patients";
import GenerateQR from "./pages/HealthCard_Pages/GenerateQR";

import Appointments from "./pages/Appointments";
import Services from "./pages/Services";

import Doctors from "./pages/Doctors";

import ServiceView from "./pages/ServiceView";

import AddAppointment from "./pages/AddAppointment";

import ProfilePage from "./pages/ProfilePage";
import Bookings from "./pages/Bookings";
import PaymentPage from "./pages/Admin/PaymentPage";
import PaymentList from "./pages/Admin/PaymentList";
import AddService from "./pages/AddService";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LandingPage />} />
        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/QR_Scanner/home" element={<QR_Page />} />
        <Route path="/signup/register" element={<RegPage />} />{" "}
        {/* Updated here */}
        <Route path="/patients/home" element={<Patients />} />
        <Route path="/generate-qr/:id" element={<GenerateQR />} />
        <Route path="/appointments/home" element={<Appointments />} />
        <Route path="/services/home" element={<Services />} />
        <Route path="/DoctorsNames" element={<Doctors />} />
        <Route path="/ServiceView" element={<ServiceView />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/bookings/home" element={<Bookings />} />
        <Route path="/generate-qr/:id" element={<GenerateQR />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/finances/home" element={<PaymentList />} />
        <Route path="/add-service" element={<AddService />} />
      </Routes>
    </div>
  );
}
