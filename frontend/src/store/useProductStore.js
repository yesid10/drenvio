import { create } from "zustand"
import axios from "axios"

const API_URL = "http://localhost:3000/api" // Cambia el puerto/url según tu backend

const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: true,
  searchTerm: "",
  selectedCategory: "all",
  selectedMarca: "all",
  viewMode: "grid",
  sortBy: "nombre",
  sortOrder: "asc",
  priceRange: [0, 3000],
  stats: {
    total: 0,
    enStock: 0,
    conDescuento: 0,
    valorTotal: 0,
  },
  setProducts: (products) => set({ products }),
  setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
  setLoading: (loading) => set({ loading }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedMarca: (selectedMarca) => set({ selectedMarca }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setStats: (stats) => set({ stats }),
  fetchProducts: async () => {
    set({ loading: true })
    try {
      const res = await axios.get(`${API_URL}/productos`)
      set({ products: res.data, filteredProducts: res.data, loading: false })
      get().calculateStats(res.data)
    } catch (e) {
      set({ products: [], filteredProducts: [], loading: false })
    }
  },
  calculateStats: (productList) => {
    const total = productList.length
    const enStock = productList.filter((p) => p.stock > 0).length
    const conDescuento = productList.filter((p) => p.descuento > 0).length
    const valorTotal = productList.reduce((sum, p) => sum + p.precio * p.stock, 0)
    set({ stats: { total, enStock, conDescuento, valorTotal } })
  },
}))

export default useProductStore
