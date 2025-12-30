import { useState } from "react";

export default function AdminLogin({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    if (email === "admin@gmail.com" && password === "admin123") {
    setPage("admin"); // 🔥 INI KUNCINYA
    } else {
    console.log("❌ Login gagal");
    setError("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
