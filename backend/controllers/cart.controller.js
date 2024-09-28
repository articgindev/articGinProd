import { v4 as uuidv4 } from 'uuid';
import Cart from '../models/Cart.js';  // Asegúrate de que el modelo esté importado

export const createCart = async (req, res) => {
  const { total, postalCode, deliveryDate, quantity } = req.body;  // Agregar 'quantity' en la desestructuración

  try {
    const cartId = uuidv4(); // Genera un cartId único

    // Ajustar la fecha actual a la zona horaria de Argentina (UTC-3)
    const createdAt = new Date(Date.now() - (3 * 60 * 60 * 1000));

    // Crear el carrito en la base de datos MongoDB, incluyendo el código postal, día de entrega y la fecha ajustada
    const newCart = await Cart.create({
      cartId,
      total,
      postalCode: postalCode || null,  // Si no hay código postal, se guarda como null
      deliveryDate: deliveryDate || null,  // Si no hay día de entrega, se guarda como null
      createdAt,  // Guardar la fecha ajustada
      quantity,  // Guardar la cantidad de gines
    });

    // Enviar el cartId como respuesta al frontend
    res.status(201).json({ cartId: newCart.cartId });
  } catch (error) {
    console.error('Error creando el carrito:', error);
    res.status(500).json({ error: 'Error creando el carrito' });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;

    // Buscar el carrito en la base de datos por cartId
    const cart = await Cart.findOne({ cartId });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Devolver también la cantidad de gines
    res.status(200).json({ total: cart.total, quantity: cart.quantity });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};
