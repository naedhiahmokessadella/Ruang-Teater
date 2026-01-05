import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto pt-32 px-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">My Profil</h1>

      {/* PROFILE CARD */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center gap-6">
          <img
            src="/events/profil.jpeg"
            alt="User"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>
            <p className="text-lg font-semibold">Orang Baik</p>
            <p className="text-sm text-gray-500 mb-3">
              orangbaik@gmail.com
            </p>

            <button
              onClick={() => navigate("/profile/edit")}
              className="px-4 py-2 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
            >
              Edit Profil
            </button>
          </div>
        </div>
      </div>

      {/* MENU ACCOUNT */}
      <div className="bg-white rounded-lg shadow divide-y">
       
        <ProfileItem
          label="Tiket Saya"
          onClick={() => navigate("/history")}
        />
        <ProfileItem
          label="Event Favorit"
          onClick={() => navigate("/favorites")}
        />
        <ProfileItem
          label="Pengaturan Akun"
        />
        <ProfileItem
          label="Pusat Bantuan"
        />
        <ProfileItem
          label="Tentang Aplikasi"
        />
        <ProfileItem
          label="Keluar"
          danger
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

function ProfileItem({ label, value, onClick, danger }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center px-6 py-4 cursor-pointer
        ${danger ? "text-red-600 hover:bg-red-50" : "hover:bg-gray-50"}
      `}
    >
      <span>{label}</span>
      {value && (
        <span className="text-blue-500 font-medium">
          {value}
        </span>
      )}
    </div>
  );
}