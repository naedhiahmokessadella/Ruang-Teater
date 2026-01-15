import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // AUTO SEED ADMIN
  useEffect(() => {
    const admins = [
      { name: "Admin 1", email: "admin1@mail.com", password: "123456" },
      { name: "Admin 2", email: "admin2@mail.com", password: "123456" },
      { name: "Admin 3", email: "admin3@mail.com", password: "123456" },
    ];
    localStorage.setItem("admins", JSON.stringify(admins));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const found = admins.find(
      (a) =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password
    );

    if (!found) {
      setError("Email atau password salah");
      return;
    }

    localStorage.setItem("adminLogged", JSON.stringify(found));
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6b0f1a] via-[#8c1d2b] to-[#a83232]">
      <div className="relative bg-[#fff7f7] w-[360px] rounded-2xl shadow-2xl px-8 pt-16 pb-10">

        {/* ICON BULAT ATAS */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6b0f1a] to-[#a83232] flex items-center justify-center shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#6b0f1a]">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6b0f1a] to-[#8c1d2b] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}