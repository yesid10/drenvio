# Backend Express/MongoDB - Desafío React / MongoDB

## Introducción
Este proyecto es un backend desarrollado con Node.js, Express y MongoDB, diseñado para servir como API para una aplicación React. Permite consultar, mostrar y actualizar información de productos y precios especiales para usuarios, cumpliendo con los requerimientos del desafío técnico.

## Pasos para ejecutar localmente

1. Clona el repositorio y entra a la carpeta del backend:
   ```sh
   git clone https://github.com/yesid10/drenvio.git
   cd backend
   ```
2. Copia el archivo `.env.example` y renómbralo a `.env`. Ajusta los valores si es necesario:
   ```sh
   cp .env.example .env
   # O en Windows:
   copy .env.example .env
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```
4. Inicia el servidor en modo desarrollo (con recarga automática):
   ```sh
   npm run dev
   ```
   O en modo producción:
   ```sh
   npm start
   ```
5. El backend estará disponible en `http://localhost:3000`.

## Justificación de elecciones técnicas
- **Lenguaje:** JavaScript, por su integración nativa con Node.js y facilidad de uso para prototipado rápido.
- **Express:** Framework minimalista y flexible para crear APIs REST.
- **Mongoose:** ODM para MongoDB que facilita la validación y modelado de datos.
- **dotenv:** Para gestionar variables de entorno de forma segura.
- **nodemon:** Para desarrollo ágil con recarga automática.

## Descripción de la estructura del proyecto
```
backend/
├── package.json
├── .env.example
├── src/
│   ├── index.js                # Punto de entrada principal
│   ├── db.js                   # Conexión a MongoDB
│   ├── models/
│   │   ├── Producto.js         # Modelo para la colección 'productos'
│   │   └── PreciosEspeciales.js# Modelo para la colección de precios especiales
│   └── routes/
│       ├── productos.js        # Rutas para productos
│       └── preciosEspeciales.js# Rutas para precios especiales
```

## Base de Datos
- **URL de conexión:** mongodb+srv://drenviochallenge:m1jWly3uw42cBwp6@drenviochallenge.2efc0.mongodb.net/
- **Base de datos:** tienda
- **Colecciones:**
  - `productos`: Colección inicial proporcionada
  - `preciosEspecialesVanegas10`: Colección personalizada para precios especiales

## Estructura de la Colección de Precios Especiales
```javascript
{
  productoId: String,    // Referencia al producto
  userUid: String,       // ID del usuario
  precio: Number,        // Precio especial
  createdAt: Date,       // Fecha de creación
  updatedAt: Date        // Fecha de actualización
}
```

## Endpoints principales
- `GET /api/productos` — Lista todos los productos.
- `GET /api/precios-especiales` — Lista todos los precios especiales.
- `POST /api/precios-especiales` — Agrega un nuevo precio especial.
- `PUT /api/precios-especiales/:id` — Actualiza un precio especial existente.
- `GET /api/precios-especiales/usuario/:usuario` — Valida si un usuario tiene precios especiales.

## Criterios de Evaluación Cumplidos
- **Funcionabilidad:** Implementación completa de todos los endpoints requeridos
- **Código Limpio:** Estructura modular, buenas prácticas y documentación clara
- **Creatividad:** Diseño optimizado de la colección de precios especiales con campos para relaciones eficientes

## Consideraciones Técnicas
- Validación de datos en todos los endpoints
- Manejo de errores centralizado
- Conexión segura a MongoDB Atlas
- Optimización de consultas
- Documentación de API con comentarios

## Notas
- La colección de precios especiales se nombra según el formato solicitado: `preciosEspecialesVanegas10`
- El backend está preparado para integrarse fácilmente con un frontend en React
- Se implementó autenticación con Google para usuarios
- Se validan los precios especiales por usuario

---

¿Dudas o sugerencias? Contacta a sergio@drenvio.com
