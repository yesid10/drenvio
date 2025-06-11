# DRENVIO - Frontend

## Introducción
Frontend de la aplicación desarrollada como prueba técnica para DRENVIO. Desarrollado con React, permite gestionar productos y precios especiales de manera intuitiva y eficiente.

## Tecnologías Elegidas

### JavaScript vs TypeScript
He elegido JavaScript por las siguientes razones:
- Mayor simplicidad en la implementación
- Menor curva de aprendizaje para futuros desarrolladores
- Suficiente para manejar la complejidad del proyecto
- Mejor compatibilidad con las bibliotecas utilizadas

### Gestor de Estado
Se utilizó Zustand por:
- Sintaxis simple y directa
- Menos boilerplate que Redux
- Excelente rendimiento
- Fácil integración con React

## Estructura del Proyecto

### Tecnologías Frontend
- React con Vite para mejor rendimiento
- Tailwind CSS para estilos
- React Router para navegación
- Zustand para gestión de estado
- Axios para peticiones HTTP

## Pasos para Ejecutar Localmente

1. Clonar el repositorio:
```bash
git clone https://github.com/yesid10/drenvio.git
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Características Implementadas

### Autenticación
- Login con Google

### Gestión de Productos
- Vista en grid y tabla
- Filtros por categoría, marca y precio
- Búsqueda de productos
- Ordenamiento
- Estadísticas

### Precios Especiales
- Asignación de precios especiales
- Validación de usuarios
- Actualización en tiempo real

## Estructura de Componentes

### Páginas
- `Home.jsx`: Vista principal de productos
- `Upload.jsx`: Gestión de precios especiales
- `LoginPage.jsx`: Autenticación con Google
- `NotLoggedIn.jsx`: Vista para usuarios no autenticados

### Componentes
- `Navbar.jsx`: Navegación principal
- `ProductCard.jsx`: Tarjeta de producto (vista grid)
- `ProductRow.jsx`: Fila de producto (vista tabla)
- `FilterBar.jsx`: Barra de filtros y búsqueda
- `StatsCard.jsx`: Tarjeta de estadísticas
- `SpecialPriceModal.jsx`: Modal para precios especiales

### Store
- `useProductStore.js`: Gestión de estado de productos
- `useAuthStore.js`: Gestión de estado de autenticación

## Consideraciones Técnicas
- Código modular y reutilizable
- Componentes desacoplados
- Manejo de estados globales
- Optimización de renderizados
- Diseño responsivo

## Contacto
Para cualquier consulta o sugerencia, contactar a:
sergio@drenvio.com
