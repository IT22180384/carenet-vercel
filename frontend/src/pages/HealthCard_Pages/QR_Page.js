import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/utility/Navbar";
import Breadcrumb from "../../components/utility/Breadcrumbs";
import BackButton from "../../components/utility/BackButton";
import QR_Generator from "../../components/Health_Card/QR_Generator";
import { MdQrCodeScanner } from "react-icons/md";

export default function QR_Page() {
    const [loading, setLoading] = useState(false);
    const [currentTile, setCurrentTile] = useState(1);

    const breadcrumbItems = [
        { name: 'QR Scanner', href: '/QR_Scanner/home' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTile((prevTile) => (prevTile === 1 ? 2 : 1));
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <SnackbarProvider>
            <div className="flex flex-col min-h-screen">
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>
                <div className="flex flex-1">
                    <div className="hidden sm:block w-1/6">
                        <SideBar />
                    </div>
                    <div className="w-full sm:w-5/6 flex flex-col p-4 mt-1 sm:mt-0">
                        <div className="flex flex-row items-center mb-4">
                            <BackButton />
                            <Breadcrumb items={breadcrumbItems} />
                        </div>
                        <div className="flex justify-start mb-4">
                            <button
                                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none ml-10"
                            >
                                <MdQrCodeScanner className="mr-2" size={20} />
                                <span className="text-sm sm:text-base">Scan QR</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
}