import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Service } from "../../models/serviceModel.js";

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Create a new service
router.post("/", async (req, res) => {
  try {
    const { title, name, description, price, image } = req.body;

    // Check if all required fields are present
    if (!title || !name || !description || !price || !image) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Create a new service
    const newService = await Service.create({
      title,
      name,
      description,
      price,
      image,
    });

    // Return newly created service
    return res.status(201).json({
      service: newService,
    });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find(); // Fetch all services from MongoDB
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to get a service by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);

    // Check if service was found
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE route for deleting a service by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(id);

    // Check if a service was found and deleted
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Respond with success message
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a service by ID
router.put("/:id", async (req, res) => {
  console.log("Updating service ID:", req.params.id);
  console.log("Request body:", req.body);

  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
