import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-stone-700 to-slate-600 bg-clip-text text-transparent">
          DRENVIO
        </Link>
        <UserProfile />
      </div>
    </header>
  );
};

export default Navbar;
