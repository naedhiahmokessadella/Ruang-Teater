import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../context/EventContext";
import { MapPin } from "lucide-react";

export default function Location() {
  const { events } = useEvents();
  const navigate = useNavigate();

  // Buat daftar lokasi unik dari event
  const uniqueLocations = Array.from(
    new Set(events.map((e) => e.location))
  );

  const [expandedLocation, setExpandedLocation] = useState(null);

  const toggleLocation = (loc) => {
    setExpandedLocation(expandedLocation === loc ? null : loc);
  };

  if (!events || events.length === 0) {
    return <p className="p-4">Tidak ada lokasi tersedia.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <h1 className="text-xl font-semibold mb-4">Lokasi</h1>

      <ul className="max-w-3xl mx-auto space-y-4">
        {uniqueLocations.map((loc) => {
          // Cari event yang ada di lokasi ini
          const eventsInLocation = events.filter((e) => e.location === loc);

          const isOpen = expandedLocation === loc;

          return (
            <li
              key={loc}
              className="bg-white rounded-lg shadow p-4 cursor-pointer"
            >
              <div
                onClick={() => toggleLocation(loc)}
                className="flex items-center gap-3"
              >
                <MapPin className="text-red-600" size={24} />
                <h2 className="font-semibold text-lg flex-1">{loc}</h2>
                <button className="text-red-600 font-bold">
                  {isOpen ? "−" : "+"}
                </button>
              </div>

              {isOpen && (
                <ul className="mt-3 space-y-4 border-t pt-3">
                  {eventsInLocation.map((event) => (
                    <li
                      key={event.id}
                      className="bg-red-50 rounded p-4 text-sm"
                    >
                      <h3 className="font-semibold text-red-700">{event.title}</h3>
                      <p className="text-xs text-gray-700">
                        {event.date} • {event.time}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {event.description.length > 100
                          ? event.description.slice(0, 100) + "..."
                          : event.description}
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/event/${event.id}`)
                        }
                        className="mt-2 inline-block text-red-600 text-xs font-semibold underline"
                      >
                        See Details
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
