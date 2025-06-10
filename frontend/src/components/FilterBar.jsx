import React from "react"
import { Search, Grid, List, SortAsc, SortDesc } from "lucide-react"

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedMarca,
  setSelectedMarca,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
  priceRange,
  setPriceRange,
  categories,
  marcas,
  formatPrice
}) => (
  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
    <div className="flex flex-col sm:flex-row gap-4 flex-1">
      {/* Búsqueda */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
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
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        value={selectedMarca}
        onChange={(e) => setSelectedMarca(e.target.value)}
        className="px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
      >
        <option value="all">Todas las marcas</option>
        {marcas.map((marca) => (
          <option key={marca} value={marca}>{marca}</option>
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
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
        >
          {sortOrder === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
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
    {/* Rango de precio */}
    <div className="flex items-center gap-4 w-full mt-4 lg:mt-0">
      <span className="text-sm font-medium text-slate-700">Rango de precio:</span>
      <input
        type="range"
        min="0"
        max="3000"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
        className="flex-1 accent-slate-600"
      />
      <span className="text-sm text-slate-600">{formatPrice(priceRange[0])}</span>
      <span className="text-sm text-slate-600">-</span>
      <input
        type="range"
        min="0"
        max="3000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
        className="flex-1 accent-slate-600"
      />
      <span className="text-sm text-slate-600">{formatPrice(priceRange[1])}</span>
    </div>
  </div>
)

export default FilterBar
