import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FiDownload } from 'react-icons/fi';

const GenerateQR = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const qrRef = useRef();

    const generateQRCodeData = () => {
        return JSON.stringify({ U_id: id });
    };

    const downloadQRCodePDF = async () => {
        const canvas = await html2canvas(qrRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 180);
        pdf.save(`Patient_ID_${id}_QRCode.pdf`);
    };

    // Navigate to Profile Page
    const handleContinue = () => {
        navigate('/profile');
    };

    return (
        <div className="bg-white flex flex-col items-center justify-center min-h-screen relative">
            <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your QR Code</h2>
                <p className="text-lg text-gray-600 mb-4">Patient ID: {id}</p>
                <div className="border p-4 bg-gray-50 rounded-lg mb-6" ref={qrRef}>
                    <QRCodeCanvas value={generateQRCodeData()} size={200} />
                </div>
                <button
                    className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                    onClick={downloadQRCodePDF}
                >
                    <FiDownload className="mr-2" /> Download QR Code
                </button>
            </div>

            {/* Continue Button in Bottom Right */}
            <button
                className="absolute bottom-10 right-10 bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
                onClick={handleContinue}
            >
                Continue
            </button>
        </div>
    );
};

export default GenerateQR;