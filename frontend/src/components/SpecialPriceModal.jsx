import { useState } from "react";
import useProductStore from "../store/useProductStore";
import useAuthStore from "../store/useAuthStore";

const SpecialPriceModal = ({ open, onClose, products, formatPrice }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [specialPrice, setSpecialPrice] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { token } = useAuthStore();
  const { assignPrecioEspecial, refreshProducts } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    if (!selectedProduct) {
      setFormError("Selecciona un producto");
      setFormLoading(false);
      return;
    }
    if (specialPrice === '' || isNaN(Number(specialPrice)) || Number(specialPrice) <= 0) {
      setFormError("Ingresa un precio válido mayor a 0");
      setFormLoading(false);
      return;
    }
    const priceNumber = Number(specialPrice);
    try {
      const ok = await assignPrecioEspecial(selectedProduct, priceNumber);
      if (!ok) throw new Error();
      await refreshProducts();
      setSelectedProduct("");
      setSpecialPrice("");
      onClose();
    } catch (err) {
      setFormError("Error al asignar precio especial");
    } finally {
      setFormLoading(false);
    }
  };

  // Limpiar campos al cerrar el modal
  const handleClose = () => {
    setSelectedProduct("");
    setSpecialPrice("");
    setFormError("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-xl"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-slate-800">Asignar Precio Especial</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Producto</label>
            <select
              className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              <option value="">Selecciona un producto</option>
              {products.map((p) => {
                let precio = null;
                if (typeof p.precio === 'number' && !isNaN(p.precio)) {
                  precio = p.precio;
                } else if (typeof p.precio === 'string' && p.precio.trim() !== '' && !isNaN(Number(p.precio))) {
                  precio = Number(p.precio);
                }
                return (
                  <option key={p._id} value={p._id}>
                    {p.nombre} ({precio !== null ? formatPrice(precio) : '-'})

                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Precio especial (USD)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="w-full border border-stone-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500"
              value={specialPrice}
              onChange={(e) => {
                // Permitir vacío, pero solo guardar si es número válido
                const val = e.target.value;
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  setSpecialPrice(val);
                }
              }}
              required
            />
          </div>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-sm"
            disabled={formLoading}
          >
            {formLoading ? "Guardando..." : "Asignar Precio Especial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SpecialPriceModal;
