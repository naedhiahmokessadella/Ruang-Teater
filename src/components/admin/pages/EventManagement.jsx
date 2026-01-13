import { useState } from "react";
import { useEvents } from "../../context/EventContext";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function EventManagement() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const emptyForm = {
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    attendees: 0,
    price: "",
    image: "",
    description: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* ================= MODAL CONTROL ================= */
  const openAdd = () => {
    setForm(emptyForm);
    setSelectedEvent(null);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setForm(event);
    setSelectedEvent(event);
    setShowForm(true);
  };

  const openDelete = (event) => {
    setSelectedEvent(event);
    setShowDelete(true);
  };

  /* ================= ACTION ================= */
  const handleSave = () => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, form);
    } else {
      addEvent(form);
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    deleteEvent(selectedEvent.id);
    setShowDelete(false);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Management</h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <Plus size={16} />
          Tambah Event
        </button>
      </div>

      {/* LIST EVENT */}
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-gray-500">
                {event.date} • {event.location}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openEdit(event)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => openDelete(event)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">
                {selectedEvent ? "Edit Event" : "Tambah Event"}
              </h2>
            </div>

            <div className="px-6 py-5 grid grid-cols-2 gap-4">
              {[
                ["Judul", "title"],
                ["Tanggal", "date"],
                ["Jam", "time"],
                ["Lokasi", "location"],
                ["Kapasitas", "capacity"],
                ["Harga", "price"],
                ["Image URL", "image"],
              ].map(([label, key]) => (
                <input
                  key={key}
                  placeholder={label}
                  value={form[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="border rounded-xl px-4 py-2 col-span-1 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ))}

              <textarea
                placeholder="Deskripsi"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="border rounded-xl px-4 py-2 col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL DELETE ================= */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl">
            <div className="px-6 py-5">
              <h3 className="text-lg font-semibold mb-2">Hapus Event</h3>
              <p className="text-gray-600">
                Yakin ingin menghapus event{" "}
                <b>{selectedEvent?.title}</b>?
              </p>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
