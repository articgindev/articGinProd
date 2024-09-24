import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  external_reference: {
    type: String, // Agregando el campo external_reference
    required: false, // Puedes hacerlo requerido si siempre se envía
  },
  status: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
