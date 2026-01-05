import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ pakai navigate
import { useEvents } from "../../context/EventContext";
import AdminHeader from "./component/AdminHeader";
import { Plus, X } from "lucide-react";

export default function AdminDashboard() {
  const { events, setEvents } = useEvents();
  const navigate = useNavigate(); // ✅ navigasi react router

  const [showForm, setShowForm] = useState(false);

  // State untuk form
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    capacity: "",
    attendees: 0,
    description: "",
    image: ""
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.location || !formData.capacity) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    const newEvent = {
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
      title: formData.title,
      date: formData.date,
      location: formData.location,
      capacity: parseInt(formData.capacity),
      attendees: parseInt(formData.attendees) || 0,
      description: formData.description,
      image: formData.image || `https://picsum.photos/400/300?random=${Date.now()}`
    };

    setEvents([...events, newEvent]);

    setFormData({
      title: "",
      date: "",
      location: "",
      capacity: "",
      attendees: 0,
      description: "",
      image: ""
    });
    setShowForm(false);

    alert("Event berhasil ditambahkan!");
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      title: "",
      date: "",
      location: "",
      capacity: "",
      attendees: 0,
      description: "",
      image: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Admin dengan tombol Logout */}
      <AdminHeader setPage={() => navigate("/login")} /> {/* ✅ navigasi ke login */}

      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Tambah Event
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Tambah Event Baru</h2>
                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Semua input sama seperti sebelumnya */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Judul Event <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Masukkan judul event"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Lokasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Masukkan lokasi event"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Kapasitas <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Masukkan kapasitas peserta"
                    min="1"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Jumlah Peserta Saat Ini
                  </label>
                  <input
                    type="number"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Deskripsi</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Masukkan deskripsi event"
                    rows="4"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">URL Gambar</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg (opsional)"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kosongkan untuk menggunakan gambar default
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                  >
                    Simpan Event
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 font-semibold"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabel Event */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Event Management</h2>

          {events && events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left bg-gray-50">
                    <th className="p-3">Event</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3">Attendees</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{event.title}</td>
                      <td className="p-3">{event.date}</td>
                      <td className="p-3">{event.location}</td>
                      <td className="p-3">{event.capacity}</td>
                      <td className="p-3">{event.attendees || 0}</td>
                      <td className="p-3">
                        {(event.attendees || 0) >= event.capacity ? (
                          <span className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-full text-sm">
                            Full
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
                            Available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Tidak ada event tersedia</p>
          )}
        </div>
      </div>
    </div>
  );
}
