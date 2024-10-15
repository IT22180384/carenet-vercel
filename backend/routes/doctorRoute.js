import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Doctor } from "../models/doctorModel.js";

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Create a new doctor
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      specialization,
      yearsOfExperience,
      qualifications,
      clinicAddress,
      availability,
      gender,
      bio,
    } = req.body;

    // Check if all required fields are present
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !specialization ||
      !yearsOfExperience ||
      !qualifications ||
      !clinicAddress ||
      !availability ||
      !gender
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Create a new doctor
    const newDoctor = await Doctor.create({
      firstName,
      lastName,
      email,
      phone,
      specialization,
      yearsOfExperience,
      qualifications,
      clinicAddress,
      availability,
      gender,
      bio,
    });

    // Return newly created doctor
    return res.status(201).json({
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors from MongoDB
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to get a doctor by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);

    // Check if doctor was found
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE route for deleting a doctor by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    // Check if a doctor was found and deleted
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a doctor by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
