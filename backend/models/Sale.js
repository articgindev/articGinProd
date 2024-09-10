import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  cartId: { type: String, required: true },  // ID del carrito, que sirve como referencia única
  total: { type: Number, required: true },   // Total de la compra
  datosPersonales: {                         // Datos del comprador
    nombre: String,
    apellido: String,
    email: String,
    direccion: String,
    localidad: String,
    altura: String,
    entreCalles: String,
    tipoVivienda: String,
    piso: String,
    contactoReceptor: String,
    notasPedido: String,
  },
  estado: { type: String, default: 'pendiente' },  // Estado de la compra (pendiente, aprobado, rechazado)
  createdAt: { type: Date, default: Date.now },    // Fecha de creación
});

const Sale = mongoose.model('Sale', SaleSchema);
export default Sale;
