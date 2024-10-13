import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const QRScanner = ({ selectedCamera, onUserDataScanned }) => {
    const [error, setError] = useState("");
    const [startScan, setStartScan] = useState(false);

    useEffect(() => {
        if (selectedCamera) {
            setStartScan(true);
        }
    }, [selectedCamera]);

    const handleScan = async (result) => {
        if (result) {
            try {
                // Parse the QR code data (expecting a JSON string with U_id)
                const scannedData = JSON.parse(result.text);
                console.log("Scanned Data:", scannedData);

                if (scannedData.U_id) {
                    try {
                        // Fetch patient data from the server using the scanned U_id
                        const response = await axios.get(`https://carenet-vercel-git-main-sandanimas-projects.vercel.app/patientRoute/patients/${scannedData.U_id}`);
                        const patientData = response.data;
                        console.log("Fetched Patient Data:", patientData);

                        // Pass the fetched patient data to the parent component
                        onUserDataScanned(patientData);
                        setStartScan(false);
                    } catch (fetchError) {
                        setError(`Error fetching patient data: ${fetchError.message}`);
                        console.error("Fetch Error:", fetchError);
                    }
                } else {
                    setError("Invalid QR code format: Missing U_id");
                }
            } catch (parseError) {
                setError(`Error parsing QR code data: ${parseError.message}`);
                console.error("Parsing Error:", parseError);
            }
        }
    };

    const handleError = (err) => {
        console.error("QR Scanner Error:", err);
        setError(`Error scanning the QR code: ${err.message}`);
    };

    return (
        <div className="qr-scanner-container">
            <h2 className="text-xl font-semibold mb-4">Scan Patient's QR Code</h2>
            {startScan && (
                <QrReader
                    constraints={{ facingMode: "environment" }}
                    onResult={handleScan}
                    onError={handleError}
                    style={{ width: "100%", maxWidth: "500px" }}
                />
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default QRScanner;