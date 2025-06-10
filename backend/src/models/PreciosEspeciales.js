const mongoose = require('mongoose');

const preciosEspecialesSchema = new mongoose.Schema({
  usuario: { type: String, required: true }, // identificador del usuario
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  precioEspecial: { type: Number, required: true },
  // Puedes agregar más campos según necesidades
});

const collectionName = process.env.SPECIAL_PRICES_COLLECTION || 'preciosEspecialesApellido00';

module.exports = mongoose.model('PreciosEspeciales', preciosEspecialesSchema, collectionName);
