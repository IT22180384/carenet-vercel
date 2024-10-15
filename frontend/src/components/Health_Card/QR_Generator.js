import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://health-care-system-csse.vercel.app/patientRoute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Patient registered:', data.patient);
                alert(`Patient registered successfully! Unique ID: ${data.patient.U_id}`);
                navigate(`/generate-qr/${data.patient.U_id}`);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while registering the patient.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col  bg-white">
            <div className="flex flex-1 justify-center items-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full space-y-6"
                >
                    <h2 className="text-2xl font-bold text-center">Patient Registration</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Health Insurance Number</label>
                        <input
                            type="text"
                            name="insuranceNumber"
                            value={formData.insuranceNumber}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Primary Care Physician</label>
                        <input
                            type="text"
                            name="physician"
                            value={formData.physician}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Medical History</label>
                        <textarea
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                        <input
                            type="text"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                        <input
                            type="text"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full appearance-none text-sm border-0 border-b-2 hover:border-b-sky-700 transition-all duration-200 focus:ring-0 focus:ring-offset-0 bg-transparent ring-sky-400 placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-sky-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-sky-800 transition"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QR_Generator;