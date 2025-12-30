import { useState } from "react";

import Home from "./pages/Home";
import History from "./pages/History";
import Location from "./pages/Location";
import EventDetail from "./pages/EventDetail";
import Ticket from "./pages/Ticket";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/public/Navbar";

function App() {
  const [page, setPage] = useState("home");
  console.log("PAGE SEKARANG:", page);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* 🔒 Navbar hanya tampil di halaman user */}
      {page !== "login" && page !== "admin" && (
        <Navbar
          setPage={setPage}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchQuery={setSearchQuery}
        />
      )}

      {/* ===== USER PAGES ===== */}
      {page === "home" && (
        <Home
          setPage={setPage}
          setSelectedEvent={setSelectedEvent}
          searchQuery={searchQuery}
        />
      )}

      {page === "history" && <History setPage={setPage} />}
      {page === "location" && <Location setPage={setPage} />}

      {page === "eventDetail" && (
        <EventDetail setPage={setPage} eventData={selectedEvent} />
      )}

      {page === "ticket" && (
        <Ticket setPage={setPage} eventData={selectedEvent} />
      )}

      {/* ===== ADMIN ===== */}
      {page === "login" && <AdminLogin setPage={setPage} />}
      {page === "admin" && <AdminDashboard setPage={setPage} />}
    </>
  );
}

export default App;
