import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(stored);
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Hapus pendaftaran ini?")) return;

    const updated = registrations.filter((r) => r.id !== id);
    setRegistrations(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Event Registrations
      </h1>

      {registrations.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          Belum ada pendaftaran
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">No HP</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((r) => (
                <tr
                  key={r.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-semibold">
                    {r.eventTitle}
                  </td>
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">
                    {new Date(r.registeredAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
