import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/public/Footer";
import ProductCard from "../../components/public/ProductCard";
import { useEvents } from "../../context/EventContext";
import {
  Sparkles,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function Home({ searchQuery }) {
  const { events, loading } = useEvents();
  const [favorites, setFavorites] = useState([]);
  const [voucherClaimed, setVoucherClaimed] = useState(false);
  const navigate = useNavigate();

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading events...</p>
      </div>
    );
  }

  // 🔍 FILTER EVENTS BERDASARKAN SEARCH
  const filteredEvents = events.filter((event) =>
    (event.title || "")
      .toLowerCase()
      .includes((searchQuery || "").toLowerCase())
  );

  // ⭐ Toggle favorite
  const toggleFavorite = (event) => {
    setFavorites((prev) =>
      prev.some((e) => e.id === event.id)
        ? prev.filter((e) => e.id !== event.id)
        : [...prev, event]
    );
  };

  // 🎟️ Voucher
  const handleClaimVoucher = () => {
    setVoucherClaimed(true);
    alert("🎉 Voucher FIRST20 berhasil diklaim!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-800 to-pink-950" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img
            src="/ruang-teater.jpg"
            alt="Ruang Teater Logo"
            className="w-96 h-96 object-contain"
          />
        </div>

        <div className="relative px-5 py-12 text-white z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={24} className="text-yellow-300" />
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
              What's Hot
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-3">RUANG TEATER</h1>
          <p className="text-blue-100 text-lg mb-6">Pilih Teater Favorite</p>

          <div className="grid grid-cols-3 gap-3 max-w-md">
            <Stat icon={<Calendar size={20} />} label="Events" value="150+" />
            <Stat icon={<MapPin size={20} />} label="Locations" value="25+" />
            <Stat icon={<Star size={20} />} label="Rating" value="4.8" />
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="pb-24">
        {/* FEATURED */}
        <section className="px-5 mb-10 mt-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="text-red-500" size={20} />
              <span className="text-red-500 font-bold text-sm">
                HAPPENING NOW
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Event
            </h2>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 snap-x snap-mandatory pb-6">
              {filteredEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="min-w-[90%] snap-center">
                  <ProductCard
                    event={event}
                    primary
                    isFavorite={favorites.some((e) => e.id === event.id)}
                    onToggleFavorite={() => toggleFavorite(event)}
                    setPage={(page) => navigate(`/${page}`)}
                    setSelectedEvent={(ev) =>
                      navigate(`/event/${ev.id}`)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UPCOMING */}
        <section className="px-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-purple-600" size={18} />
            <span className="text-purple-600 font-semibold text-sm">
              COMING SOON
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upcoming Events
          </h2>

          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Event tidak ditemukan 😢
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <ProductCard
                  key={event.id}
                  event={event}
                  isFavorite={favorites.some((e) => e.id === event.id)}
                  onToggleFavorite={() => toggleFavorite(event)}
                  setPage={(page) => navigate(`/${page}`)}
                  setSelectedEvent={(ev) =>
                    navigate(`/event/${ev.id}`)
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* PROMO */}
        <section className="px-5 mt-10">
          <div className="relative bg-gradient-to-r from-red-800 to-red-900 rounded-3xl p-6 text-white shadow-xl border-2 border-amber-600">
            <h3 className="text-xl font-bold mb-2">
              🎟️ Get 20% Off First Ticket!
            </h3>
            <p className="text-sm mb-4 text-amber-100">
              Use code{" "}
              <b className="text-amber-300">FIRST20</b> at checkout
            </p>

            <button
              onClick={handleClaimVoucher}
              disabled={voucherClaimed}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                voucherClaimed
                  ? "bg-stone-400 text-stone-600 cursor-not-allowed"
                  : "bg-amber-100 text-red-900 hover:scale-105"
              }`}
            >
              {voucherClaimed
                ? "Voucher Claimed ✅"
                : "Claim Now →"}
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer setPage={(page) => navigate(`/${page}`)} activePage="home" />
      <div className="bg-red-950 text-amber-100 py-8 text-center border-t-4 border-amber-600">
        © 2024 Ruang Teater
      </div>
    </div>
  );
}

/* STAT */
function Stat({ icon, label, value }) {
  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
      <div className="mb-2 text-yellow-300">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-blue-100">{label}</p>
    </div>
  );
}
