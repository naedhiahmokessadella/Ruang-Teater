import { useState } from "react";

export default function FormData({ onSubmit, onCancel }) {
  const [judul, setJudul] = useState("");

  const handleSubmit = () => {
    if (!judul.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }
    onSubmit({ judul });
    setJudul(""); // Reset form
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
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Batal
        </button>
      </div>
    </div>
  );
}