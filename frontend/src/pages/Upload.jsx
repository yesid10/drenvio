import { useState, useEffect } from "react";
import { DollarSign, Package } from "lucide-react";
import useProductStore from "../store/useProductStore";
import useAuthStore from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const { token, user } = useAuthStore();
  const { products, fetchProducts, assignPrecioEspecial } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [specialPrice, setSpecialPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate('/not-logged-in');
      return;
    }
    fetchProducts();
  }, [token, navigate, fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!selectedProduct || !specialPrice) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    const precioNumerico = Number(specialPrice);
    if (isNaN(precioNumerico)) {
      setError("El precio debe ser un número válido");
      setLoading(false);
      return;
    }

    console.log("Datos del formulario:", {
      selectedProduct,
      specialPrice: precioNumerico
    });

    try {
      const result = await assignPrecioEspecial(selectedProduct, precioNumerico);
      console.log("Resultado de assignPrecioEspecial:", result);
      
      if (result) {
        setSuccess("Precio especial asignado correctamente");
        setSelectedProduct("");
        setSpecialPrice("");
      } else {
        setError("Error al asignar el precio especial");
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      setError("Error al procesar el precio especial. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-slate-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="text-emerald-600" size={24} />
            <h1 className="text-2xl font-bold text-slate-800">
              Asignar Precio Especial
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Seleccionar Producto
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Selecciona un producto</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.nombre} - {formatPrice(product.precio)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Precio Especial
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500">$</span>
                <input
                  type="number"
                  value={specialPrice}
                  onChange={(e) => setSpecialPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Procesando..."
              ) : (
                <>
                  <DollarSign size={20} />
                  Asignar Precio Especial
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload; 