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
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/QR_Scanner/home" element={<QR_Page />} />
                <Route path="/signup/register" element={<RegPage />} /> {/* Updated here */}
                <Route path="/patients/home" element={<Patients />} />
                <Route path="/generate-qr/:id" element={<GenerateQR />} />
            </Routes>
        </div>
    );
}
