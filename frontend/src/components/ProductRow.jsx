import React from "react"
import { Eye, Edit, Trash2 } from "lucide-react"

const ProductRow = ({ product, formatPrice, calculateDiscountedPrice }) => (
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
            {formatPrice(calculateDiscountedPrice(product.precio, product.descuento))}
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
)

export default ProductRow
