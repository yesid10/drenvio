const express = require('express');
const Producto = require('../models/Producto');
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

module.exports = router;
