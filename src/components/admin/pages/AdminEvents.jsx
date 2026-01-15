import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useEvents } from "../../../context/EventContext";
import useCategoriesApi from "../../../hooks/useCategoriesApi";

export default function AdminEvents() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { categories, loading } = useCategoriesApi();

  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const emptyForm = {
    title: "",
    date: "",
    capacity: "",
    attendees: 0,
    categoryId: "",
  };

  const [form, setForm] = useState(emptyForm);

  if (loading) return <p>Loading...</p>;

  const openAdd = () => {
    setForm({ ...emptyForm, categoryId: categories[0]?.id });
    setSelectedEvent(null);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setForm(event);
    setSelectedEvent(event);
    setShowForm(true);
  };

  const saveEvent = () => {
    if (!form.title || !form.date) return;
    selectedEvent ? updateEvent(selectedEvent.id, form) : addEvent(form);
    setShowForm(false);
  };

  const confirmDelete = () => {
    deleteEvent(selectedEvent.id);
    setShowDelete(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow"
        >
          <Plus size={18} /> Event Baru
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Event</th>
            <th className="p-3 text-center">Date</th>
            <th className="p-3 text-center">Capacity</th>
            <th className="p-3 text-center">Attendees</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Category</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 font-medium">{e.title}</td>
              <td className="p-3 text-center">{e.date}</td>
              <td className="p-3 text-center">{e.capacity}</td>
              <td className="p-3 text-center">{e.attendees}</td>
              <td className="p-3 text-center">
                {e.attendees >= e.capacity ? (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs">
                    Penuh
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs">
                    Tersedia
                  </span>
                )}
              </td>
              <td className="p-3 text-center">
                {categories.find((c) => c.id === e.categoryId)?.name}
              </td>
              <td className="p-3 flex justify-center gap-2">
                <button
                  onClick={() => openEdit(e)}
                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedEvent(e);
                    setShowDelete(true);
                  }}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 relative animate-fadeIn">

            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Pencil size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {selectedEvent ? "Edit Event" : "Create New Event"}
                </h3>
                <p className="text-sm text-gray-500">
                 Kelola detail even
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs text-gray-500">Event Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full mt-1 bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Date</label>
                <input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full mt-1 bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Capacity</label>
                <input
                  type="number"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: Number(e.target.value) })
                  }
                  className="w-full mt-1 bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs text-gray-500">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  className="w-full mt-1 bg-gray-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={saveEvent}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg"
              >
                Simpan Event
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <p className="mb-4">
              Hapus <b>{selectedEvent?.title}</b>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
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