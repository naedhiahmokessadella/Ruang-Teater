import { useEffect, useState } from "react";
import { Users, Eye } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const map = {};

    registrations.forEach((r) => {
      if (!map[r.email]) {
        map[r.email] = {
          name: r.name,
          email: r.email,
          phone: r.phone,
          firstRegister: r.registeredAt,
          tickets: 0,
          events: new Set(),
          status: "Active",
        };
      }

      map[r.email].tickets += 1;
      map[r.email].events.add(r.eventTitle);
    });

    const result = Object.values(map).map((u) => ({
      ...u,
      events: Array.from(u.events),
    }));

    setUsers(result);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-blue-600" />
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Tickets</th>
              <th className="p-3 text-left">Events</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.phone}</p>
                </td>

                <td className="p-3">{u.email}</td>

                <td className="p-3 text-center font-bold text-blue-600">
                  {u.tickets}
                </td>

                <td className="p-3">
                  {u.events.slice(0, 2).join(", ")}
                  {u.events.length > 2 && " ..."}
                </td>

                <td className="p-3 text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    {u.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            Belum ada user yang membeli tiket
          </p>
        )}
      </div>
    </div>
  );
}
