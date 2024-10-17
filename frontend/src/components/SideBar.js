import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Check if user is admin
                setIsAdmin(user.email === 'susadisandanima@gmail.com');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const Menus = [
        { name: "Profile", path: "/profile", icon: CgProfile, showAlways: true },
        { name: "Services", path: "/serviceView", icon: MdOutlineMedicalServices, showAlways: true },
        { name: "Bookings", path: "/bookings/home", icon: IoCalendarOutline, showAlways: true },
        { name: "Home", path: "/dashboard", icon: HomeIcon, adminOnly: true },
        { name: "Finances", path: "/finances/home", icon: BanknotesIcon, adminOnly: true },
        { name: "Appointments", path: "/appointments/home", icon: IoCalendarNumberOutline, adminOnly: true },
        { name: "Patients Records", path: "/patients/home", icon: IoDocumentTextOutline, adminOnly: true },
        { name: "QR Scanner", path: "/QR_Scanner/home", icon: BsQrCode, adminOnly: true },
    ];

    const filteredMenus = Menus.filter(menu => menu.showAlways || (isAdmin && menu.adminOnly));

    const isActive = (path) => {
        const currentPath = location.pathname.split('/')[1];
        return currentPath === path.split('/')[1];
    };

    return (
        <div className="flex">
            <div className={`${open ? "w-72" : "w-24"} bg-gray-100 h-screen fixed top-12 left-0 p-5 pt-8 flex flex-col justify-between transition-all duration-300`}>
                <div>
                    <div
                        className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 rounded-full bg-white ${!open ? "rotate-180" : ""}`}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <IoIosArrowDropleft size={24} /> : <IoIosArrowDropright size={24} />}
                    </div>

                    <ul className="pt-1">
                        {filteredMenus.map((menu, index) => (
                            <Link to={menu.path} key={index}>
                                <li className={`flex rounded-md p-4 cursor-pointer text-gray-800 font-semibold text-md items-center gap-x-4 focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-200 px-1 hover:bg-gray-200 hover:rounded-xl hover:shadow-xl
                                    ${menu.gap ? "mt-9" : "mt-2"} ${isActive(menu.path) && "bg-gray-200 text-blue-700 rounded-xl px-3 shadow-xl"}`}
                                >
                                    {React.createElement(menu.icon, { className: 'w-5 h-5 ml-2' })}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {menu.name}
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="pb-16">
                    <li
                        className={`flex rounded-md p-4 cursor-pointer text-gray-800 font-semibold text-md items-center gap-x-4 focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-200 px-1 hover:bg-red-100 hover:text-red-700 hover:rounded-xl hover:shadow-xl ${open ? "justify-start" : "justify-center"}`}
                        onClick={handleLogout}
                    >
                        {React.createElement(ArrowLeftStartOnRectangleIcon, { className: 'w-5 h-5 ml-2' })}
                        <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;