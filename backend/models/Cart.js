import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },  // cartId generado en el frontend
  total: { type: Number, required: true },  // Total enviado desde el frontend
  postalCode: { type: String },  // Código postal
  deliveryDate: { type: String },  // Día de entrega
  createdAt: { type: Date, default: Date.now },  // Fecha de creación
  quantity: { type: Number, required: true },  // Cantidad de gines comprados
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
