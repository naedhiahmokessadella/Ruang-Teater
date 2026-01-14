import { User, LogOut, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg text-sm z-50">
      
      {/* MY PROFILE */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full"
      >
        <User size={16} /> My Profile
      </button>

      <div className="border-t" />

      {/* LOGIN */}
      <button
        onClick={() => navigate("/user-login")}
        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full"
      >
        <Lock size={16} /> Login
      </button>

      <div className="border-t" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 w-full"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
