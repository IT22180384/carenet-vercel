import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    paymentMethod : {
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
   
});

export const Payment = mongoose.model('Payment', paymentSchema);
