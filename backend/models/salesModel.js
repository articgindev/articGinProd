import mongoose from 'mongoose';

const saleSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    numInstallments: {
      type: Number,
      required: true, // Número de cuotas
    },
    installmentValue: {
      type: Number,
      required: true, // Monto por cuota
    },
  },
  {
    timestamps: true,
  }
);

export const Sale = mongoose.model('Sale', saleSchema);
