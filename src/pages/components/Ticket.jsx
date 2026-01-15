import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useEvents } from "../../context/EventContext";

export default function Ticket() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { events } = useEvents();

  const event =
    location.state ||
    events.find((e) => String(e.id) === String(id));

  if (!event) {
    return <p className="p-4">Ticket tidak ditemukan</p>;
  }

  // DATA UNTUK QR / BARCODE
  const barcodeData = JSON.stringify({
    ticketId: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
  });

  const barcodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    barcodeData
  )}`;

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-xs mx-auto text-sm">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-900 to-red-600 px-4 py-3 text-white rounded-t-2xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs mb-1"
          >
            <ArrowLeft size={14} /> Kembali
          </button>
          <h1 className="text-lg font-semibold">E-Ticket</h1>
        </div>

        {/* IMAGE */}
        <img
          src={event.image}
          alt={event.title}
          className="h-36 w-full object-cover"
        />

        {/* INFO */}
        <div className="px-4 py-3">
          <h2 className="font-semibold">{event.title}</h2>

          <div className="space-y-1 text-xs mt-2">
            <Row icon={<Calendar size={12} />} text={event.date} />
            <Row icon={<Clock size={12} />} text={event.time} />
            <Row icon={<MapPin size={12} />} text={event.location} />
          </div>
        </div>

        {/* BARCODE SECTION */}
        <div className="px-4 pb-5">
          <div className="border-t pt-4 flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-3">
              Scan QR Code saat masuk
            </p>

            <img
              src={barcodeUrl}
              alt="Ticket QR Code"
              className="w-44 h-44"
            />

            <p className="text-[10px] text-gray-400 mt-3">
              Ticket ID: #{event.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span>{text}</span>
    </div>
  );
}
