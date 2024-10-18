import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    expiryMonth: {
        type: String,
        required: true,
    },
    expiryYear: {
        type: String,
        required: true,
    },
    securityCode: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now, // Automatically sets the payment date to the current date
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment", // Reference to Appointment model
        required: true,
    },
});

// Export the Payment model
export const Payment = mongoose.model('Payment', paymentSchema);
