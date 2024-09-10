import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },  // cartId generado en el frontend
  total: { type: Number, required: true },  // Total enviado desde el frontend
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
