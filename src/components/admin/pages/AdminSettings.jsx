import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [admins, setAdmins] = useState([
    { name: "Admin 1", email: "admin1@mail.com", password: "123456" },
    { name: "Admin 2", email: "admin2@mail.com", password: "123456" },
    { name: "Admin 3", email: "admin3@mail.com", password: "123456" },
  ]);

  const [toast, setToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admins");
    if (saved) setAdmins(JSON.parse(saved));
  }, []);

  const handleChange = (i, field, value) => {
    const updated = [...admins];
    updated[i][field] = value;
    setAdmins(updated);
  };

  const saveAdmins = () => {
    localStorage.setItem("admins", JSON.stringify(admins));
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Admin Team</h2>

        <div className="space-y-4">
          {admins.map((admin, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border"
            >
              <input
                value={admin.name}
                onChange={(e) =>
                  handleChange(i, "name", e.target.value)
                }
                className="border rounded px-3 py-2"
                placeholder="Nama"
              />

              <input
                value={admin.email}
                onChange={(e) =>
                  handleChange(i, "email", e.target.value)
                }
                className="border rounded px-3 py-2"
                placeholder="Email"
              />

              <input
                type="password"
                value={admin.password}
                onChange={(e) =>
                  handleChange(i, "password", e.target.value)
                }
                className="border rounded px-3 py-2"
                placeholder="Password"
              />
            </div>
          ))}
        </div>

        <button
          onClick={saveAdmins}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg animate-slideIn">
          ✅ Admin team & password tersimpan
        </div>
      )}
    </div>
  );
}