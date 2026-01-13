import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [admins, setAdmins] = useState([]);
  const [toast, setToast] = useState(false);

  // 🔑 INIT / LOAD ADMIN
  useEffect(() => {
    const saved = localStorage.getItem("admins");

    if (saved) {
      setAdmins(JSON.parse(saved));
    } else {
      const defaultAdmins = [
        { name: "Admin 1", email: "admin1@mail.com", password: "123456" },
        { name: "Admin 2", email: "admin2@mail.com", password: "123456" },
        { name: "Admin 3", email: "admin3@mail.com", password: "123456" },
      ];
      localStorage.setItem("admins", JSON.stringify(defaultAdmins));
      setAdmins(defaultAdmins);
    }
  }, []);

  // ✏️ UPDATE NAME ONLY
  const handleChange = (i, value) => {
    const updated = [...admins];
    updated[i].name = value;
    setAdmins(updated);
  };

  // 💾 SAVE
  const saveAdmins = () => {
    localStorage.setItem("admins", JSON.stringify(admins));
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  // 🔥 RESET ADMIN (ANTI ERROR)
  const resetAdmins = () => {
    localStorage.removeItem("admins");
    localStorage.removeItem("adminLogged");
    window.location.reload();
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
              {/* NAME (EDITABLE) */}
              <input
                value={admin.name}
                onChange={(e) => handleChange(i, e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="Nama"
              />

              {/* EMAIL (LOCKED) */}
              <input
                value={admin.email}
                disabled
                className="border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />

              {/* PASSWORD (LOCKED) */}
              <input
                type="password"
                value={admin.password}
                disabled
                className="border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveAdmins}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>

          <button
            onClick={resetAdmins}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Reset Admin
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg animate-slideIn">
          ✅ Admin tersimpan
        </div>
      )}
    </div>
  );
}
