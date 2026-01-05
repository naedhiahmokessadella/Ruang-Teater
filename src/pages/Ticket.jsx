import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import useDummyData from "../hooks/useDummyData";

export default function Ticket() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { events } = useDummyData();

  const event =
    location.state ||
    events.find((e) => e.id === Number(id)) || {
      title: "Event Not Found",
      date: "-",
      time: "-",
      location: "-",
      image: "https://via.placeholder.com/600x400",
      price: "-",
    };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-900 to-red-600 p-4 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-2"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-xl font-bold">E-Ticket</h1>
        </div>

        {/* IMAGE */}
        <img
          src={event.image}
          alt={event.title}
          className="h-40 w-full object-cover"
        />

        {/* CONTENT */}
        <div className="p-5">
          <h2 className="font-bold text-lg">{event.title}</h2>
          <p className="text-xs text-gray-500 mb-4">
            Ticket ID: RT-{event.id}X{Math.floor(Math.random() * 9999)}
          </p>

          <div className="space-y-2 text-sm">
            <Row icon={<Calendar size={14} />} text={event.date} />
            <Row icon={<Clock size={14} />} text={event.time} />
            <Row icon={<MapPin size={14} />} text={event.location} />
          </div>

          <div className="flex justify-between mt-4 font-semibold text-sm">
            <span>Seat</span>
            <span>A{event.id}</span>
          </div>
          <div className="flex justify-between font-semibold text-sm">
            <span>Price</span>
            <span>{event.price}</span>
          </div>
        </div>

        {/* BARCODE */}
        <div className="border-t border-dashed p-6 flex flex-col items-center">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RUANG-TEATER"
            alt="barcode"
            className="h-20 mb-2"
          />
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