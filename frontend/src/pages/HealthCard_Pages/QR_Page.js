import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import SideBar from "../../components/SideBar";
import Navbar from "../../components/utility/Navbar";
import Breadcrumb from "../../components/utility/Breadcrumbs";
import BackButton from "../../components/utility/BackButton";
import QRScanner from "../../components/Health_Card/QRScanner";
import { MdQrCodeScanner } from "react-icons/md";
import Details from "../../components/Health_Card/Details";

export default function QR_Page() {
    const [loading, setLoading] = useState(false);
    const [currentTile, setCurrentTile] = useState(1);
    const [showScanner, setShowScanner] = useState(false);
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [userData, setUserData] = useState(null);

    const breadcrumbItems = [
        { name: 'QR Scanner', href: '/QR_Scanner/home' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTile((prevTile) => (prevTile === 1 ? 2 : 1));
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraPermission(true);
            stream.getTracks().forEach(track => track.stop());

            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === "videoinput");
            setCameras(videoDevices);
            console.log("Available cameras:", videoDevices);

            const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));
            if (backCamera) {
                setSelectedCamera(backCamera.deviceId);
            } else if (videoDevices.length > 0) {
                setSelectedCamera(videoDevices[0].deviceId);
            }
        } catch (err) {
            console.error("Error requesting camera permission:", err);
            setHasCameraPermission(false);
        }
    };

    const handleScanButtonClick = async () => {
        await requestCameraPermission();
        if (hasCameraPermission) {
            setShowScanner(true);
            setUserData(null);
        }
    };

    const handleUserDataScanned = (data) => {
        setUserData(data);
        setShowScanner(false); // Hide scanner after successful scan
    };

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
                                onClick={handleScanButtonClick}
                            >
                                <MdQrCodeScanner className="mr-2" size={20} />
                                <span className="text-sm sm:text-base">Scan QR</span>
                            </button>
                        </div>

                        {showScanner && hasCameraPermission && (
                            <QRScanner
                                selectedCamera={selectedCamera}
                                onUserDataScanned={handleUserDataScanned}
                            />
                        )}

                        {userData && <Details user={userData} />}
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
}