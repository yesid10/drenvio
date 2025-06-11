import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Plus,
  SortAsc,
  SortDesc,
  Package,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import StatsCard from "../components/StatsCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import FilterBar from "../components/FilterBar";
import useProductStore from "../store/useProductStore";
import Navbar from "../components/Navbar";
import SpecialPriceModal from "../components/SpecialPriceModal";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

const Home = () => {
  const navigate = useNavigate();
  const {
    products,
    filteredProducts,
    loading,
    searchTerm,
    selectedCategory,
    selectedMarca,
    viewMode,
    sortBy,
    sortOrder,
    priceRange,
    stats,
    setFilteredProducts,
    setSearchTerm,
    setSelectedCategory,
    setSelectedMarca,
    setViewMode,
    setSortBy,
    setSortOrder,
    setPriceRange,
    fetchProducts,
    calculateStats,
  } = useProductStore();
  const { token, user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [showOnlySpecials, setShowOnlySpecials] = useState(false);
  const [specialsMap, setSpecialsMap] = useState({});

  const handleShowSpecials = () => {
    if (!token) {
      navigate('/not-logged-in');
      return;
    }
    setShowOnlySpecials((v) => !v);
  };

  // Obtener todos los precios especiales del usuario autenticado
  useEffect(() => {
    const fetchSpecials = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/precios-especiales`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filtra solo los del usuario autenticado
        const userSpecials = res.data.filter((sp) => sp.userUid === user?.uid);
        // Mapea productoId -> precio especial
        const map = {};
        userSpecials.forEach((sp) => {
          map[sp.productoId] = sp.precioEspecial;
        });
        setSpecialsMap(map);
      } catch (e) {
        console.error("Error al obtener precios especiales:", e);
        setSpecialsMap({});
      }
    };
    fetchSpecials();

    // Escuchar eventos de actualización de precios especiales
    const handlePrecioEspecialActualizado = () => {
      fetchSpecials();
    };

    window.addEventListener('precioEspecialActualizado', handlePrecioEspecialActualizado);

    return () => {
      window.removeEventListener('precioEspecialActualizado', handlePrecioEspecialActualizado);
    };
  }, [token, user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  const filteredForSpecials = useMemo(() => {
    if (!showOnlySpecials) return filteredProducts;
    return filteredProducts.filter((p) => specialsMap[p._id] !== undefined);
  }, [showOnlySpecials, filteredProducts, specialsMap]);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-slate-50">
      <Navbar />
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
            <div className="flex gap-2">
              <button
                className="bg-gradient-to-r hover:cursor-pointer from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <DollarSign size={20} />
                Nuevo Precio Especial
              </button>
              <button
                className={`px-6 py-3 hover:cursor-pointer rounded-xl font-medium shadow-sm transition-all duration-200 flex items-center gap-2 border ${
                  showOnlySpecials
                    ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                    : "bg-white border-stone-200 text-slate-700"
                }`}
                onClick={handleShowSpecials}
              >
                <DollarSign size={20} />
                Ver solo precios especiales
              </button>
            </div>
          </div>
        </div>
      </div>
      <SpecialPriceModal
        open={showModal}
        onClose={() => setShowModal(false)}
        products={products}
        formatPrice={formatPrice}
      />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Productos"
            value={stats.total}
            icon={<Package />}
            bg="border-stone-200"
            iconColor="text-slate-700"
          />
          <StatsCard
            title="En Stock"
            value={stats.enStock}
            icon={<TrendingUp />}
            bg="border-emerald-200"
            iconColor="text-emerald-700"
          />
          <StatsCard
            title="Con Precio Especial"
            value={Object.keys(specialsMap).length}
            icon={<DollarSign />}
            bg="border-amber-200"
            iconColor="text-amber-700"
          />
          <StatsCard
            title="Valor Total"
            value={formatPrice(stats.valorTotal)}
            icon={<DollarSign />}
            bg="border-teal-200"
            iconColor="text-teal-700"
          />
        </div>

        {/* Filtros y Controles */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedMarca={selectedMarca}
          setSelectedMarca={setSelectedMarca}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={getUniqueValues("categoria")}
          marcas={getUniqueValues("marca")}
          formatPrice={formatPrice}
        />

        {/* Productos */}
        {filteredForSpecials.length === 0 ? (
          <EmptyState
            message={
              showOnlySpecials
                ? "No tienes productos con precio especial"
                : "No se encontraron productos"
            }
            description={
              showOnlySpecials
                ? "Asigna precios especiales para verlos aquí"
                : "Intenta ajustar los filtros de búsqueda"
            }
            icon={
              <Package className="mx-auto text-slate-300 mb-4" size={64} />
            }
          />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredForSpecials.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                formatPrice={formatPrice}
                calculateDiscountedPrice={calculateDiscountedPrice}
                tienePrecioEspecial={specialsMap[product._id] !== undefined}
              />
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
                {filteredForSpecials.map((product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    formatPrice={formatPrice}
                    calculateDiscountedPrice={calculateDiscountedPrice}
                    tienePrecioEspecial={specialsMap[product._id] !== undefined}
                  />
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
