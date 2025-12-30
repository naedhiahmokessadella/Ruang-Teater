import { Bell, Search } from "lucide-react";

export default function Navbar({ setPage, searchInput, setSearchInput, setSearchQuery }) {

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput); // 🔥 Jalankan pencarian saat Enter
      setPage("home"); // tetap di home
    }
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
      {/* Logo */}
      <h1
        onClick={() => setPage("home")}
        className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      >
        Events
      </h1>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Cari tiket..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown} // 🔥 Enter trigger search
            className="bg-transparent outline-none text-sm w-40"
          />
        </div>

        {/* Admin */}
        <button
          onClick={() => setPage("login")}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Admin
        </button>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar */}
        <img
          src="/events/profil.jpeg"
          alt="User"
          className="w-9 h-9 rounded-full object-cover cursor-pointer"
        />
      </div>
    </nav>
  );
}