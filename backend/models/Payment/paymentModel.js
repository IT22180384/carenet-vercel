import mongoose from "mongoose";

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
  },
  appointmentId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
export const Payment = mongoose.model("Payment", paymentSchema);
