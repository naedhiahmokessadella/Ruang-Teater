import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormData({ onSubmit }) {
  const [judul, setJudul] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!judul.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }
    onSubmit({ judul });
    setJudul(""); // Reset form

    // Navigasi ke halaman admin setelah submit
    navigate("/admin");
  };

  const handleCancel = () => {
    // Navigasi ke halaman admin saat batal
    navigate("/admin");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-3">Form Event</h3>
      <input
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul Event"
        className="border p-2 w-full rounded"
      />
      <div className="mt-3 space-x-2">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
