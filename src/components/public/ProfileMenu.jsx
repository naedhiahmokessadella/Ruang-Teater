import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg text-sm z-50">
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full"
      >
        <User size={16} /> Profile
      </button>

      <div className="border-t" />

      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 w-full"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
