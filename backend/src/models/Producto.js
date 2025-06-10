const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  // Puedes agregar más campos según la estructura real de la colección productos
});

module.exports = mongoose.model('Producto', productoSchema, 'productos');
