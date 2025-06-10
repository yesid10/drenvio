const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();
const authenticateToken = require('../middlewares/authFirebase');
const PreciosEspeciales = require('../models/PreciosEspeciales');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Endpoint alternativo para compatibilidad total: /api/productos/:id/precios-especiales
router.get('/:id/precios-especiales', authenticateToken, async (req, res) => {
  try {
    const userUid = req.user.uid;
    const { id } = req.params;
    const precioEspecial = await PreciosEspeciales.findOne({ productoId: id, userUid });
    res.json({ precio: precioEspecial ? precioEspecial.precio : null });
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar precio especial' });
  }
});

module.exports = router;
