import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, Edit3, LogOut } from "lucide-react";

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
    <div className="max-w-5xl mx-auto pt-28 px-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8">My Profil</h1>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* FOTO PROFIL */}
          <img
            src={user.photo || "/events/profil.jpeg"}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            {/* NAMA */}
            <h2 className="text-xl font-semibold">
              {user.name || "Nama belum diisi"}
            </h2>

            {/* EMAIL */}
            <p className="text-gray-500 text-sm">
              {user.email || "Email belum diisi"}
            </p>

            {/* EDIT BUTTON */}
            <button
              onClick={() => navigate("/profile/edit")}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
            >
              <Edit3 size={16} />
              Edit Profil
            </button>
          </div>
        </div>

        {/* ICON KANAN */}
        <User size={80} className="text-gray-100 hidden md:block" />
      </div>

      {/* ACCOUNT MENU */}
      <div className="bg-white rounded-2xl shadow divide-y overflow-hidden">
        <ProfileItem label="Pengaturan Akun" />
        <ProfileItem label="Pusat Bantuan" />
        <ProfileItem label="Tentang Aplikasi" />

        <ProfileItem
          label="Logout"
          danger
          icon={<LogOut size={18} />}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}

/* ================= ITEM ================= */

function ProfileItem({ label, onClick, danger, icon }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-6 py-4 cursor-pointer
        ${danger ? "text-red-600 hover:bg-red-50" : "hover:bg-gray-50"}
      `}
    >
      <span className="font-medium">{label}</span>
      {icon}
    </div>
  );
}
