import { Calendar, Users, Layers } from "lucide-react";
import { useEvents } from "../../../context/EventContext";

export default function AdminDashboard() {
  const { events } = useEvents();

  const totalEvent = events.length;
  const totalCapacity = events.reduce(
    (a, e) => a + Number(e.capacity || 0),
    0
  );
  const totalAttendees = events.reduce(
    (a, e) => a + Number(e.attendees || 0),
    0
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Total Event"
          value={totalEvent}
          icon={<Calendar />}
          color="bg-blue-500"
        />
        <Card
          title="Total Kapasitas"
          value={totalCapacity}
          icon={<Layers />}
          color="bg-green-500"
        />
        <Card
          title="Total Peserta"
          value={totalAttendees}
          icon={<Users />}
          color="bg-purple-500"
        />
      </div>
    </>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className={`${color} text-white p-3 rounded-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
