import { SnackbarProvider } from 'notistack';
import Sidebar from '../components/SideBar';
import Navbar from '../components/utility/Navbar';
import Breadcrumb from '../components/utility/Breadcrumbs';
import BackButton from '../components/utility/BackButton';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa'; // Import profile icon from react-icons

// Composite base class
class ProfileComponent {
  render() {
    throw new Error('This method should be overwritten');
  }
}

// Leaf components
class ProfileField extends ProfileComponent {
  constructor({ label, value, type = 'text', readOnly = true }) {
    super();
    this.label = label;
    this.value = value;
    this.type = type;
    this.readOnly = readOnly;
  }

  render() {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-600">{this.label}</label>
        <input
          type={this.type}
          value={this.value}
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          readOnly={this.readOnly}
        />
      </div>
    );
  }
}

class ProfileTextArea extends ProfileComponent {
  constructor({ label, value, readOnly = true }) {
    super();
    this.label = label;
    this.value = value;
    this.readOnly = readOnly;
  }

  render() {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-600">{this.label}</label>
        <textarea
          value={this.value}
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          readOnly={this.readOnly}
        />
      </div>
    );
  }
}

// Composite class that can contain other components
class ProfileComposite extends ProfileComponent {
  constructor() {
    super();
    this.components = [];
  }

  add(component) {
    this.components.push(component);
  }

  render() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {this.components.map((component, index) => (
          <div key={index}>{component.render()}</div>
        ))}
      </div>
    );
  }
}

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

  const breadcrumbItems = [{ name: 'Profile', href: '/profile' }];
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const profileComposite = new ProfileComposite();
  profileComposite.add(new ProfileField({ label: 'First Name', value: profileData.firstName }));
  profileComposite.add(new ProfileField({ label: 'Last Name', value: profileData.lastName }));
  profileComposite.add(new ProfileField({ label: 'Date of Birth', value: profileData.dob, type: 'date' }));
  profileComposite.add(new ProfileField({ label: 'Gender', value: profileData.gender }));
  profileComposite.add(new ProfileField({ label: 'Email', value: profileData.email, type: 'email' }));
  profileComposite.add(new ProfileField({ label: 'Phone', value: profileData.phone, type: 'tel' }));
  profileComposite.add(new ProfileTextArea({ label: 'Address', value: profileData.address }));
  profileComposite.add(new ProfileField({ label: 'Insurance Number', value: profileData.insuranceNumber }));
  profileComposite.add(new ProfileField({ label: 'Physician', value: profileData.physician }));
  profileComposite.add(new ProfileTextArea({ label: 'Medical History', value: profileData.medicalHistory }));
  profileComposite.add(new ProfileField({ label: 'Blood Type', value: profileData.bloodType }));
  profileComposite.add(new ProfileField({ label: 'Emergency Contact', value: profileData.emergencyContact }));

  return (
    <SnackbarProvider>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="flex relative">
          <button
            className="lg:hidden fixed top-20 left-2 z-40 p-2 rounded-md bg-gray-800 text-white"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <div
            className={`fixed lg:relative lg:block ${
              isSidebarOpen ? 'block' : 'hidden'
            } w-64 h-screen bg-white shadow-lg z-30`}
          >
            <Sidebar />
          </div>

          <div
            className={`flex-1 w-full p-4 transition-all duration-300 ${
              isSidebarOpen ? 'lg:ml-0 ml-64' : 'ml-0'
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-row items-center mb-4 w-full">
                <BackButton />
                <Breadcrumb items={breadcrumbItems} />
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Profile Information</h2>

              <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-4 md:p-8 mx-auto">
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-4 mb-6">
                    <FaUserCircle className="text-blue-600 text-6xl" />
                  </div>
                  {profileComposite.render()}
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
