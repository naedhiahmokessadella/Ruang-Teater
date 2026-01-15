import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ event, primary = false }) {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl shadow border bg-white">
      <div className="relative h-44">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => navigate(`/event/${event.id}`)}
          className="absolute top-3 right-3 bg-red-800 text-white p-2 rounded-full"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.time}</p>

        <button
          onClick={() => navigate(`/event/${event.id}`)}
          className="w-full mt-3 border border-red-800 text-red-800 rounded py-2"
        >
          View
        </button>
      </div>
    </div>
  );
}
