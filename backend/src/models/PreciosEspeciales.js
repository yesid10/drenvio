const mongoose = require('mongoose');

const preciosEspecialesSchema = new mongoose.Schema({
  userUid: { type: String, required: true }, // identificador del usuario
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  precioEspecial: { type: Number, required: true },
});

const collectionName = process.env.SPECIAL_PRICES_COLLECTION || 'preciosEspecialesApellido00';

module.exports = mongoose.model('PreciosEspeciales', preciosEspecialesSchema, collectionName);
