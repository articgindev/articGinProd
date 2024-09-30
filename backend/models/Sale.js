import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  personalData: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    cel: { type: String, required: true },
    address: { type: String, required: true },
    altura: { type: String, required: true },
    city: { type: String, required: true },
    streets: { type: String, required: true },
    contact: { type: String, default: 'N/A' },
    notes: { type: String, default: 'N/A' },
    tipoVivienda: { type: String, required: true, default: 'casa' },
    piso: { type: String, required: true, default: '' },
  },
  paymentStatus: {
    type: String,
    required: true,
    default: 'pending',
  },
  external_reference: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
