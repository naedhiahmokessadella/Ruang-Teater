export default function Register({ setPage }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Nama"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />

        <button className="w-full bg-purple-600 text-white py-2 rounded">
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Sudah punya akun?{" "}
          <button
            onClick={() => setPage("login")}
            className="text-blue-600"
          >
            Login
          </button>
        </p>

        <button
          onClick={() => setPage("home")}
          className="block mx-auto mt-4 text-sm text-gray-500"
        >
          ← Kembali ke Home
        </button>
      </div>
    </div>
  );
}