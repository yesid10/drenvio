const admin = require("firebase-admin");

// Inicializa Firebase Admin solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require("./serviceAccountKey.json")),
  });
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // Aquí tienes el uid y más info
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateToken;