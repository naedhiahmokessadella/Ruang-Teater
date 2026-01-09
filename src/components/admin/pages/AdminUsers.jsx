import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];

    // Ambil user unik berdasarkan email
    const uniqueUsers = [];
    const emailSet = new Set();

    registrations.forEach((r) => {
      if (!emailSet.has(r.email)) {
        emailSet.add(r.email);
        uniqueUsers.push({
          name: r.name,
          email: r.email,
          phone: r.phone,
          firstRegister: r.registeredAt,
        });
      }
    });

    setUsers(uniqueUsers);
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-blue-600" />
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        {users.length === 0 ? (
          <p className="text-gray-500">
            Belum ada user yang mendaftar
          </p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">No HP</th>
                  <th className="p-3 text-left">Terdaftar Sejak</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3 font-medium">
                      {u.name}
                    </td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.phone}</td>
                    <td className="p-3">
                      {new Date(
                        u.firstRegister
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
