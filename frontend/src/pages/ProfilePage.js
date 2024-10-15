import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import Sidebar from '../components/SideBar';
import Navbar from '../components/utility/Navbar';
import Breadcrumb from '../components/utility/Breadcrumbs';
import BackButton from '../components/utility/BackButton';

const ProfilePage = () => {
  const [profileData] = useState({
    firstName: 'Ash',
    lastName: 'Kuruppu',
    dob: '02/04/2000',
    gender: 'Male',
    email: 'win@gmail.com',
    phone: '071 8430626',
    address: 'No:23,Kadawatha Rd,Gampaha',
    insuranceNumber: '2470168704557151',
    physician: 'Dr. Perera',
    medicalHistory: '',
    bloodType: 'O+',
    emergencyContact: '071 8127918',
  });

  const breadcrumbItems = [
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <SnackbarProvider>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50">
        {/* Navbar */}
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="hidden sm:block w-1/6 md:w-1/5 lg:w-1/4">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="w-full sm:w-5/6 flex flex-col p-4 mt-1 sm:mt-0 items-center">
            <div className="flex flex-row items-center mb-4 w-full">
              <BackButton />
              <Breadcrumb items={breadcrumbItems} />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Profile Information</h2>

            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Date of Birth</label>
                  <input
                    type="date"
                    value={profileData.dob}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Gender</label>
                  <input
                    type="text"
                    value={profileData.gender}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Address (full width) */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600">Address</label>
                  <textarea
                    value={profileData.address}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Insurance Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Insurance Number</label>
                  <input
                    type="text"
                    value={profileData.insuranceNumber}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Physician */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Physician</label>
                  <input
                    type="text"
                    value={profileData.physician}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Medical History (full width) */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-600">Medical History</label>
                  <textarea
                    value={profileData.medicalHistory}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Blood Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Blood Type</label>
                  <input
                    type="text"
                    value={profileData.bloodType}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Emergency Contact</label>
                  <input
                    type="tel"
                    value={profileData.emergencyContact}
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default ProfilePage;
