import mongoose from 'mongoose';

// Define Product Schema
const patientSchema = new mongoose.Schema(
    {
        U_id: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type:String,
            required: true,
        },
        insuranceNumber: {
            type: String,
            required: true,
        },
        physician: {
            type: String,
            required: true,
        },
        medicalHistory: {
            type: String,
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        },
        emergencyContact: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

// Export Product model
export const Patient = mongoose.model('Patient', patientSchema);
