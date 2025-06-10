// routes/auth.js
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const authenticateToken = require("../middlewares/authFirebase");

//Endpoint desde el frontend después de loguear
router.post("/login", authenticateToken, async (req, res) => {
  const { uid, email, name, picture } = req.user; // Firebase token
  let usuario = await Usuario.findOne({ uid });
  if (!usuario) {
    usuario = new Usuario({
      uid,
      email,
      displayName: name || "",
      photoURL: picture || "",
    });
    await usuario.save();
  }
  res.json(usuario);
});

module.exports = router;