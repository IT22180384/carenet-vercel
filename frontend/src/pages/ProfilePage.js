import { SnackbarProvider } from 'notistack';
import Sidebar from '../components/SideBar';
import Navbar from '../components/utility/Navbar';
import Breadcrumb from '../components/utility/Breadcrumbs';
import BackButton from '../components/utility/BackButton';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(`https://carenet-vercel.vercel.app/patientRoute/patients/firebase/${user.uid}`);
          if (response.ok) {
            const userData = await response.json();
            setProfileData(userData);
          } else {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const breadcrumbItems = [
    { name: 'Profile', href: '/profile' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <SnackbarProvider>
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
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
            <div className={`
            fixed lg:relative
            lg:block
            ${isSidebarOpen ? 'block' : 'hidden'}
            w-64 h-screen
            bg-white shadow-lg
            z-30
          `}>
              <Sidebar />
            </div>

            {/* Main content */}
            <div className={`
            flex-1
            w-full
            p-4
            transition-all
            duration-300
            ${isSidebarOpen ? 'lg:ml-0 ml-64' : 'ml-0'}
          `}>
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-row items-center mb-4 w-full">
                  <BackButton />
                  <Breadcrumb items={breadcrumbItems} />
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Profile Information</h2>

                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-4 md:p-8 mx-auto">
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

                    {/* Address */}
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

                    {/* Medical History */}
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
        </div>
      </SnackbarProvider>
  );
};

export default ProfilePage;