import { useEffect } from "react";
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

const Home = () => {
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
            title="Con Descuento"
            value={stats.conDescuento}
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
        {filteredProducts.length === 0 ? (
          <EmptyState
            message="No se encontraron productos"
            description="Intenta ajustar los filtros de búsqueda"
            icon={<Package className="mx-auto text-slate-300 mb-4" size={64} />}
          />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                formatPrice={formatPrice}
                calculateDiscountedPrice={calculateDiscountedPrice}
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
                {filteredProducts.map((product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    formatPrice={formatPrice}
                    calculateDiscountedPrice={calculateDiscountedPrice}
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
