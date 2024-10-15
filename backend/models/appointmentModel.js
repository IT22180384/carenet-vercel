import mongoose from "mongoose";

// Define Appointment Schema
const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true, // Ensures that each appointment has a unique ID
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Reference to the Patient model
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model (assuming you have one)
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    appointmentStatus: {
      type: String,
      enum: ["Scheduled", "Completed", "Canceled"],
      default: "Scheduled",
      required: true,
    },
    appointmentReason: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true, // Can specify the appointment location (online or clinic)
    },
    notes: {
      type: String,
      required: false, // Optional field for extra notes
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Unpaid"],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Export Appointment model
export const Appointment = mongoose.model("Appointment", appointmentSchema);
