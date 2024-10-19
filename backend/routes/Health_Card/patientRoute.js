import express from 'express';
import cors from 'cors';
import { PatientRepository } from '../../repositories/patientRepository.js';

const router = express.Router();
const patientRepo = new PatientRepository();

// Enable CORS for all routes
router.use(cors());

// Route to get a patient by Firebase UID
router.get('/patients/firebase/:firebaseUid', async (req, res) => {
    try {
        const { firebaseUid } = req.params;
        const patient = await patientRepo.findByFirebaseUid(firebaseUid);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new patient and return QR code data
router.post('/', async (req, res) => {
    try {
        const {
            firstName, lastName, dob, gender, email, phone,
            address, insuranceNumber, physician, medicalHistory,
            bloodType, emergencyContact, firebaseUid
        } = req.body;

        if (!firstName || !lastName || !dob || !gender || !email || !phone ||
            !address || !insuranceNumber || !physician || !medicalHistory ||
            !bloodType || !emergencyContact || !firebaseUid) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Generate a unique U_id
        const U_id = await patientRepo.generateUniqueId();

        // Create the new patient
        const newPatient = await patientRepo.createPatient({
            U_id, firebaseUid, firstName, lastName, dob, gender, email,
            phone, address, insuranceNumber, physician, medicalHistory,
            bloodType, emergencyContact
        });

        const qrData = JSON.stringify(newPatient);
        return res.status(201).json({
            patient: newPatient,
            qrData
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get all patients
router.get('/patients', async (req, res) => {
    try {
        const patients = await patientRepo.getAllPatients();
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route for deleting a patient by U_id
router.delete('/patients/:U_id', async (req, res) => {
    const { U_id } = req.params;

    try {
        const deletedPatient = await patientRepo.deletePatient(U_id);

        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get a patient by U_id
router.get('/patients/:U_id', async (req, res) => {
    try {
        const { U_id } = req.params;
        const patient = await patientRepo.findByUId(U_id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a patient by U_id
router.put('/patients/:U_id', async (req, res) => {
    const { U_id } = req.params;

    try {
        const updatedPatient = await patientRepo.updatePatient(U_id, req.body);

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
