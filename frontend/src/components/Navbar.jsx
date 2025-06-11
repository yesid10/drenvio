import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import { Package, Upload as UploadIcon } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-stone-700 to-slate-600 bg-clip-text text-transparent">
            DRENVIO
          </Link>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link
                to="/home"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/home")
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Package size={20} />
                Artículos
              </Link>
              <Link
                to="/subida"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/subida")
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <UploadIcon size={20} />
                Subida
              </Link>
            </nav>
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
