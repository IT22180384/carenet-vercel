import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Appointment } from "../models/appointmentModel.js";
import { Service } from "../models/serviceModel.js";

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Generate a random 4-character appointmentId
const generateAppointmentId = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
};

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      serviceId,
      appointmentDate,
      time,
      appointmentReason,
      location,
      notes,
    } = req.body;

    if (
      !patientId ||
      !doctorId ||
      !serviceId ||
      !appointmentDate ||
      !time ||
      !appointmentReason ||
      !location
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Generate a unique appointmentId
    const appointmentId = generateAppointmentId();

    // Create a new appointment
    const newAppointment = await Appointment.create({
      appointmentId,
      patientId,
      doctorId,
      serviceId,
      appointmentDate,
      time,
      appointmentStatus: "Scheduled",
      appointmentReason,
      location,
      notes,
      paymentStatus: "Pending",
    });

    // Return newly created appointment
    return res.status(201).json({
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// New Route to fetch all appointments by patientId and populate service price
router.get("/appointments/patient/:patientId", async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId }) // Find appointments by patientId
      .populate("serviceId", "price"); // Populate the serviceId and only fetch the price field

    if (!appointments.length) {
      return res
        .status(404)
        .json({ message: "No appointments found for this patient" });
    }

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments by patientId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments from MongoDB
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to get an appointment by ID
router.get("/appointments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE route for deleting an appointment by ID
router.delete("/appointments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update an appointment by ID
router.put("/appointments/:id", async (req, res) => {
  console.log("Updating appointment ID:", req.params.id);
  console.log("Request body:", req.body);

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
