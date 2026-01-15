import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Camera, Eye } from "lucide-react";

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
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
    setUsername(user.username || "");
    setPhone(user.phone || "");
    setPhoto(user.photo || "");
  }, [navigate]);

  const handleSave = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...storedUser,
        name,
        email,
        username,
        phone,
        photo,
      })
    );
    navigate("/profile");
  };

  return (
    // 🔴 BACKGROUND MAROON BENERAN
    <div className="min-h-screen bg-[#800000] flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="font-semibold text-lg">Edit Profile</h1>
          <Check
            className="text-[#800000] cursor-pointer"
            onClick={handleSave}
          />
        </div>

        {/* PHOTO */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="relative">
            <img
              src={photo || "/events/profil.jpeg"}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#800000]"
            />
            <label className="absolute bottom-0 right-0 bg-[#800000] p-1.5 rounded-full cursor-pointer">
              <Camera size={14} className="text-white" />
              <input
                type="file"
                hidden
                accept="image/*"
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
        </div>

        {/* FORM */}
        <div className="px-4 space-y-5">
          <Input label="Name" value={name} onChange={setName} />
          <Input label="E mail address" value={email} onChange={setEmail} />
          <Input label="User name" value={username} onChange={setUsername} />

          <div>
            <label className="text-sm text-gray-500">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                value="password"
                disabled
                className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10"
              />
              <Eye
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <Input
            label="Phone number"
            value={phone}
            onChange={setPhone}
          />
        </div>
      </div>
    </div>
  );
}

/* COMPONENT INPUT */
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full mt-1
          bg-gray-100
          rounded-xl
          px-4 py-3
          focus:outline-none
          focus:ring-2
          focus:ring-[#800000]/40
        "
      />
    </div>
  );
}