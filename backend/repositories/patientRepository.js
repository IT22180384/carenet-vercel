// repositories/patientRepository.js
import { Patient } from '../models/Health_Card/patientModel.js';

export class PatientRepository {
    // Method to find a patient by Firebase UID
    async findByFirebaseUid(firebaseUid) {
        return await Patient.findOne({ firebaseUid });
    }

    // Method to find a patient by U_id
    async findByUId(U_id) {
        return await Patient.findOne({ U_id });
    }

    // Method to create a new patient
    async createPatient(patientData) {
        const newPatient = new Patient(patientData);
        return await newPatient.save();
    }

    // Method to update a patient by U_id
    async updatePatient(U_id, updateData) {
        return await Patient.findOneAndUpdate({ U_id }, updateData, { new: true });
    }

    // Method to delete a patient by U_id
    async deletePatient(U_id) {
        return await Patient.findOneAndDelete({ U_id });
    }

    // Method to get all patients
    async getAllPatients() {
        return await Patient.find();
    }

    // Method to generate a unique 16-digit U_id
    async generateUniqueId() {
        while (true) {
            const id = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
            const existingPatient = await this.findByUId(id);
            if (!existingPatient) {
                return id;
            }
        }
    }
}
