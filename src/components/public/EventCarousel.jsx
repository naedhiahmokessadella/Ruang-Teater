import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "../../context/EventContext";
import ProductCard from "./ProductCard";

export default function EventCarousel() {
  const { events, loading } = useEvents();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!events.length) return <p className="text-white">No events</p>;

  const next = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, events.length - 1));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const upcomingEvents = events.filter((_, i) => i !== currentIndex);

  return (
    <div className="bg-gradient-to-br from-red-900 to-red-950 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <h2 className="text-2xl font-bold text-white mb-4">Today</h2>

        <div className="flex items-center gap-3 mb-8">
          <button onClick={prev} disabled={currentIndex === 0}>
            <ChevronLeft className="text-white" />
          </button>

          <div className="flex-1">
            <ProductCard event={events[currentIndex]} />
          </div>

          <button
            onClick={next}
            disabled={currentIndex === events.length - 1}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Upcoming
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {upcomingEvents.map((event) => (
            <ProductCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
