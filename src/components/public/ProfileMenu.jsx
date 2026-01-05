import { User, Ticket, LogOut, History } from "lucide-react";
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

      <button
        onClick={() => navigate("/my-tickets")}
        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full"
      >
        <Ticket size={16} /> Tiket Saya
      </button>

      <button
        onClick={() => navigate("/transactions")}
        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full"
      >
        <History size={16} /> Riwayat
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
