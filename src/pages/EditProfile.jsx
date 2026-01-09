import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/user-login");
      return;
    }

    const user = JSON.parse(storedUser);
    setName(user.name || "");
    setEmail(user.email || "");
    setPhoto(user.photo || "");
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const updatedUser = {
      ...storedUser,
      name,
      email,
      photo,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/profile");
  };

  return (
    <div className="max-w-xl mx-auto pt-28 px-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profil</h1>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow p-6 space-y-6">

        {/* FOTO */}
        <div className="flex items-center gap-6">
          <img
            src={photo || "/events/profil.jpeg"}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <label className="cursor-pointer text-blue-600 text-sm">
            Ganti Foto
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => setPhoto(reader.result);
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>

        {/* NAMA */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Nama Lengkap"
        />

        {/* EMAIL */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded"
          placeholder="Email"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
