import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  cartId: { type: String, required: true },
  total: { type: Number, required: true },
  personalData: {
    name: String,
    email: String,
    address: String,
    city: String,
    postalCode: String,
  },
  paymentStatus: { type: String, default: 'pending' },
  external_reference: { type: String, required: true },  // Nuevo campo para external_reference
});

const Sale = mongoose.model('Sale', SaleSchema);

export default Sale;
