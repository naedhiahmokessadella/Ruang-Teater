import { Home, Receipt, MapPin } from "lucide-react";

export default function Footer({ setPage, activePage }) {
  const buttonClass = (p) =>
    `flex flex-col items-center text-xs ${
      activePage === p ? "text-blue-600" : "text-gray-500"
    }`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow">
      <div className="flex justify-around py-2">
        <button className={buttonClass("home")} onClick={() => setPage("home")}>
          <Home size={22} />
          <span>Beranda</span>
        </button>

        <button className={buttonClass("Favorite")} onClick={() => setPage("Favorite")}>
          <Receipt size={22} />
          <span>Favorit</span>
        </button>

        <button className={buttonClass("Location")} onClick={() => setPage("Location")}>
          <Receipt size={22} />
          <span>Lokasi</span>
        </button>

        <button className={buttonClass("History")} onClick={() => setPage("History")}>
          <MapPin size={22} />
          <span>Riwayat</span>
        </button>
      </div>
    </footer>
  );
}