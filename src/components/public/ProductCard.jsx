import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ event, primary }) {
  const navigate = useNavigate();

  // 🔐 SAFE GUARD (ANTI UNDEFINED)
  if (!event) return null;

  const {
    id,
    image,
    title,
    time,
    date,
    location,
  } = event;

  // fallback tanggal (kalau API belum punya day & month)
  const eventDate = date ? new Date(date) : null;
  const day = eventDate ? eventDate.getDate() : "--";
  const month = eventDate
    ? eventDate.toLocaleString("id-ID", { month: "short" }).toUpperCase()
    : "---";

  const goToDetail = () => {
    navigate(`/event/${id}`);
  };

  /* ================= PRIMARY CARD ================= */
  if (primary) {
    return (
      <div className="relative bg-amber-50 rounded-2xl shadow-lg overflow-hidden mb-4">
        <div className="relative h-64">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* DATE BADGE */}
          <div className="absolute top-4 left-4 bg-amber-50 rounded-lg px-3 py-2 shadow-md">
            <p className="text-2xl font-bold text-red-900">{day}</p>
            <p className="text-xs text-red-800 uppercase">{month}</p>
          </div>

          <button
            onClick={goToDetail}
            className="absolute top-4 right-4 bg-red-800 hover:bg-red-900 text-white p-3 rounded-full z-20"
            type="button"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-red-950 mb-2">
            {title}
          </h3>

          <p className="text-sm text-red-800 mb-3">
            {time || "Waktu belum tersedia"}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-red-700">
              📍 {location || "Lokasi belum tersedia"}
            </span>

            <button
              onClick={goToDetail}
              className="px-6 py-2.5 border-2 border-red-800 text-red-800 font-semibold rounded-lg hover:bg-red-800 hover:text-white z-20"
              type="button"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= NORMAL CARD ================= */
  return (
    <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl shadow-lg overflow-hidden border border-stone-200">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        <button
          onClick={goToDetail}
          className="absolute top-4 right-4 bg-red-800 text-white p-2 rounded-full z-20"
          type="button"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-red-950 mb-2">
          {title}
        </h3>

        <p className="text-sm text-red-800 mb-3">
          {time || "Waktu belum tersedia"}
        </p>

        <button
          onClick={goToDetail}
          className="w-full py-2.5 border-2 border-red-800 text-red-800 font-semibold rounded-lg hover:bg-red-800 hover:text-white"
          type="button"
        >
          View
        </button>
      </div>
    </div>
  );
}
