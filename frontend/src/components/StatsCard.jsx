import React from "react"

const StatsCard = ({ title, value, icon, bg, iconColor }) => (
  <div className={`bg-white rounded-2xl shadow-sm p-6 border ${bg}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${bg}`}>
        {React.cloneElement(icon, { className: iconColor, size: 24 })}
      </div>
    </div>
  </div>
)

export default StatsCard
