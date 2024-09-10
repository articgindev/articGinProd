// models/Sale.js
import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  cartId: { type: String, required: true }, // Relaciona con el carrito
  total: { type: Number, required: true }, // Total de la compra
  personalData: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentStatus: { type: String, default: 'pending' }, // Estado del pago (pending, approved, rejected)
  paymentId: { type: String }, // ID de pago de Mercado Pago
  createdAt: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;
