import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Patient } from "../../models/Health_Card/patientModel.js";

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Function to generate a unique 16-digit ID
const generateUniqueId = async () => {
    while (true) {
        const id = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
        const existingPatient = await Patient.findOne({ U_id: id });
        if (!existingPatient) {
            return id;
        }
    }
};

// Create a new patient and return QR code data
router.post('/', async (req, res) => {
    try {
        const {
            firstName, lastName, dob, gender, email, phone,
            address, insuranceNumber, physician, medicalHistory,
            bloodType, emergencyContact
        } = req.body;

        // Check if all required fields are present
        if (!firstName || !lastName || !dob || !gender || !email || !phone ||
            !address || !insuranceNumber || !physician || !medicalHistory ||
            !bloodType || !emergencyContact) {
            return res.status(400).json({
                message: 'All required fields must be provided',
            });
        }

        // Generate a unique U_id
        const U_id = await generateUniqueId();

        // Create a new patient
        const newPatient = await Patient.create({
            U_id, firstName, lastName, dob, gender, email, phone,
            address, insuranceNumber, physician, medicalHistory,
            bloodType, emergencyContact
        });

        // Return newly created patient and a QR data string
        const qrData = JSON.stringify(newPatient); // QR data as a string
        return res.status(201).json({
            patient: newPatient,
            qrData
        });
    } catch (error) {
        console.error('Error:', error);
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get all patients
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find(); // Fetch all patients from MongoDB
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route for deleting a patient by ID
router.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);

        // Check if a patient was found and deleted
        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Respond with success message
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Update a patient by ID
router.put('/patients/:id', async (req, res) => {
    console.log('Updating patient ID:', req.params.id);
    console.log('Request body:', req.body);

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;