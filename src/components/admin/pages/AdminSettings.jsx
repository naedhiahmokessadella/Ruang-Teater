export default function AdminSettings() {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>

      <div className="space-y-4">
        <input
          className="w-full border rounded p-2"
          defaultValue="Admin"
          placeholder="Admin Name"
        />
        <input
          className="w-full border rounded p-2"
          defaultValue="admin@mail.com"
          placeholder="Email"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}
