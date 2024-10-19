// __tests__/integration/patient.test.js
import request from 'supertest';
import express from 'express';
import patientRoute from '../../routes/Health_Card/patientRoute.js';
import { Patient } from '../../models/Health_Card/patientModel';

const app = express();
app.use(express.json());
app.use('/api', patientRoute);

describe('Patient Management System Tests', () => {
    describe('Patient Creation Tests', () => {
        const validPatientData = {
            firstName: 'John',
            lastName: 'Doe',
            dob: '1990-01-01',
            gender: 'Male',
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St',
            insuranceNumber: 'INS123',
            physician: 'Dr. Smith',
            medicalHistory: 'None',
            bloodType: 'O+',
            emergencyContact: '9876543210',
            firebaseUid: 'firebase123'
        };

        test('should successfully create a patient with valid data', async () => {
            const response = await request(app)
                .post('/api')
                .send(validPatientData);

            expect(response.status).toBe(201);
            expect(response.body.patient).toHaveProperty('U_id');
            expect(response.body.patient.firstName).toBe(validPatientData.firstName);
            expect(response.body.patient.email).toBe(validPatientData.email);
        });

        test('should fail to create patient with missing required fields', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe'
            };

            const response = await request(app)
                .post('/api')
                .send(invalidData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/required fields must be provided/i);
        });
    });

    describe('Patient Retrieval Tests', () => {
        let createdPatient;

        beforeEach(async () => {
            createdPatient = await Patient.create({
                U_id: '1234567890123456',
                firstName: 'Jane',
                lastName: 'Smith',
                dob: '1995-05-15',
                gender: 'Female',
                email: 'jane.smith@example.com',
                phone: '9876543210',
                address: '456 Oak St',
                insuranceNumber: 'INS456',
                physician: 'Dr. Johnson',
                medicalHistory: 'None',
                bloodType: 'A+',
                emergencyContact: '1234567890',
                firebaseUid: 'firebase456'
            });
        });

        test('should successfully retrieve patient by U_id', async () => {
            const response = await request(app)
                .get(`/api/patients/${createdPatient.U_id}`);

            expect(response.status).toBe(200);
            expect(response.body.firstName).toBe(createdPatient.firstName);
            expect(response.body.email).toBe(createdPatient.email);
        });

        test('should fail to retrieve patient with invalid U_id', async () => {
            const response = await request(app)
                .get('/api/patients/invalidId123');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Patient not found');
        });
    });
});