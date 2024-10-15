import mongoose from "mongoose";

// Define Doctor Schema
const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure no two doctors have the same email
    },
    phone: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true, // Field to specify the doctor's specialization (e.g., cardiology, dermatology)
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    qualifications: {
      type: String,
      required: true, // Degree or certification details
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true, // E.g., "Monday to Friday, 9 AM - 5 PM"
    },
    gender: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false, // Optional bio/description of the doctor
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Export Doctor model
export const Doctor = mongoose.model("Doctor", doctorSchema);
