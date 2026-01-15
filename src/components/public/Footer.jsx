import { Home, Heart, MapPin, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Favorit", icon: Heart, path: "/favorite" },
    { label: "Lokasi", icon: MapPin, path: "/location" },
    { label: "Riwayat", icon: Clock, path: "/history" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
      <div className="flex justify-around py-2">
        {menu.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center text-xs ${
                active ? "text-red-700 font-semibold" : "text-gray-500"
              }`}
            >
              <Icon size={22} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}
