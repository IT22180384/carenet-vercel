import React, { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import SideBar from "../components/SideBar";
import Navbar from "../components/utility/Navbar";
import BackButton from "../components/utility/BackButton";
import Breadcrumb from "../components/utility/Breadcrumbs";
import { FaSearch } from "react-icons/fa"; // Import search icon

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const breadcrumbItems = [
        { name: "Home", href: "/dashboard" },
        { name: "Doctors", href: "/DoctorsNames" },
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("https://carenet-vercel.vercel.app/doctorRoute/");
                const data = await response.json();
                setDoctors(data);
                setFilteredDoctors(data); // Set the filtered list initially
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = doctors.filter(
            (doctor) =>
                doctor.firstName.toLowerCase().includes(query) ||
                doctor.lastName.toLowerCase().includes(query)
        );
        setFilteredDoctors(filtered);
    };

    return (
        <SnackbarProvider>
            <div className="min-h-screen">
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>

                <div className="grid sm:grid-cols-6">
                    {/* Sidebar */}
                    <div className="col-span-1 hidden sm:block sticky top-0">
                        <SideBar />
                    </div>

                    {/* Main Content */}
                    <div className="w-full sm:col-span-5 flex flex-col px-4 sm:px-10">
                        <div className="flex flex-wrap items-center justify-between mb-4">
                            <div className="flex items-center">
                                <BackButton />
                                <Breadcrumb items={breadcrumbItems} />
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <h1 className="text-2xl sm:text-5xl font-bold text-gray-800">Doctors List</h1>
                        </div>

                        {/* Search Input */}
                        <div className="mb-4 flex justify-end">
                            <div className="relative w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Search doctor..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
                            </div>
                        </div>

                        {/* Doctors Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse shadow-lg rounded-lg">
                                <thead>
                                    <tr style={{ backgroundColor: "#268bf0", color: "white" }}>
                                        <th className="border border-gray-300 px-4 py-2 rounded-tl-lg">First Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Email</th>
                                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                                        <th className="border border-gray-300 px-4 py-2">Specialization</th>
                                        <th className="border border-gray-300 px-4 py-2 rounded-tr-lg">Experience (Years)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDoctors.map((doctor) => (
                                        <tr key={doctor._id} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 px-4 py-2">{doctor.firstName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{doctor.lastName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{doctor.email}</td>
                                            <td className="border border-gray-300 px-4 py-2">{doctor.phone}</td>
                                            <td className="border border-gray-300 px-4 py-2">{doctor.specialization}</td>
                                            <td className="border border-gray-300 px-4 py-2">{doctor.yearsOfExperience}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
}

