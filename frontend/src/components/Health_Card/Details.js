import React from 'react';

const Details = ({ user }) => {
    return (
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Profile Details</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* First Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">First Name</label>
                    <span className="text-lg text-gray-900 mt-1">{user.firstName || 'N/A'}</span>
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Last Name</label>
                    <span className="text-lg text-gray-900 mt-1">{user.lastName || 'N/A'}</span>
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Date of Birth</label>
                    <span className="text-lg text-gray-900 mt-1">{user.dob || 'N/A'}</span>
                </div>

                {/* Gender */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Gender</label>
                    <span className="text-lg text-gray-900 mt-1">{user.gender || 'N/A'}</span>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Email</label>
                    <span className="text-lg text-gray-900 mt-1">{user.email || 'N/A'}</span>
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Phone</label>
                    <span className="text-lg text-gray-900 mt-1">{user.phone || 'N/A'}</span>
                </div>

                {/* Address */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Address</label>
                    <span className="text-lg text-gray-900 mt-1">{user.address || 'N/A'}</span>
                </div>

                {/* Insurance Number */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Insurance Number</label>
                    <span className="text-lg text-gray-900 mt-1">{user.insuranceNumber || 'N/A'}</span>
                </div>

                {/* Physician */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Physician</label>
                    <span className="text-lg text-gray-900 mt-1">{user.physician || 'N/A'}</span>
                </div>

                {/* Medical History */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Medical History</label>
                    <span className="text-lg text-gray-900 mt-1">{user.medicalHistory || 'N/A'}</span>
                </div>

                {/* Blood Type */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Blood Type</label>
                    <span className="text-lg text-gray-900 mt-1">{user.bloodType || 'N/A'}</span>
                </div>

                {/* Emergency Contact */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 uppercase">Emergency Contact</label>
                    <span className="text-lg text-gray-900 mt-1">{user.emergencyContact || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default Details;
