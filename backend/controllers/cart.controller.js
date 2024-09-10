import { v4 as uuidv4 } from 'uuid';
import Cart from '../models/Cart.js'; // Asegúrate de importar tu modelo de carrito

export const createCart = async (req, res) => {
  const { total } = req.body;

  try {
    const cartId = uuidv4(); // Genera un cartId único

    // Crear el carrito en la base de datos MongoDB
    const newCart = await Cart.create({ cartId, total });

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

    res.status(200).json({ total: cart.total });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};