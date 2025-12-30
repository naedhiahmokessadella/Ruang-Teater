import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";

export default function Ticket({ setPage, eventData }) {
  const event = eventData || {
    title: "Beach Party",
    date: "23 August 2024",
    time: "8:30 pm",
    location: "Pantai Parangtritis",
    image: "/event1.jpeg",
    ticketId: "RT-92837465",
    seat: "A12",
    price: "Rp 100.000",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 text-sm mb-2"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 className="text-xl font-bold">E-Ticket</h1>
        </div>

        <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />

        <div className="p-5">
          <h2 className="font-bold text-lg">{event.title}</h2>
          <p className="text-xs text-gray-500 mb-4">Ticket ID: {event.ticketId}</p>

          <div className="space-y-2 text-sm">
            <Row icon={<Calendar size={14} />} text={event.date} />
            <Row icon={<Clock size={14} />} text={event.time} />
            <Row icon={<MapPin size={14} />} text={event.location} />
          </div>

          <div className="flex justify-between mt-4 font-semibold text-sm">
            <span>Seat</span>
            <span>{event.seat}</span>
          </div>
          <div className="flex justify-between font-semibold text-sm">
            <span>Price</span>
            <span>{event.price}</span>
          </div>
        </div>

        <div className="border-t border-dashed p-6 flex flex-col items-center">
          <img src="/barcode.png" alt="barcode" className="h-16 mb-2" />
          <p className="text-xs text-gray-500">
            Show this barcode at the entrance
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}