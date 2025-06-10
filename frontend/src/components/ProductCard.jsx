import React, { useState, useEffect } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useProductStore from "../store/useProductStore";

const ProductCard = ({ product, formatPrice, calculateDiscountedPrice, tienePrecioEspecial }) => {
  const { user } = useAuthStore();
  const { fetchPrecioEspecial } = useProductStore();
  const [precioEspecial, setPrecioEspecial] = useState(null);
  const [loadingPrecio, setLoadingPrecio] = useState(false);

  useEffect(() => {
    const getPrecioEspecial = async () => {
      if (user) {
        setLoadingPrecio(true);
        const precio = await fetchPrecioEspecial(product._id);
        console.log("Precio especial obtenido:", precio);
        setPrecioEspecial(precio);
        setLoadingPrecio(false);
      } else {
        setPrecioEspecial(null);
      }
    };
    getPrecioEspecial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, product._id]);

  console.log("Precio especial",precioEspecial)

  return (
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
          {precioEspecial !== null && precioEspecial !== product.precio ? (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
              Precio especial
            </span>
          ) : product.precio !== product.precioBase ? (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
              Oferta
            </span>
          ) : null}
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
        <div className="text-xs text-slate-400 mb-1">SKU: {product.sku}</div>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.descripcion}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {loadingPrecio ? (
              <span className="text-sm text-slate-400">Cargando precio...</span>
            ) : precioEspecial !== null && precioEspecial !== product.precio ? (
              <>
                <span className="text-lg font-bold text-emerald-700">
                  {formatPrice(precioEspecial)}
                  {tienePrecioEspecial && (
                    <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                      Precio especial
                    </span>
                  )}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.precio)}
                </span>
              </>
            ) : product.precio !== product.precioBase ? (
              <>
                <span className="text-lg font-bold text-emerald-700">
                  {formatPrice(product.precio)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.precioBase)}
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
};

export default ProductCard;
