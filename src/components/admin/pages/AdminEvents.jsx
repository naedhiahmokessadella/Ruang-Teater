import { Pencil, Trash2, Plus } from "lucide-react";
import { useEvents } from "../../../context/EventContext";
import useCategoriesApi from "../../../hooks/useCategoriesApi";

export default function AdminEvents() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { categories, loading } = useCategoriesApi();

  if (loading) return <p>Loading...</p>;

  const handleAddEvent = () => {
    addEvent({
      title: "Event Baru",
      date: "25 AGUSTUS 2025",
      capacity: 100,
      attendees: 0,
      categoryId: categories[0]?.id || "1",
    });
  };

  const handleEditEvent = (e) => {
    const title = prompt("Judul Event:", e.title);
    if (!title) return;

    const date = prompt("Tanggal Event:", e.date);
    if (!date) return;

    const capacity = Number(prompt("Kapasitas:", e.capacity));
    if (isNaN(capacity)) return;

    const attendees = Number(prompt("Jumlah Peserta:", e.attendees));
    if (isNaN(attendees)) return;

    const categoryList = categories
      .map((c) => `${c.id} - ${c.name}`)
      .join("\n");

    const categoryId = prompt(
      `Pilih Category ID:\n${categoryList}`,
      e.categoryId
    );

    updateEvent(e.id, {
      ...e,
      title,
      date,
      capacity,
      attendees,
      categoryId,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Event Management</h2>

        <button
          onClick={handleAddEvent}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={16} />
          Tambah Event
        </button>
      </div>

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
            <tr key={e.id} className="border-b">
              <td className="p-3">{e.title}</td>
              <td className="p-3 text-center">{e.date}</td>
              <td className="p-3 text-center">{e.capacity}</td>
              <td className="p-3 text-center">{e.attendees}</td>

              <td className="p-3 text-center">
                {e.attendees >= e.capacity ? (
                  <span className="text-red-600">Full</span>
                ) : (
                  <span className="text-green-600">Available</span>
                )}
              </td>

              <td className="p-3 text-center">
                {categories.find((c) => c.id === e.categoryId)?.name || "-"}
              </td>

              <td className="p-3 flex justify-center gap-2">
                <button
                  onClick={() => handleEditEvent(e)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Yakin hapus event ini?")) {
                      deleteEvent(e.id);
                    }
                  }}
                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
