import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventContext";

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { events, loading } = useEvents();
  const [isFavorite, setIsFavorite] = useState(false);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  const event = events.find((e) => String(e.id) === String(id));

  if (!event) {
    return <p className="p-6">Event tidak ditemukan</p>;
  }

  /* ================= FAVORITE ================= */
  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.some((item) => item.id === event.id);

    const updated = exists
      ? stored.filter((item) => item.id !== event.id)
      : [...stored, event];

    setIsFavorite(!exists);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(stored.some((item) => item.id === event.id));
  }, [event.id]);

  /* ================= REGISTER ================= */
  const handleRegister = () => {
    if (event.attendees >= event.capacity) {
      alert("Event sudah penuh");
      return;
    }

    const name = prompt("Nama:");
    if (!name) return;

    const email = prompt("Email:");
    if (!email) return;

    const phone = prompt("No HP:");
    if (!phone) return;

    const newRegistration = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      name,
      email,
      phone,
      registeredAt: new Date().toISOString(),
    };

    /* SAVE REGISTRATIONS */
    const existingRegistrations =
      JSON.parse(localStorage.getItem("registrations")) || [];

    localStorage.setItem(
      "registrations",
      JSON.stringify([...existingRegistrations, newRegistration])
    );

    /* UPDATE ATTENDEES (LOCAL ONLY) */
    const updatedEvents = events.map((e) =>
      String(e.id) === String(event.id)
        ? { ...e, attendees: Number(e.attendees) + 1 }
        : e
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));

    alert("Berhasil mendaftar 🎉");

    navigate(`/ticket/${event.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white shadow sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="font-bold text-lg">Event Detail</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto p-4">
        {/* IMAGE */}
        <div className="relative rounded-2xl overflow-hidden shadow mb-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-80 object-cover"
          />

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-full ${
                isFavorite ? "bg-red-500 text-white" : "bg-white"
              }`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            <button className="p-3 rounded-full bg-white">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
          <p className="text-gray-500 mb-4">
            Organized by {event.organizer}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Info icon={<Calendar />} label="Date" value={event.date} />
            <Info icon={<Clock />} label="Time" value={event.time} />
            <Info icon={<MapPin />} label="Location" value={event.location} />
            <Info
              icon={<Users />}
              label="Attendees"
              value={`${event.attendees}/${event.capacity}`}
            />
          </div>

          <p className="text-gray-600">{event.description}</p>
        </div>

        {/* ACTION */}
        <div className="bg-white rounded-2xl shadow p-6 flex gap-4">
          <button
            onClick={handleRegister}
            disabled={event.attendees >= event.capacity}
            className="flex-1 bg-red-700 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
          >
            {event.attendees >= event.capacity ? "Sold Out" : "Buy Now"}
          </button>

          <div className="px-6 py-3 border border-red-700 text-red-700 rounded-xl font-semibold">
            {event.price}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3 bg-gray-100 p-4 rounded-xl">
      <div className="p-2 bg-red-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
