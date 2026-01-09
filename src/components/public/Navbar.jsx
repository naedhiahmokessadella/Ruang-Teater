import { Bell, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../public/ProfileMenu";

export default function Navbar({ searchInput, setSearchInput, setSearchQuery }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔔 NOTIFICATION STATE (TAMBAHAN)
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Favorit Ditambahkan",
      message: "Teater Ramayana masuk ke favorit",
      link: "/favorite",
      read: false,
    },
    {
      id: 2,
      title: "Pengingat Event",
      message: "Event favoritmu akan berlangsung besok",
      link: "/event/1",
      read: false,
    },
    {
      id: 3,
      title: "Event Baru",
      message: "Event teater terbaru telah tersedia",
      link: "/",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 🔍 SEARCH
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ❌ tutup notifikasi kalau klik luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm relative">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-red-900 to-red-500 bg-clip-text text-transparent"
      >
        Events
      </h1>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Cari tiket..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none text-sm w-40"
          />
        </div>

        {/* Admin */}
        <button
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Admin
        </button>

        {/* 🔔 Notification (DIPERBAIKI, BISA DIKLIK) */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative cursor-pointer"
          >
            <Bell size={20} className="text-gray-600" />

            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1
                           w-4 h-4 text-xs
                           bg-red-500 text-white
                           rounded-full flex items-center justify-center"
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Notifikasi */}
          {notifOpen && (
            <div
              className="absolute right-0 top-10 w-80
                         bg-white rounded-xl shadow-lg
                         border z-50 overflow-hidden"
            >
              <div className="px-4 py-3 font-semibold border-b">
                Notifikasi
              </div>

              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">
                  Tidak ada notifikasi
                </p>
              ) : (
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      onClick={() => {
                        navigate(notif.link);
                        setNotifOpen(false);
                      }}
                      className={`px-4 py-3 text-sm cursor-pointer
                        hover:bg-gray-100
                        ${!notif.read ? "bg-red-50" : ""}`}
                    >
                      <p className="font-medium">{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notif.message}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Avatar + ProfileMenu (ASLI, TIDAK DIUBAH) */}
        <div className="relative">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full
                       bg-gradient-to-br from-red-700 to-red-500
                       flex items-center justify-center
                       text-white font-bold text-sm
                       cursor-pointer select-none"
          >
            U
          </div>

          {menuOpen && <ProfileMenu onLogout={handleLogout} />}
        </div>
      </div>
    </nav>
  );
}
