import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/utility/Navbar";
import BackButton from "../../components/utility/BackButton";
import Breadcrumb from "../../components/utility/Breadcrumbs";
import UserFlowChartCmp from '../../components/Vinuk/UserFlowChartCmp';

function UserFlowChart() {
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
                            </div>

                            {/* Title Section */}
                            <div className="text-center mb-12">
                                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">
                                    CARENET ANALYTICS
                                </h1>
                            </div>

                            {/* Charts Section */}
                            <div className="">
                             <div className="space-y-10">
                                {/* User Flow Chart */}
                                  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                                     <div className="w-full max-w-4xl mx-auto h-[500px] sm:h-[800px]">
                                       
                                    </div>
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

export default UserFlowChartCmp;


