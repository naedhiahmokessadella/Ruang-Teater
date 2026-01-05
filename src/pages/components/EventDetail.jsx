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
  const { events } = useEvents();

  const event = events.find((e) => e.id === Number(id));
  const [isFavorite, setIsFavorite] = useState(false);

  if (!event) {
    return <p className="p-6">Event tidak ditemukan</p>;
  }

  // =========================
  // FAVORITE LOGIC (FIX)
  // =========================
  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = stored.find((item) => item.id === event.id);

    let updatedFavorites;

    if (exists) {
      updatedFavorites = stored.filter((item) => item.id !== event.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...stored, event];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Sync icon ❤️ saat halaman dibuka
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.some((item) => item.id === event.id);
    setIsFavorite(exists);
  }, [event.id]);

  const handleRegister = () => {
    navigate(`/ticket/${event.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <h1 className="text-xl font-bold bg-gradient-to-r from-red-800 to-red-500 bg-clip-text text-transparent">
            Event Details
          </h1>

          <div className="w-20" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 relative z-20">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-80 object-cover"
          />

          <div className="absolute top-4 right-4 flex gap-2 z-30">
            <button
              type="button"
              onClick={toggleFavorite}
              className={`p-3 rounded-full backdrop-blur-md transition cursor-pointer ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white/80 text-gray-700"
              }`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            <button
              type="button"
              className="p-3 rounded-full bg-white/80 text-gray-700 cursor-pointer"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mb-3">
            {event.category}
          </span>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>

          <p className="text-gray-600 mb-4">
            Organized by {event.organizer}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Info icon={<Calendar size={20} />} label="Date" value={event.date} />
            <Info icon={<Clock size={20} />} label="Time" value={event.time} />
            <Info
              icon={<MapPin size={20} />}
              label="Location"
              value={`${event.location} • ${event.distance}`}
            />
            <Info
              icon={<Users size={20} />}
              label="Attendance"
              value={`${event.attendees} / ${event.capacity}`}
            />
          </div>

          <h3 className="font-bold mb-2">About This Event</h3>
          <p className="text-gray-600">{event.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6 relative z-30 pointer-events-auto">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleRegister}
              className="flex-1 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-900 to-red-500 hover:from-red-200 hover:to-red-800 cursor-pointer"
            >
              Buy Now
            </button>

            <button
              type="button"
              className="px-6 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-xl cursor-pointer"
            >
              {event.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex gap-3 bg-gray-50 p-4 rounded-xl">
      <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
