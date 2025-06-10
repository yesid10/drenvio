import React from "react";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">¡Ups! No estás logueado</h2>
      <p className="text-slate-600 mb-6">Debes iniciar sesión para ver tus productos con precios especiales.</p>
      <button
        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold shadow hover:from-emerald-700 hover:to-teal-700 transition"
        onClick={() => navigate("/")}
      >
        Ir al Login
      </button>
    </div>
  );
};

export default NotLoggedIn;
