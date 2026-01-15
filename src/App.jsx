import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Public pages
import Home from "./pages/footer/Home";
import History from "./pages/footer/History";
import Location from "./pages/footer/Location";
import Favorite from "./pages/footer/Favorite";
import EventDetail from "./pages/components/EventDetail";
import Payment from "./pages/components/Payment";
import Ticket from "./pages/components/Ticket";
import Profile from "./pages/Profile";

// Admin
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import AdminLayout from "./components/admin/component/AdminLayout";
import AdminEvents from "./components/admin/pages/AdminEvents";
import AdminUsers from "./components/admin/pages/AdminUsers";
import AdminSettings from "./components/admin/pages/AdminSettings";
import AdminLogin from "./auth/adminauth/AdminLogin";

// Components
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";

function App() {
  const [stage, setStage] = useState("curtain");
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  useEffect(() => {
    const curtainTimer = setTimeout(() => setStage("logo"), 3000);
    const logoTimer = setTimeout(() => setStage("main"), 5000);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  // Curtain animation
  if (stage === "curtain") {
    return (
      <>
        <div className="fixed top-0 left-0 h-full bg-purple-900 animate-curtain-left z-50" />
        <div className="fixed top-0 right-0 h-full bg-purple-900 animate-curtain-right z-50" />
      </>
    );
  }

  // Splash logo
  if (stage === "logo") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <img
          src="/src/LogoTeater.png"
          alt="Ruang Teater Logo"
          className="w-72 h-72 object-contain"
        />
      </div>
    );
  }

  const showNavbar = location.pathname === "/";
  const showFooter = ["/", "/favorite", "/location", "/history"].includes(
    location.pathname
  );

  return (
    <>
      {showNavbar && (
        <Navbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      )}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home searchQuery={searchInput} />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/history" element={<History />} />
        <Route path="/location" element={<Location />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Home searchQuery={searchInput} />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

export default App;
