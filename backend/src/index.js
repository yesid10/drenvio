const express = require('express');
const connectDB = require('./db');
const productosRouter = require('./routes/productos');
const preciosEspecialesRouter = require('./routes/preciosEspeciales');
const authRoutes = require("./routes/auth");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

connectDB();

app.use("/api/auth", authRoutes);
app.use('/api/productos', productosRouter);
app.use('/api/precios-especiales', preciosEspecialesRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});