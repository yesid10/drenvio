import React from "react"

const EmptyState = ({ message, description, icon }) => (
  <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-stone-200">
    <div className="mx-auto mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">{message}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
)

export default EmptyState
