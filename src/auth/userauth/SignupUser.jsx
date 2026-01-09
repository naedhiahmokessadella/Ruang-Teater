import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function SignupUser() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      photo: "",
    };

    // simpan user (anggap berhasil daftar)
    localStorage.setItem("user", JSON.stringify(user));

    // redirect ke profile
    navigate("/profile");
  };

  // dummy social signup
  const handleSocialSignup = (provider) => {
    const user = {
      name: provider === "google" ? "Google User" : "Facebook User",
      email: `${provider}@example.com`,
      photo: "",
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5eaea] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-center text-[#800000] mb-2">
          Daftar
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Buat akun baru untuk melanjutkan
        </p>

        {/* GOOGLE SIGNUP */}
        <button
          onClick={() => handleSocialSignup("google")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-3 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">
            Daftar dengan Google
          </span>
        </button>

        {/* FACEBOOK SIGNUP */}
        <button
          onClick={() => handleSocialSignup("facebook")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-6 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">
            Daftar dengan Facebook
          </span>
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* FORM SIGNUP */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border pl-10 pr-4 py-3 rounded-lg
                focus:ring-2 focus:ring-[#800000] outline-none"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border pl-10 pr-4 py-3 rounded-lg
                focus:ring-2 focus:ring-[#800000] outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border pl-10 pr-4 py-3 rounded-lg
                focus:ring-2 focus:ring-[#800000] outline-none"
              required
            />
          </div>

          <button
            className="w-full bg-[#800000] text-white py-3 rounded-lg
              hover:bg-[#6b0000] transition"
          >
            Daftar
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Sudah punya akun?{" "}
          <Link to="/user/login" className="text-[#800000] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
