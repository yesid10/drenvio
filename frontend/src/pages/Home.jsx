"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Grid,
  List,
  TrendingUp,
  Package,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  SortAsc,
  SortDesc,
} from "lucide-react";

// Datos de ejemplo expandidos
const mockProducts = [
  {
    _id: "1",
    nombre: 'MacBook Pro 16"',
    descripcion:
      "Laptop profesional con chip M3 Pro, perfecta para desarrollo y diseño",
    precio: 2499,
    categoria: "Laptops",
    marca: "Apple",
    stock: 15,
    imagen: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    descuento: 10,
    nuevo: true,
  },
  {
    _id: "2",
    nombre: "iPhone 15 Pro Max",
    descripcion: "Smartphone premium con cámara profesional y titanio",
    precio: 1199,
    categoria: "Smartphones",
    marca: "Apple",
    stock: 32,
    imagen: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    descuento: 0,
    nuevo: false,
  },
  {
    _id: "3",
    nombre: "Samsung Galaxy S24 Ultra",
    descripcion: "Android flagship con S Pen y cámara de 200MP",
    precio: 1299,
    categoria: "Smartphones",
    marca: "Samsung",
    stock: 28,
    imagen: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    descuento: 15,
    nuevo: true,
  },
  {
    _id: "4",
    nombre: "Dell XPS 13",
    descripcion: "Ultrabook compacta con pantalla InfinityEdge",
    precio: 999,
    categoria: "Laptops",
    marca: "Dell",
    stock: 22,
    imagen: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    descuento: 8,
    nuevo: false,
  },
  {
    _id: "5",
    nombre: 'iPad Pro 12.9"',
    descripcion: "Tablet profesional con chip M2 y Apple Pencil",
    precio: 1099,
    categoria: "Tablets",
    marca: "Apple",
    stock: 18,
    imagen: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    descuento: 5,
    nuevo: false,
  },
  {
    _id: "6",
    nombre: "Surface Pro 9",
    descripcion: "2-en-1 versátil con Windows 11 y pantalla táctil",
    precio: 1299,
    categoria: "Tablets",
    marca: "Microsoft",
    stock: 12,
    imagen: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    descuento: 12,
    nuevo: false,
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMarca, setSelectedMarca] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("nombre");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([0, 3000]);

  // Estadísticas calculadas
  const [stats, setStats] = useState({
    total: 0,
    enStock: 0,
    conDescuento: 0,
    valorTotal: 0,
  });

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      calculateStats(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedMarca,
    sortBy,
    sortOrder,
    priceRange,
  ]);

  const calculateStats = (productList) => {
    const total = productList.length;
    const enStock = productList.filter((p) => p.stock > 0).length;
    const conDescuento = productList.filter((p) => p.descuento > 0).length;
    const valorTotal = productList.reduce(
      (sum, p) => sum + p.precio * p.stock,
      0
    );

    setStats({ total, enStock, conDescuento, valorTotal });
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.marca.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.categoria === selectedCategory
      );
    }

    // Filtro por marca
    if (selectedMarca !== "all") {
      filtered = filtered.filter((product) => product.marca === selectedMarca);
    }

    // Filtro por rango de precio
    filtered = filtered.filter(
      (product) =>
        product.precio >= priceRange[0] && product.precio <= priceRange[1]
    );

    // Ordenamiento
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
    calculateStats(filtered);
  };

  const getUniqueValues = (key) => {
    return [...new Set(products.map((product) => product[key]))];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-stone-200 overflow-hidden">
      <div className="relative">
        <img
          src={product.imagen || "/placeholder.svg"}
          alt={product.nombre}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.nuevo && (
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
              Nuevo
            </span>
          )}
          {product.descuento > 0 && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
              -{product.descuento}%
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-sm">
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span className="text-xs font-medium text-slate-700">
              {product.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1">
            {product.nombre}
          </h3>
          <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full font-medium">
            {product.marca}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.descripcion}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {product.descuento > 0 ? (
              <>
                <span className="text-lg font-bold text-emerald-700">
                  {formatPrice(
                    calculateDiscountedPrice(product.precio, product.descuento)
                  )}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.precio)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(product.precio)}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Stock</div>
            <div
              className={`font-medium ${
                product.stock > 10
                  ? "text-emerald-700"
                  : product.stock > 0
                  ? "text-amber-600"
                  : "text-red-600"
              }`}
            >
              {product.stock} unidades
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-sm">
            <Eye size={16} />
            Ver
          </button>
          <button className="bg-stone-100 hover:bg-stone-200 text-slate-700 p-2.5 rounded-xl transition-colors">
            <Edit size={16} />
          </button>
          <button className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductRow = ({ product }) => (
    <tr className="hover:bg-stone-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={product.imagen || "/placeholder.svg"}
            alt={product.nombre}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <div className="font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
              {product.nombre}
            </div>
            <div className="text-sm text-slate-500">{product.marca}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-600">
        <span className="bg-stone-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
          {product.categoria}
        </span>
      </td>
      <td className="px-6 py-4">
        {product.descuento > 0 ? (
          <div className="flex flex-col">
            <span className="font-bold text-emerald-700">
              {formatPrice(
                calculateDiscountedPrice(product.precio, product.descuento)
              )}
            </span>
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(product.precio)}
            </span>
          </div>
        ) : (
          <span className="font-bold text-slate-900">
            {formatPrice(product.precio)}
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 10
              ? "bg-emerald-100 text-emerald-800"
              : product.stock > 0
              ? "bg-amber-100 text-amber-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock} unidades
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <span className="text-amber-500">★</span>
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors">
            <Eye size={16} />
          </button>
          <button className="bg-stone-100 hover:bg-stone-200 text-slate-700 p-2 rounded-lg transition-colors">
            <Edit size={16} />
          </button>
          <button className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-700 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">
            Cargando productos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-stone-700 to-slate-600 bg-clip-text text-transparent">
                Gestión de Artículos
              </h1>
              <p className="text-slate-600 mt-1">
                Administra tu inventario de productos
              </p>
            </div>
            <button className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
              <Plus size={20} />
              Nuevo Producto
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Productos
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>
              <div className="bg-slate-100 p-3 rounded-xl">
                <Package className="text-slate-700" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">En Stock</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.enStock}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <TrendingUp className="text-emerald-700" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Con Descuento
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.conDescuento}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <DollarSign className="text-amber-700" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Valor Total
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatPrice(stats.valorTotal)}
                </p>
              </div>
              <div className="bg-teal-100 p-3 rounded-xl">
                <DollarSign className="text-teal-700" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y Controles */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-stone-200">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Búsqueda */}
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
                />
              </div>

              {/* Filtros */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
              >
                <option value="all">Todas las categorías</option>
                {getUniqueValues("categoria").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={selectedMarca}
                onChange={(e) => setSelectedMarca(e.target.value)}
                className="px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
              >
                <option value="all">Todas las marcas</option>
                {getUniqueValues("marca").map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>

            {/* Controles de vista y ordenamiento */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white"
                >
                  <option value="nombre">Nombre</option>
                  <option value="precio">Precio</option>
                  <option value="stock">Stock</option>
                  <option value="rating">Rating</option>
                </select>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc size={16} />
                  ) : (
                    <SortDesc size={16} />
                  )}
                </button>
              </div>

              <div className="flex bg-stone-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-slate-700"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-slate-700"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Rango de precio */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">
              Rango de precio:
            </span>
            <input
              type="range"
              min="0"
              max="3000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number.parseInt(e.target.value), priceRange[1]])
              }
              className="flex-1 accent-slate-600"
            />
            <span className="text-sm text-slate-600">
              {formatPrice(priceRange[0])}
            </span>
            <span className="text-sm text-slate-600">-</span>
            <input
              type="range"
              min="0"
              max="3000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number.parseInt(e.target.value)])
              }
              className="flex-1 accent-slate-600"
            />
            <span className="text-sm text-slate-600">
              {formatPrice(priceRange[1])}
            </span>
          </div>
        </div>

        {/* Productos */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-stone-200">
            <Package className="mx-auto text-slate-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-slate-600">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-200">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-900">
                    Producto
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-900">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-900">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-900">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-900">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredProducts.map((product) => (
                  <ProductRow key={product._id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
