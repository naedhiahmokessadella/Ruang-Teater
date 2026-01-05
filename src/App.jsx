import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import History from "./pages/History";
import Location from "./pages/Location";
import EventDetail from "./pages/components/EventDetail";
import Ticket from "./pages/Ticket";
import Favorite from "./pages/components/Favorite";
import AdminLogin from "./auth/adminauth/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import Profile from "./pages/Profile";

// Components
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";

function App() {
  // 🔹 Tambahkan state search di App.jsx
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      {/* Pass state ke Navbar */}
      <Navbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <Routes>
        {/* USER */}
        <Route path="/" element={<Home searchQuery={searchInput} />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/history" element={<History />} />
        <Route path="/location" element={<Location />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        

        {/* PROFILE */}
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* fallback */}
        <Route path="*" element={<Home searchQuery={searchInput} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
