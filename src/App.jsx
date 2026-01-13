import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

// User pages
import Home from "./pages/components/Home";
import EventDetail from "./pages/components/EventDetail";
import Ticket from "./pages/Ticket";
import Profile from "./pages/Profile";
import Payment from "./pages/components/Payment";

// Admin
import AdminLogin from "./auth/adminauth/AdminLogin";
import AdminLayout from "./components/admin/component/AdminLayout";
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import AdminEvents from "./components/admin/pages/AdminEvents";
import AdminUsers from "./components/admin/pages/AdminUsers";
import AdminSettings from "./components/admin/pages/AdminSettings";

// Components
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
      {!isAdminPage && (
        <Navbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      )}

      <Routes>
        {/* USER */}
        <Route path="/" element={<Home searchQuery={searchInput} />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment/:id" element={<Payment />} />

        {/* LOGIN */}
        <Route path="/login" element={<AdminLogin />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="payment/:id" element={<Payment />} />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}
