import { Plus } from "lucide-react";

export default function ProductCard({
  event,
  primary,
  isFavorite,
  onToggleFavorite,
  setPage,
  setSelectedEvent,
}) {
  const handleViewClick = () => {
    console.log("View clicked!", event); // Debug log
    console.log("setPage:", setPage); // Debug log
    console.log("setSelectedEvent:", setSelectedEvent); // Debug log
    
    if (setSelectedEvent && setPage) {
      setSelectedEvent(event);
      setPage("eventDetail");
    } else {
      console.error("setPage or setSelectedEvent is missing!");
    }
  };

  const handlePlusClick = () => {
    console.log("Plus clicked!", event); // Debug log
    
    if (setSelectedEvent && setPage) {
      setSelectedEvent(event);
      setPage("eventDetail");
    } else {
      console.error("setPage or setSelectedEvent is missing!");
    }
  };

  if (primary) {
    return (
      <div className="relative bg-amber-50 rounded-2xl shadow-lg overflow-hidden mb-4">
        <div className="relative h-64">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />

          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-amber-50 rounded-lg px-3 py-2 shadow-md border border-amber-200">
            <p className="text-2xl font-bold text-red-900">{event.day}</p>
            <p className="text-xs text-red-800 uppercase">{event.month}</p>
          </div>

          {/* Plus Button */}
          <button
            onClick={handlePlusClick}
            className="absolute top-4 right-4 bg-red-800 hover:bg-red-900 text-amber-50 p-3 rounded-full shadow-lg transition z-20"
            type="button"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-red-950 mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-red-800 mb-3">{event.time}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-red-600 mr-1">📍</span>
              <span>{event.distance}</span>
            </div>
            <button
              onClick={handleViewClick}
              className="px-6 py-2.5 border-2 border-red-800 text-red-800 font-semibold rounded-lg hover:bg-red-800 hover:text-amber-50 transition z-20"
              type="button"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-stone-200">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-amber-50 rounded-lg px-3 py-2 shadow-md border border-amber-200">
          <p className="text-2xl font-bold text-red-900">{event.day}</p>
          <p className="text-xs text-red-800 uppercase">{event.month}</p>
        </div>

        {/* Plus Button */}
        <button
          onClick={handlePlusClick}
          className="absolute top-4 right-4 bg-red-800 hover:bg-red-900 text-amber-50 p-2 rounded-full shadow-lg transition z-20 border border-red-700"
          type="button"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-red-950 mb-2 hover:text-red-800 transition cursor-pointer">
          {event.title}
        </h3>

        <p className="text-sm text-red-800 mb-3">{event.time}</p>

        <div className="flex items-center text-sm text-red-700 mb-4">
          <span className="text-red-600 mr-1">📍</span>
          <span>{event.distance}</span>
        </div>

        {/* View Button */}
        <button
          onClick={handleViewClick}
          className="w-full py-2.5 border-2 border-red-800 text-red-800 font-semibold rounded-lg hover:bg-red-800 hover:text-amber-50 transition z-20"
          type="button"
        >
          View
        </button>
      </div>
    </div>
  );
}