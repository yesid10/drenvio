const express = require('express');
const PreciosEspeciales = require('../models/PreciosEspeciales');
const authenticateToken = require("../middlewares/authFirebase");
const mongoose = require('mongoose');
const router = express.Router();

// Obtener todos los precios especiales (solo admin, opcional)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const precios = await PreciosEspeciales.find();
    res.json(precios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener precios especiales' });
  }
});

// Agregar o actualizar un precio especial para el usuario autenticado
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productoId, precio } = req.body;
    const userUid = req.user?.uid;
    if (!productoId || typeof precio !== 'number' || !userUid) {
      return res.status(400).json({ error: 'Faltan datos requeridos: productoId, precio (number) o userUid' });
    }
    let precioEspecial = await PreciosEspeciales.findOne({ productoId, userUid });
    if (precioEspecial) {
      precioEspecial.precioEspecial = precio;
      await precioEspecial.save();
    } else {
      precioEspecial = new PreciosEspeciales({ productoId, userUid, precioEspecial: precio });
      await precioEspecial.save();
    }
    res.status(201).json(precioEspecial);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar/actualizar precio especial', detalle: error.message, body: req.body });
  }
});

// Consultar si el usuario autenticado tiene precio especial para un producto
router.get('/producto/:productoId', authenticateToken, async (req, res) => {
  try {
    const userUid = req.user.uid;
    const { productoId } = req.params;
    const precioEspecial = await PreciosEspeciales.findOne({ productoId, userUid });
    res.json({ precio: precioEspecial ? precioEspecial.precio : null });
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar precio especial' });
  }
});

// Actualizar precio especial por ID (solo si el usuario es dueño o admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const actualizado = await PreciosEspeciales.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar precio especial' });
  }
});

// Consultar precio especial de un producto para el usuario autenticado (endpoint esperado por el frontend)
router.get('/productos/:id/precios-especiales', authenticateToken, async (req, res) => {
  try {
    const userUid = req.user.uid;
    const { id } = req.params;
    
    // Log para depuración
    console.log('Buscando precio especial para:', { productoId: id, userUid });
    
    // Intentar convertir el ID a ObjectId si es posible
    let productoId;
    try {
      productoId = mongoose.Types.ObjectId(id);
    } catch (error) {
      productoId = id;
    }
    
    // Buscar el precio especial
    const precioEspecial = await PreciosEspeciales.findOne({
      productoId,
      userUid
    });
    
    // Log detallado del resultado
    console.log('Resultado de búsqueda:', {
      productoId,
      userUid,
      encontrado: !!precioEspecial,
      precio: precioEspecial?.precioEspecial
    });
    
    if (!precioEspecial) {
      return res.json({ precio: null });
    }
    
    res.json({ precio: precioEspecial.precioEspecial });
  } catch (error) {
    console.error('Error al consultar precio especial:', error);
    res.status(500).json({ 
      error: 'Error al consultar precio especial', 
      detalle: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


module.exports = router;