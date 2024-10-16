import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faSearch, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from 'jspdf';
import PatientForm from "../../components/vindi/PatientForm";
import 'jspdf-autotable';
import { SnackbarProvider, useSnackbar } from 'notistack';
import SideBar from '../../components/SideBar';
import Navbar from '../../components/utility/Navbar';
import Breadcrumb from '../../components/utility/Breadcrumbs';
import BackButton from '../../components/utility/BackButton';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://carenet-vercel.vercel.app/patientRoute/patients');
            if (!response.ok) throw new Error('Failed to fetch patients');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setError("Failed to fetch patients. Please try again.");
            enqueueSnackbar("Failed to fetch patients", { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (U_id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                // Make a DELETE request to the backend using the U_id
                const response = await fetch(`https://carenet-vercel.vercel.app/patientRoute/patients/${U_id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete the patient');
                }

                // Remove the patient from the local state after successful deletion
                setPatients(prevPatients => prevPatients.filter(patient => patient.U_id !== U_id));
                enqueueSnackbar("Patient deleted successfully", { variant: 'success' });

            } catch (error) {
                console.error('Error deleting patient:', error);
                enqueueSnackbar(error.message || "Failed to delete patient", { variant: 'error' });
            }
        }
    };




    const handleEdit = (patient) => {
        setEditMode(true);
        setCurrentPatient(patient);
    };

    const handleUpdate = async (updatedData) => {
        try {
            const response = await fetch(`https://carenet-vercel.vercel.app/patientRoute/patients/${currentPatient.U_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error('Failed to update the patient');

            const updatedPatient = await response.json();
            setPatients(prevPatients => prevPatients.map(patient =>
                patient._id === updatedPatient._id ? updatedPatient : patient
            ));
            setEditMode(false);
            setCurrentPatient(null);
            enqueueSnackbar("Patient updated successfully", { variant: 'success' });
        } catch (error) {
            console.error('Error updating patient:', error);
            setError("An error occurred while updating the patient. Please try again.");
            enqueueSnackbar("Failed to update patient", { variant: 'error' });
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setCurrentPatient(null);
    };

    const handleReport = () => {
        const doc = new jsPDF('p', 'mm', [297, 420]);

        doc.setFontSize(18);
        doc.text('Patients Report', doc.internal.pageSize.getWidth() / 2, 13, { align: 'center' });

        const headers = [
            ['Id', 'First Name','Last Name','Phone', 'Address', 'Insurance Number', 'Physician', 'Medical History', 'Blood Type', 'Emergency Contact']
        ];

        const data = patients.map(patient => [
            patient.U_id || '',
            patient.firstName || '',
            patient.lastName || '',
            patient.phone || '',
            patient.address || '',
            patient.insuranceNumber || '',
            patient.physician || '',
            doc.splitTextToSize(patient.medicalHistory || '', 50),
            patient.bloodType || '',
            doc.splitTextToSize(patient.emergencyContact || '', 50)
        ]);

        const tableWidth = 250;
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = (pageWidth - tableWidth) / 2;

        doc.autoTable({
            head: headers,
            body: data,
            startY: 25,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            columnStyles: {
                0: { cellWidth: 35 },
                1: { cellWidth: 18 },
                2: { cellWidth: 18 },
                3: { cellWidth: 26 },
                4: { cellWidth: 30 },
                5: { cellWidth: 26 },
                6: { cellWidth: 25 },
                7: { cellWidth: 30 },
                8: { cellWidth: 15 },
                9: { cellWidth: 25 },
            },
            headStyles: {
                fillColor: [52, 152, 219],
                textColor: [255, 255, 255],
            },
            margin: { top: 20, left: marginLeft },
        });

        doc.save('patients_report.pdf');
    };

    const filteredPatients = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const breadcrumbItems = [
        { name: 'Patient Details', href: '/patients/home' }
    ];

    return (
        <SnackbarProvider>
            <div className="flex flex-col min-h-screen font-sans">
                <div className="sticky top-0 z-10">
                    <Navbar/>
                </div>
                <div className="flex flex-1">
                    <div className="hidden sm:block w-1/6 md:w-1/5 lg:w-1/4">
                        <SideBar/>
                    </div>
                    <div className="w-full sm:w-5/6 flex flex-col p-4 mt-1 sm:mt-0">
                        <div className="flex flex-row items-center mb-4">
                            <BackButton/>
                            <Breadcrumb items={breadcrumbItems}/>
                        </div>
                        {editMode ? (
                            <PatientForm
                                patient={currentPatient}
                                onUpdate={handleUpdate}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <div className="overflow-x-auto">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-8 py-4">
                                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                        <h1 className="text-lg font-semibold text-left">Patient Details</h1>
                                        <p className="mt-1 text-sm font-normal text-gray-500">Easily access stored Patient Records within the system for thorough insights.</p>
                                        <div className="py-4 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FontAwesomeIcon icon={faSearch} className="text-gray-500 h-4 w-4"/>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search patients..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="border border-gray-300 rounded-full px-3 py-1 w-full text-sm pl-10"
                                                style={{paddingRight: '2.5rem'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-auto">
                                        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                                            <button
                                                onClick={handleReport}
                                                className="w-full md:w-auto flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                                Generate report <FontAwesomeIcon icon={faFileDownload} className="ml-1"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                                {loading ? (
                                    <p className="text-center">Loading patients...</p>
                                ) : (
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-10">
                                        <thead className="text-xs text-gray-700 shadow-md uppercase bg-gray-100 border-l-4 border-gray-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">No</th>
                                            <th scope="col" className="px-6 py-3">First Name</th>
                                            <th scope="col" className="px-6 py-3">Last Name</th>
                                            <th scope="col" className="px-6 py-3">DOB</th>
                                            <th scope="col" className="px-6 py-3">Gender</th>
                                            <th scope="col" className="px-6 py-3">Email</th>
                                            <th scope="col" className="px-6 py-3">Phone</th>
                                            <th scope="col" className="px-6 py-3">Address</th>
                                            <th scope="col" className="px-6 py-3">Insurance Number</th>
                                            <th scope="col" className="px-6 py-3">Physician</th>
                                            <th scope="col" className="px-6 py-3">Medical History</th>
                                            <th scope="col" className="px-6 py-3">Blood Type</th>
                                            <th scope="col" className="px-6 py-3">Emergency Contact</th>
                                            <th scope="col" className="px-6 py-3">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredPatients.map((patient, index) => (
                                            <tr key={patient._id} className="hover:bg-gray-100">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{patient.firstName}</td>
                                                <td className="px-6 py-4">{patient.lastName}</td>
                                                <td className="px-6 py-4">{patient.dob}</td>
                                                <td className="px-6 py-4">{patient.gender}</td>
                                                <td className="px-6 py-4">{patient.email}</td>
                                                <td className="px-6 py-4">{patient.phone}</td>
                                                <td className="px-6 py-4">{patient.address}</td>
                                                <td className="px-6 py-4">{patient.insuranceNumber}</td>
                                                <td className="px-6 py-4">{patient.physician}</td>
                                                <td className="px-6 py-4">{patient.medicalHistory}</td>
                                                <td className="px-6 py-4">{patient.bloodType}</td>
                                                <td className="px-6 py-4">{patient.emergencyContact}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => handleEdit(patient)}>
                                                            <FontAwesomeIcon icon={faEdit}
                                                                             className="text-green-600 hover:text-green-800"/>
                                                        </button>
                                                        <button onClick={() => handleDelete(patient.U_id)}>
                                                            <FontAwesomeIcon icon={faTrashAlt}
                                                                             className="text-red-600 hover:text-red-800"/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
};

export default Patients;