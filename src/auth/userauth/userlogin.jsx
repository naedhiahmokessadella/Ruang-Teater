import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      name: "Orang Baik",
      email,
      photo: "",
    };

    localStorage.setItem("user", JSON.stringify(user));

    // ✅ REDIRECT KE HOME (RUANG TEATER)
    navigate("/");
  };

  const handleSocialLogin = (provider) => {
    const user = {
      name: provider === "google" ? "Google User" : "Facebook User",
      email: `${provider}@example.com`,
      photo: "",
    };

    localStorage.setItem("user", JSON.stringify(user));

    // ✅ REDIRECT KE HOME (RUANG TEATER)
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5eaea] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-center text-[#800000] mb-2">
          Login
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Masuk ke akun kamu
        </p>

        <button
          onClick={() => handleSocialLogin("google")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-3 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">
            Lanjutkan dengan Google
          </span>
        </button>

        <button
          onClick={() => handleSocialLogin("facebook")}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg mb-6 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">
            Lanjutkan dengan Facebook
          </span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-[#800000] outline-none"
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
              className="w-full border pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-[#800000] outline-none"
              required
            />
          </div>

          <button
            className="w-full bg-[#800000] text-white py-3 rounded-lg hover:bg-[#6b0000] transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link to="/signup" className="text-[#800000] font-medium">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
