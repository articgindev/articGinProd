import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true, unique: true },
  external_reference: { type: String, required: false },
  status: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  total: { type: Number, required: true },
  isSynced: { type: Boolean, default: false },  // Nuevo campo
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
