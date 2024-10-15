import mongoose from "mongoose";

// Define Service Schema
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, 
      required: false,  
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Export Service model
export const Service = mongoose.model("Service", serviceSchema);
