import Cart from '../models/Cart.js';

export const createCart = async (req, res) => {
  try {
    const { cartId, total } = req.body;  // Recibimos el cartId y el total desde el frontend

    if (!cartId) {
      return res.status(400).json({ message: "El cartId es obligatorio" });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ message: "El total del carrito es inválido" });
    }

    // Crear un nuevo carrito con el cartId y el total proporcionados
    const newCart = new Cart({
      cartId,
      total,
    });

    // Guardar el carrito en la base de datos
    const savedCart = await newCart.save();

    res.status(201).json({
      message: "Carrito creado con éxito",
      cartId: savedCart.cartId,
    });
  } catch (error) {
    console.error("Error al crear el carrito:", error);
    res.status(500).json({ message: "Error al crear el carrito" });
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