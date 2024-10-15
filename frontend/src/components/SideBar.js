import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
    IoCalendarOutline,
    IoCalendarNumberOutline,
    IoDocumentTextOutline
} from "react-icons/io5";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HomeIcon, BanknotesIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { BsQrCode } from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const Menus = [
        { name: "Profile", path: "/profile", icon: CgProfile },
        { name: "Services", path: "/serviceView", icon: MdOutlineMedicalServices  },
        { name: "Bookings", path: "/bookings/home", icon: IoCalendarOutline },
        { name: "Home", path: "/dashboard", icon: HomeIcon },
        { name: "Finances", path: "/finances/home", icon: BanknotesIcon },
        { name: "Appointments", path: "/appointments/home", icon: IoCalendarNumberOutline },
        { name: "Patients Records", path: "/patients/home", icon: IoDocumentTextOutline },
        { name: "QR Scanner", path: "/QR_Scanner/home", icon: BsQrCode },
    ];

    const isActive = (path) => {
        const currentPath = location.pathname.split('/')[1];
        return currentPath === path.split('/')[1];
    };

    return (
        <div className="flex">
            {/* Sidebar with fixed positioning */}
            <div
                className={`${
                    open ? "w-72" : "w-24"
                } bg-gray-100 h-screen fixed top-12 left-0 p-5 pt-8 flex flex-col justify-between transition-all duration-300`}
            >
                <div>
                    {/* Toggle Sidebar Button */}
                    <div
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 rounded-full bg-white ${
                            !open ? "rotate-180" : ""
                        }`}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <IoIosArrowDropleft size={24} /> : <IoIosArrowDropright size={24} />}
                    </div>

                    {/* Sidebar Menu */}
                    <ul className="pt-1">
                        {Menus.map((menu, index) => (
                            <Link to={menu.path} key={index}>
                                <li
                                    className={`flex rounded-md p-4 cursor-pointer text-gray-800 font-semibold text-md items-center gap-x-4 focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-200 px-1 hover:bg-gray-200 hover:rounded-xl hover:shadow-xl
                        ${menu.gap ? "mt-9" : "mt-2"} ${
                                        isActive(menu.path) && "bg-gray-200 text-blue-700 rounded-xl px-3 shadow-xl"
                                    }`}
                                >
                                    {React.createElement(menu.icon, { className: 'w-5 h-5 ml-2' })}
                                    <span className={`${!open && "hidden"} origin-left duration-200 `}>
                                        {menu.name}
                                    </span>
                                    {menu.count !== undefined && open && isActive(menu.path) && (
                                        <span className="bg-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-100">
                                            {loading ? '...' : menu.count}
                                        </span>
                                    )}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                {/* Logout Button */}
                <div className="pb-16">
                    <li
                        className={`flex rounded-md p-4 cursor-pointer text-gray-800 font-semibold text-md items-center gap-x-4 focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-200 px-1 hover:bg-red-100 hover:text-red-700 hover:rounded-xl hover:shadow-xl ${
                            open ? "justify-start" : "justify-center"
                        }`}
                        onClick={() => {
                            // Add your logout logic here
                            console.log("Logout clicked");
                        }}
                    >
                        {React.createElement(ArrowLeftStartOnRectangleIcon, { className: 'w-5 h-5 ml-2' })}
                        <span className={`${!open && "hidden"} origin-left duration-200 `}>Logout</span>
                    </li>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
