// models/Usuario.js
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // UID de Firebase
  email: { type: String, required: true },
  displayName: String,
  photoURL: String,
});

module.exports = mongoose.model("Usuario", usuarioSchema, "UsuariosVanegas10" );