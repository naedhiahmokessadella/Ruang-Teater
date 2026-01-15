import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventContext";

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { events, loading } = useEvents();

  const [isFavorite, setIsFavorite] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading event...</p>
      </div>
    );
  }

  const event = events.find((e) => String(e.id) === String(id));

  if (!event) {
    return <p className="p-4">Event tidak ditemukan</p>;
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(stored.some((item) => item.id === event.id));
  }, [event.id]);

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.some((item) => item.id === event.id);

    const updated = exists
      ? stored.filter((item) => item.id !== event.id)
      : [...stored, event];

    setIsFavorite(!exists);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 text-sm">
      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b z-30">
        <div className="max-w-4xl mx-auto px-3 py-2 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <h1 className="text-sm font-semibold text-red-600">
            Event Details
          </h1>

          <div className="w-6" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-3 py-4">
        {/* IMAGE */}
        <div className="relative rounded-xl overflow-hidden shadow mb-4">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-44 sm:h-56 object-cover"
          />

          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${
                isFavorite
                  ? "bg-red-500 text-white"
                  : "bg-white/80 text-gray-700"
              }`}
            >
              <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            <button className="p-2 rounded-full bg-white/80 text-gray-700">
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
            {event.category}
          </span>

          <h2 className="text-lg font-semibold mt-2">
            {event.title}
          </h2>

          <p className="text-xs text-gray-500 mb-3">
            Organized by {event.organizer}
          </p>

          <Info icon={<Calendar size={14} />} label="Date" value={event.date} />
          <Info icon={<Clock size={14} />} label="Time" value={event.time} />
          <Info
            icon={<MapPin size={14} />}
            label="Location"
            value={event.location}
          />
          <Info
            icon={<Users size={14} />}
            label="Attendance"
            value={`${event.attendees}/${event.capacity}`}
          />

          <p className="text-xs text-gray-600 mt-3">
            {event.description}
          </p>
        </div>

        {/* ACTION */}
        <button
          onClick={() =>
            navigate(`/payment/${event.id}`, { state: event })
          }
          className="w-full py-3 rounded-lg text-white font-semibold bg-red-700"
        >
          Beli
        </button>

        <p className="text-center text-xs text-red-600 mt-2">
          {event.price}
        </p>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg mb-2">
      <div className="p-1.5 bg-red-100 text-red-600 rounded">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500">{label}</p>
        <p className="text-xs font-medium">{value}</p>
      </div>
    </div>
  );
}
