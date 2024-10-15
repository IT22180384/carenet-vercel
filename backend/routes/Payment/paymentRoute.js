// routes/PaymentRoute.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {Payment} from "../../models/Payment/paymentModel.js";// Adjust the path as necessary

const router = express.Router();

router.use(cors());

router.post('/payment', async (req, res) => {
    const { paymentMethod, name, cardNumber, expiryMonth, expiryYear, securityCode } = req.body;

    try {
        if (!paymentMethod || !name || !cardNumber || !expiryMonth || !expiryYear || !securityCode) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newPayment = new Payment({
            paymentMethod,
            name,
            cardNumber,
            expiryMonth,
            expiryYear,
            securityCode,
        });

        const savedPayment = await newPayment.save();
        res.status(201).json({
            message: 'Payment information saved successfully',
            payment: savedPayment,
        });
    } catch (error) {
        console.error('Error saving payment:', error.message); // Add more detailed error logging
        res.status(500).json({ message: 'Error saving payment information', error: error.message });
    }
});

// Route to fetch all payment details
router.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find(); // Fetch all payments from MongoDB
        res.status(200).json(payments); // Send payments as JSON response
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Error retrieving payments' });
    }
});

export default router;
