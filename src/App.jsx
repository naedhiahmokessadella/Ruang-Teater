import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// ===== USER PAGES =====
import Home from "./pages/Home";
import History from "./pages/History";
import Location from "./pages/Location";
import EventDetail from "./pages/components/EventDetail";
import Ticket from "./pages/Ticket";
import Favorite from "./pages/components/Favorite";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

// ===== AUTH =====
import UserLogin from "./auth/userauth/userlogin";
import SignupUser from "./auth/userauth/SignupUser";
import AdminLogin from "./auth/adminauth/AdminLogin";

// ===== ADMIN =====
import AdminDashboard from "./components/admin/AdminDashboard";

// ===== COMPONENTS =====
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";

function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Routes>
      {/* ================= HOME (PAKAI NAVBAR) ================= */}
      <Route
        path="/"
        element={
          <>
            <Navbar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
            <Home searchQuery={searchInput} />
            <Footer />
          </>
        }
      />

      {/* ================= USER PAGES (NO NAVBAR) ================= */}
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/history" element={<History />} />
      <Route path="/location" element={<Location />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/ticket/:id" element={<Ticket />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<EditProfile />} />

      {/* ================= AUTH (NO NAVBAR) ================= */}
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/signup" element={<SignupUser />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Home searchQuery={searchInput} />} />
    </Routes>
  );
}

export default App;
