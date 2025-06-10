import React from "react"

const Loader = () => (
  <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-slate-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-700 mx-auto mb-4"></div>
      <p className="text-slate-600 text-lg font-medium">Cargando productos...</p>
    </div>
  </div>
)

export default Loader
