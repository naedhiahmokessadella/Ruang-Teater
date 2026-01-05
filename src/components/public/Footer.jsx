import { Home, Receipt, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // samakan SEMUA ke lowercase
  const pathToPage = (path) => {
    switch (path) {
      case "/": return "home";
      case "/favorite": return "favorite";
      case "/location": return "location";
      case "/history": return "history";
      default: return "";
    }
  };

  const activePage = pathToPage(location.pathname);

  const buttonClass = (p) =>
    `flex flex-col items-center text-xs ${
      activePage === p ? "text-blue-600 font-bold" : "text-gray-500"
    }`;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
      <div className="flex justify-around py-2">

        <button
          className={buttonClass("home")}
          onClick={() => navigate("/")}
        >
          <Home size={22} />
          <span>Beranda</span>
        </button>

        <button
          className={buttonClass("favorite")}
          onClick={() => navigate("/favorite")}
        >
          <Receipt size={22} />
          <span>Favorit</span>
        </button>

        <button
          className={buttonClass("location")}
          onClick={() => navigate("/location")}
        >
          <Receipt size={22} />
          <span>Lokasi</span>
        </button>

        <button
          className={buttonClass("history")}
          onClick={() => navigate("/history")}
        >
          <MapPin size={22} />
          <span>Riwayat</span>
        </button>

      </div>
    </footer>
  );
}
