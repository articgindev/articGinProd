import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  cartId: { type: String, required: true },
  total: { type: Number, required: true },
  personalData: {
    name: { type: String, required: true },     // Añadir "name"
    surname: { type: String, required: true },  // Añadir "surname"
    email: { type: String, required: true },    // Añadir "email"
    cel: { type: String, required: true },      // Añadir "cel"
    address: { type: String, required: true },  // Añadir "address"
    altura: { type: String, required: true },   // Añadir "altura"
    city: { type: String, required: true },     // Añadir "city"
    streets: { type: String, required: true },     // Añadir "city"
    contact: { type: String, default: 'N/A' },  // Añadir "contact"
    notes: { type: String, default: 'N/A' },    // Añadir "notes"
  },
  paymentStatus: { type: String, default: 'pending' },
  external_reference: { type: String, required: true },  // Campo existente para "external_reference"
});

const Sale = mongoose.model('Sale', SaleSchema);

export default Sale;
