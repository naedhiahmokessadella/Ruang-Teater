import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Heart,
  Download,
  Globe,
  MapPin,
  CreditCard,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/user-login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return null;

  return (
    // 🔴 BACKGROUND MERAH MAROON
    <div className="min-h-screen bg-[#800000] flex justify-center px-3 sm:px-6">
      <div className="w-full max-w-md pt-20 pb-10">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">
          My Profile
        </h1>

        {/* CARD USER */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-5 flex items-center gap-4 mb-6">
          <img
            src={user.photo || "/events/profil.jpeg"}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border"
          />

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base sm:text-lg truncate">
              {user.name || "Nama belum diisi"}
            </h2>
            <p className="text-sm text-gray-500 truncate">
              {user.email || "Email belum diisi"}
            </p>

            <button
              onClick={() => navigate("/profile/edit")}
              className="
                mt-3
                px-4 py-1.5
                text-sm
                rounded-full
                bg-red-500
                text-white
                hover:bg-red-600
              "
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-3">
          <Item icon={<Heart size={18} />} label="Favorites" />
          <Item icon={<Download size={18} />} label="Downloads" />
          <Item icon={<Globe size={18} />} label="Language" />
          <Item icon={<MapPin size={18} />} label="Location" />
          <Item icon={<CreditCard size={18} />} label="Subscription" />
          <Item icon={<Trash2 size={18} />} label="Clear cache" />

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="
              w-full
              flex items-center justify-between
              bg-white
              rounded-xl
              shadow
              px-4 py-3
              text-red-600
              hover:bg-red-50
            "
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              <span className="font-medium">Log out</span>
            </div>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== ITEM MENU (RESPONSIVE) ===== */
function Item({ icon, label }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        px-4 py-3
        flex items-center justify-between
        hover:bg-gray-50
        cursor-pointer
      "
    >
      <div className="flex items-center gap-3 min-w-0">
        {icon}
        <span className="font-medium truncate">{label}</span>
      </div>
      <ChevronRight size={18} className="shrink-0" />
    </div>
  );
}
