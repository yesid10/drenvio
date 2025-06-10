import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

const UserProfile = () => {
  const { user, logout, listen } = useAuthStore();

  useEffect(() => {
    listen();
  }, [listen]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt={user.displayName || user.email}
          className="w-8 h-8 rounded-full border border-stone-200 shadow-sm"
        />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-800">
          {user.displayName || user.email}
        </span>
        <button
          onClick={logout}
          className="text-xs text-slate-500 hover:text-slate-800 underline mt-0.5 text-left"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
