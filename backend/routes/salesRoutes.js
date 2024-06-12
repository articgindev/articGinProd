import express from "express";
import { Sale } from '../models/salesModel.js';

const router = express.Router();

// Ruta para crear una venta
router.post('/', async (request, response) => {
  try {
    const { email, quantity, total, numInstallments, installmentValue } = request.body;

    if (!email || !quantity || !total || !numInstallments || !installmentValue) {
      return response.status(400).send({
        message: 'Send all required fields: email, quantity, total, numInstallments, installmentValue',
      });
    }

    const newSale = {
      email,
      quantity,
      total,
      numInstallments,
      installmentValue,
    };

    const sale = await Sale.create(newSale);

    return response.status(201).send(sale);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Ruta para obtener ventas
router.get('/', async (request, response) => {
  try {
    const sales = await Sale.find({})
    return response.status(200).json({
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  };
})

// Ruta para obtener una venta por id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const sale = await Sale.findById(id)
    return response.status(200).json(sale);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  };
})

// Ruta para actualizar una venta
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const updatedSale = await Sale.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSale) {
      return response.status(404).json({ message: 'Sale not found' });
    }

    return response.status(200).send({ message: 'Sale updated successfully', updatedSale });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Ruta para eliminar una venta
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletedSale = await Sale.findByIdAndDelete(id);

    if (!deletedSale) {
      return response.status(404).json({ message: 'Sale not found' });
    }

    return response.status(200).send({ message: 'Sale deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

