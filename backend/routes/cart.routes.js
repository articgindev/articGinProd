import { Router } from 'express';
import { createCart, getCartById } from '../controllers/cart.controller.js';

const router = Router();

// Ruta para crear un carrito
router.post('/create-cart', createCart);

// Ruta para obtener un carrito por cartId
router.get('/get-cart/:cartId', getCartById);

export default router;
