import { useEvents } from "../../../context/EventContext";

export default function AdminReports() {
  const { events } = useEvents();

  const totalEvents = events.length;
  const totalCapacity = events.reduce((a, e) => a + Number(e.capacity), 0);
  const totalAttendees = events.reduce((a, e) => a + Number(e.attendees), 0);
  const fullEvents = events.filter(
    (e) => e.attendees >= e.capacity
  ).length;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Reports Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ReportCard label="Total Events" value={totalEvents} />
        <ReportCard label="Total Capacity" value={totalCapacity} />
        <ReportCard label="Total Attendees" value={totalAttendees} />
        <ReportCard label="Full Events" value={fullEvents} />
      </div>
    </div>
  );
}

function ReportCard({ label, value }) {
  return (
    <div className="p-4 border rounded text-center">
      <p className="text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
