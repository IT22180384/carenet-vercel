import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const QRScanner = ({ selectedCamera, onUserDataScanned }) => {
    const [scanResult, setScanResult] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleScan = async (data) => {
        if (!data) {
            console.log("No QR code detected yet");
            return;
        }

        // Assuming data is a JSON string, parse it to extract U_id
        let parsedData;
        try {
            parsedData = JSON.parse(data);  // Parses the JSON string
        } catch (error) {
            console.error("Failed to parse QR data:", error);
            setError("Invalid QR code format.");
            return;
        }

        const U_id = parsedData.U_id;
        console.log("Sending id to backend", U_id);

        if (U_id) {
            setScanResult(U_id);
            let retryCount = 0;
            const maxRetries = 3;

            while (retryCount < maxRetries) {
                try {
                    console.log("Fetching patient data...");
                    console.log(U_id);
                    const response = await axios.get('https://health-care-system-csse.vercel.app/patientRoute/patients/${U_id}');
                    console.log("Patient data received:", response.data);
                    console.log(response.data);
                    setUserData(response.data);
                    setSuccess("Patient data fetched successfully!");
                    onUserDataScanned(response.data);
                    break;
                } catch (err) {
                    retryCount += 1;
                    console.error("Error fetching patient data:", err);

                    if (retryCount >= maxRetries) {
                        let errorMessage = "Unknown error occurred";
                        if (err.response) {
                            errorMessage = 'Server Error: ${err.response.status} - ${err.response.statusText}';
                            if (err.response.data && err.response.data.message) {
                                errorMessage += ` - ${err.response.data.message}`;
                            }
                        } else if (err.request) {
                            errorMessage = "No response received from server";
                        } else {
                            errorMessage = err.message;
                        }
                        setError('Error processing patient data: ${errorMessage}');
                        break;
                    } else {
                        console.log('Retrying... (${retryCount})');
                        await new Promise(resolve => setTimeout(resolve, 1000));  // Wait 1 second before retrying
                    }
                }
            }
        } else {
            console.error("Invalid U_id:", U_id);
            setError("Invalid U_id provided.");
        }
    };

    const handleError = (err) => {
        console.error("QR Scanner Error:", err);
        setError("Error scanning the QR code");
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Scan Patient's QR Code
            </h2>
            {selectedCamera && (
                <div className="relative">
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onResult={(result, error) => {
                            if (result) {
                                handleScan(result?.text);
                            }
                            if (error) {
                                handleError(error);
                            }
                        }}
                        className="w-full h-64 rounded-lg overflow-hidden"
                        constraints={{
                            facingMode: "environment",
                            deviceId: selectedCamera
                        }}
                    />
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"></div>
                </div>
            )}
            {error && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded-lg relative mt-6"
                    style={{ fontSize: "18px", maxHeight: "150px", overflowY: "auto" }}
                    role="alert"
                >
                    <strong className="font-bold block mb-2 text-xl">Error!</strong>
                    <span className="block">{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <span className="block sm:inline">{success}</span>
                </div>
            )}
        </div>
    );
};

export default QRScanner;