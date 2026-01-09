import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

// User pages
import Home from "./pages/components/Home";
import EventDetail from "./pages/components/EventDetail";
import Ticket from "./pages/Ticket";
import Profile from "./pages/Profile";

// Admin
import AdminLogin from "./auth/adminauth/AdminLogin";
import AdminLayout from "./components/admin/component/AdminLayout";
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import AdminEvents from "./components/admin/pages/AdminEvents";
import AdminCategories from "./components/admin/pages/AdminCategories";
import AdminRegistrations from "./components/admin/pages/AdminRegistrations";
import AdminUsers from "./components/admin/pages/AdminUsers";
import AdminReports from "./components/admin/pages/AdminReports";
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

  {/* LOGIN */}
  <Route path="/login" element={<AdminLogin />} />

  {/* ADMIN */}
  <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="events" element={<AdminEvents />} />
  <Route path="categories" element={<AdminCategories />} />
  <Route path="registrations" element={<AdminRegistrations />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="reports" element={<AdminReports />} />
  <Route path="settings" element={<AdminSettings />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="/admin/login" element={<AdminLogin />} />
</Route>
</Routes>


      {!isAdminPage && <Footer />}
    </>
  );
}
