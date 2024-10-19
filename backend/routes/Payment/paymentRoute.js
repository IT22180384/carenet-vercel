// routes/PaymentRoute.js
import express from "express";
import cors from "cors";
import { Payment } from "../../models/Payment/paymentModel.js"; // Adjust the path as necessary
import { Appointment } from "../../models/appointmentModel.js"; // Adjust the path as necessary

const router = express.Router();

router.use(cors());

router.post("/payment", async (req, res) => {
  const {
    paymentMethod,
    name,
    cardNumber,
    expiryMonth,
    expiryYear,
    securityCode,
    appointmentId,
    price,
  } = req.body;

  try {
    // Validate required fields
    if (
      !paymentMethod ||
      !name ||
      !cardNumber ||
      !expiryMonth ||
      !expiryYear ||
      !securityCode ||
      !appointmentId ||
      !price
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new payment
    const newPayment = new Payment({
      paymentMethod,
      name,
      cardNumber,
      expiryMonth,
      expiryYear,
      securityCode,
      paymentDate: new Date(),
      appointmentId, // Include appointment ID
      price, // Include price
    });

    const savedPayment = await newPayment.save();

    // Update the payment status of the appointment to 'Paid'
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { appointmentId: appointmentId },
      { paymentStatus: "Paid" },
      { new: true }
    );

    // Check if the appointment was found and updated
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(201).json({
      message: "Payment information saved and appointment updated successfully",
      payment: savedPayment,
      updatedAppointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error saving payment:", error.message);
    res.status(500).json({
      message: "Error saving payment information",
      error: error.message,
    });
  }
});

// Route to fetch all payment details
router.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find(); // Fetch all payments from MongoDB
    res.status(200).json(payments); // Send payments as JSON response
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Error retrieving payments" });
  }
});
export default router;
