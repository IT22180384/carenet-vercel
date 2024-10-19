import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/utility/Navbar";
import BackButton from "../components/utility/BackButton";
import Breadcrumb from "../components/utility/Breadcrumbs";
import AppoinmetCard from "../components/Vinuk/Cards/AppoinmentsCard";
import UserFlowCard from "../components/Vinuk/Cards/UserFlowCard";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [currentTile, setCurrentTile] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const breadcrumbItems = [{ name: "Home", href: "/dashboard" }];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTile((prevTile) => (prevTile === 1 ? 2 : 1));
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <SnackbarProvider>
            <div className="min-h-screen flex flex-col bg-gray-50">
                {/* Navbar */}
                <div className="sticky top-0 z-50">
                    <Navbar />
                </div>

                <div className="flex relative">
                    {/* Sidebar Toggle Button for Mobile */}
                    <button
                        className="lg:hidden fixed top-20 left-2 z-40 p-2 rounded-md bg-gray-800 text-white"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    {/* Sidebar */}
                    <div
                        className={`
              fixed lg:relative
              lg:block
              ${isSidebarOpen ? 'block' : 'hidden'}
              w-64 h-screen
              bg-white shadow-lg
              z-30
              overflow-y-auto
            `}
                    >
                        <SideBar />
                    </div>

                    {/* Main Content */}
                    <div
                        className={`
              flex-1
              transition-all
              duration-300
              ${isSidebarOpen ? 'lg:ml-0 ml-64' : 'ml-0'}
            `}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            {/* Back Button and Breadcrumb */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 relative">
                                <BackButton />
                                <Breadcrumb items={breadcrumbItems} />

                                {/* Doctors Button */}
                                <div className="absolute right-0 top-0">
                                    <button
                                        className="text-white font-semibold py-2 px-4 rounded-lg hover:brightness-110 transition"
                                        style={{ backgroundColor: "#268bf0" }}
                                        onClick={() => navigate("/DoctorsNames")}
                                    >
                                        Doctors
                                    </button>
                                </div>
                            </div>

                            {/* Title Section */}
                            <div className="text-center mb-12">
                                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">
                                    CARENET ANALYTICS
                                </h1>
                            </div>

                            {/* Charts Section */}
                            <div className="">
                                <div className="flex flex-row justify-center items-center min-h-screen space-x-40">
                                    <div>
                                        <AppoinmetCard />
                                    </div>
                                    <div>
                                        <UserFlowCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
}