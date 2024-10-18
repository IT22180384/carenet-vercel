import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileDownload} from '@fortawesome/free-solid-svg-icons'; // Import icons here
import { SnackbarProvider } from 'notistack';
import SideBar from '../../components/SideBar';
import Navbar from '../../components/utility/Navbar';
import Breadcrumb from '../../components/utility/Breadcrumbs';
import BackButton from '../../components/utility/BackButton';



const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://carenet-vercel.vercel.app/paymentRoute/payments');
                if (!response.ok) throw new Error('Failed to fetch payments');
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setError("Failed to fetch payments. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const formatPrice = (price) => {
        return `Rs.2000.00`; // Replace with actual price formatting logic
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true }); // Format as HH:MM AM/PM
    };

    const filteredPayments = payments.filter(payment =>
        payment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const breadcrumbItems = [
        { name: 'Payment List', href: '/payments' }
    ];

    return (
        <SnackbarProvider>
            <div className="flex flex-col min-h-screen font-sans">
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>
                <div className="flex flex-1">
                    <div className="hidden sm:block w-1/6 md:w-1/5 lg:w-1/4">
                        <SideBar />
                    </div>
                    <div className="w-full sm:w-5/6 flex flex-col p-4 mt-1 sm:mt-0 ">
                        <div className="flex flex-row items-center mb-4">
                            <BackButton />
                            <Breadcrumb items={breadcrumbItems} />
                        </div>

                        <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Payment List</h1>
                        {error && <p className="text-red-500">{error}</p>}
                        {loading ? (
                            <p className="text-center">Loading payments...</p>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="relative w-full md:w-1/3">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FontAwesomeIcon icon={faSearch} className="text-gray-500 h-4 w-4" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search payments..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="border border-gray-300 rounded-full px-3 py-2 w-full text-sm pl-10"
                                            style={{ paddingRight: '2.5rem' }}
                                        />
                                    </div>
                                    <button className="ml-4 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 flex items-center">
                                        <FontAwesomeIcon icon={faFileDownload} className="mr-2" />
                                        Download
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
                                        <thead className="text-xs text-gray-700 shadow-md uppercase bg-gray-100 border-l-4 border-gray-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Payment Method</th>
                                                <th scope="col" className="px-6 py-3">Name</th>
                                                <th scope="col" className="px-6 py-3">Price</th>
                                                <th scope="col" className="px-6 py-3">Date</th>
                                                <th scope="col" className="px-6 py-3">Time</th>
                                                <th scope="col" className="px-6 py-3">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPayments.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-4">No payments found.</td>
                                                </tr>
                                            ) : (
                                                filteredPayments.map((payment, index) => (
                                                    <tr key={payment._id} className="hover:bg-gray-100">
                                                        <td className="px-6 py-4">{payment.paymentMethod}</td>
                                                        <td className="px-6 py-4">{payment.name}</td>
                                                        <td className="px-6 py-4">{formatPrice(payment.price)}</td>
                                                        <td className="px-6 py-4">{formatDate(payment.date)}</td>
                                                        <td className="px-6 py-4">{formatTime(payment.date)}</td>
                                                        <td className="px-6 py-4">
                                                           Paid
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
};

export default PaymentList;
