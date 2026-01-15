import {
  Calendar,
  Users,
  Layers,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Ticket,
} from "lucide-react";
import { useEvents } from "../../../context/EventContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ================= HELPER ================= */
const parsePrice = (price = "0") =>
  Number(price.replace(/[^0-9]/g, ""));

export default function AdminDashboard() {
  const { events } = useEvents();

  /* ================= SUMMARY ================= */
  const totalEvent = events.length;

  const totalCapacity = events.reduce(
    (a, e) => a + Number(e.capacity || 0),
    0
  );

  const totalAttendees = events.reduce(
    (a, e) => a + Number(e.attendees || 0),
    0
  );

  const fullEvents = events.filter(
    (e) => Number(e.attendees) >= Number(e.capacity)
  ).length;

  const availableEvents = totalEvent - fullEvents;

  const totalRevenue = events.reduce(
    (a, e) =>
      a + parsePrice(e.price) * Number(e.attendees || 0),
    0
  );

  const getRegistrations = () =>
  JSON.parse(localStorage.getItem("registrations")) || [];

  const registrations = getRegistrations();

const totalTicketsSold = registrations.length;
const ticketsByEvent = events.map((e) => {
  const sold = registrations.filter(
    (r) => String(r.eventId) === String(e.id)
  ).length;

  return {
    ...e,
    ticketsSold: sold,
  };
});


  /* ================= CHART DATA ================= */
  const chartData = events.map((e) => ({
    name:
      e.title.length > 12
        ? e.title.slice(0, 12) + "…"
        : e.title,
    attendees: Number(e.attendees),
  }));

  return (
    <div className="space-y-8">
      {/* ================= TITLE ================= */}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
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
        <Card
          title="Event Available"
          value={availableEvents}
          icon={<CheckCircle />}
          color="bg-emerald-500"
        />
        <Card
          title="Event Full"
          value={fullEvents}
          icon={<AlertCircle />}
          color="bg-red-500"
        />
        <Card
          title="Total Revenue"
          value={`Rp ${totalRevenue.toLocaleString(
            "id-ID"
          )}`}
          icon={<DollarSign />}
          color="bg-yellow-500"
        />
        <Card
  title="Tickets Sold"
  value={totalTicketsSold}
  icon={<Ticket />}
  color="bg-indigo-500"
/>

      </div>

      {/* ================= CHART ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">
          Grafik Peserta per Event
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attendees"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Daftar Event</h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-center">Tanggal</th>
              <th className="p-3 text-center">Kapasitas</th>
              <th className="p-3 text-center">Peserta</th>
              <th className="p-3 text-center">Revenue</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="p-3 font-medium">
                  {e.title}
                </td>
                <td className="p-3 text-center">
                  {e.date}
                </td>
                <td className="p-3 text-center">
                  {e.capacity}
                </td>
                <td className="p-3 text-center">
                  {e.attendees}
                </td>

                {/* REVENUE */}
                <td className="p-3 text-center">
                  Rp{" "}
                  {(
                    parsePrice(e.price) *
                    Number(e.attendees)
                  ).toLocaleString("id-ID")}
                </td>

                {/* STATUS */}
                <td className="p-3 text-center">
                  {Number(e.attendees) >=
                  Number(e.capacity) ? (
                    <span className="text-red-600 font-semibold">
                      Full
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, value, icon, color, small }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      <div className={`${color} text-white p-3 rounded-lg`}>
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-gray-500 text-sm">{title}</p>

        <h2
          className={`font-bold break-words ${
            small ? "text-lg" : "text-2xl"
          }`}
        >
          {value}
        </h2>
      </div>
    </div>
  );
}