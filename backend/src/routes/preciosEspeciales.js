const express = require('express');
const PreciosEspeciales = require('../models/PreciosEspeciales');
const router = express.Router();

// Obtener todos los precios especiales
router.get('/', async (req, res) => {
  try {
    const precios = await PreciosEspeciales.find();
    res.json(precios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener precios especiales' });
  }
});

// Agregar un nuevo precio especial
router.post('/', async (req, res) => {
  try {
    const nuevoPrecio = new PreciosEspeciales(req.body);
    await nuevoPrecio.save();
    res.status(201).json(nuevoPrecio);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar precio especial' });
  }
});

// Validar existencia de usuario en precios especiales
router.get('/usuario/:usuario', async (req, res) => {
  try {
    const usuario = req.params.usuario;
    const existe = await PreciosEspeciales.exists({ usuario });
    res.json({ existe: !!existe });
  } catch (error) {
    res.status(500).json({ error: 'Error al validar usuario' });
  }
});

// Actualizar precio especial
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await PreciosEspeciales.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar precio especial' });
  }
});

module.exports = router;
