import express from 'express';
import cors from 'cors';
import { Payment } from '../../models/Payment/paymentModel.js'; // Adjust the path as necessary
import { Appointment } from '../../models/Appointment/appointmentModel.js'; // Adjust path for Appointment model

const router = express.Router();

router.use(cors());

// Route to handle payment creation
router.post('/payment', async (req, res) => {
    const { paymentMethod, name, cardNumber, expiryMonth, expiryYear, securityCode, appointmentId } = req.body;

    try {
        // Check if all required fields are provided
        if (!paymentMethod || !name || !cardNumber || !expiryMonth || !expiryYear || !securityCode || !appointmentId) {
            return res.status(400).json({ message: 'All fields including appointmentId are required' });
        }

        // Check if the appointment exists in the database
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Create a new payment record
        const newPayment = new Payment({
            paymentMethod,
            name,
            cardNumber,
            expiryMonth,
            expiryYear,
            securityCode,
            paymentDate: new Date(), // Automatically set payment date
            appointmentId, // Store the appointmentId with the payment
        });

        // Save the payment to the database
        const savedPayment = await newPayment.save();

        // Optionally, update the payment status of the appointment to 'Paid'
        appointment.paymentStatus = 'Paid';
        await appointment.save();

        // Respond with the saved payment details
        res.status(201).json({
            message: 'Payment information saved successfully',
            payment: savedPayment,
        });
    } catch (error) {
        console.error('Error saving payment:', error.message);
        res.status(500).json({ message: 'Error saving payment information', error: error.message });
    }
});

// Route to fetch all payment details
router.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find().populate('appointmentId'); // Fetch all payments and populate appointment details
        res.status(200).json(payments); // Send payments as JSON response
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Error retrieving payments' });
    }
});
export default router;
