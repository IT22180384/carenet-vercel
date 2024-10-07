import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QR_Generator = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'Male',
        email: '',
        phone: '',
        address: '',
        insuranceNumber: '',
        physician: '',
        medicalHistory: '',
        bloodType: '',
        emergencyContact: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const generateQRCodeData = () => {
        return JSON.stringify(formData);
    };

    return (
        <div className="bg-white flex flex-col lg:flex-row items-start justify-center gap-6">
            {/* Left Card: Registration Form */}
            <div className="bg-white shadow-lg rounded-lg p-4 w-full lg:w-3/5">
                <h1 className="text-2xl font-bold text-center text-green-600 mb-4">Patient Registration</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Personal Information */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <select
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="johndoe@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="123-456-7890"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123 Main St, City, State, ZIP"
                        />
                    </div>

                    {/* Medical Information */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Health Insurance Number</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="text"
                            name="insuranceNumber"
                            value={formData.insuranceNumber}
                            onChange={handleChange}
                            placeholder="1234567890"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Primary Care Physician</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="text"
                            name="physician"
                            value={formData.physician}
                            onChange={handleChange}
                            placeholder="Dr. Jane Smith"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Medical History</label>
                        <textarea
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                            placeholder="e.g., Allergies, Chronic illnesses"
                            rows="3"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Blood Type</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="text"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            placeholder="O+, A-, B+, etc."
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Emergency Contact</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-green-200"
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            placeholder="Name, Relationship, Phone"
                        />
                    </div>
                </form>
            </div>

            {/* Right Card: QR Code Display */}
            <div className="bg-white shadow-lg rounded-lg p-4 w-full lg:w-2/5 mt-6 lg:mt-0 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Generated QR Code</h2>
                <div className="border p-4 bg-gray-50 rounded-lg">
                    <QRCodeCanvas value={generateQRCodeData()} size={200} />
                </div>
            </div>
        </div>
    );
};

export default QR_Generator;