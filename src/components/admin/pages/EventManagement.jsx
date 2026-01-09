import { useEvents } from "../../context/EventContext";

export default function EventManagement() {
  const { events, deleteEvent, addEvent } = useEvents();

  const handleAdd = () => {
    addEvent({
      title: "Event Baru",
      date: "23 AGUSTUS 2025",
      time: "19.00",
      location: "Yogyakarta",
      capacity: 200,
      attendees: 0,
      price: "Rp 50.000",
      image: "https://via.placeholder.com/600",
      description: "Event baru",
    });
  };

  return (
    <div className="p-6">
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Tambah Event
      </button>

      {events.map((event) => (
        <div key={event.id} className="flex justify-between border p-3 mb-2">
          <span>{event.title}</span>
          <button
            onClick={() => deleteEvent(event.id)}
            className="text-red-600"
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}
