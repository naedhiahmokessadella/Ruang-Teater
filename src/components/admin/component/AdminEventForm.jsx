import { useState } from "react";
import { X } from "lucide-react";

export default function AdminEventForm({ events, setEvents, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    capacity: "",
    attendees: 0,
    description: "",
    image: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: events.length ? Math.max(...events.map(e => e.id)) + 1 : 1,
      ...formData,
      capacity: Number(formData.capacity),
      attendees: Number(formData.attendees),
      image: formData.image || `https://picsum.photos/400/300?random=${Date.now()}`
    };

    setEvents([...events, newEvent]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Tambah Event</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {["title", "date", "location", "capacity"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "date" ? "date" : "text"}
              placeholder={field}
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          ))}

          <textarea
            name="description"
            placeholder="Deskripsi"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded">
              Simpan
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 rounded">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
