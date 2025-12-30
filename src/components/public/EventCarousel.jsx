import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard'; // Import ProductCard

// ============================================
// KOMPONEN: EventCarousel (Halaman Utama)
// ============================================
// Komponen ini menampilkan:
// 1. Carousel di atas (Today) - bisa digeser
// 2. Grid di bawah (Upcoming) - tampil beberapa card

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ========================================
  // DATA EVENTS - GANTI DENGAN DATA DARI BACKEND
  // ========================================
  const events = [
    {
      id: 1,
      title: "Opera Night",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800",
      day: "23",
      month: "AUG",
      time: "8:30 pm - 11:00 pm",
      distance: "Malioboro 2 km"
    },
    {
      id: 2,
      title: "Sendra Tari",
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800",
      day: "23",
      month: "AUG",
      time: "8:30 pm - 11:00 pm",
      distance: "Prambanan 15 km"
    },
    {
      id: 3,
      title: "Wayang Wong",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      day: "23",
      month: "AUG",
      time: "8:30 pm - 11:00 pm",
      distance: "TBY 5 km"
    },
    {
      id: 4,
      title: "Jazz Night Festival",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800",
      day: "25",
      month: "AUG",
      time: "7:00 pm - 10:00 pm",
      distance: "Jogja Expo 8 km"
    },
    {
      id: 5,
      title: "Contemporary Ballet",
      image: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800",
      day: "28",
      month: "AUG",
      time: "7:30 pm - 9:30 pm",
      distance: "Cultural Center 3 km"
    },
    {
      id: 6,
      title: "Rock Concert Live",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      day: "30",
      month: "AUG",
      time: "9:00 pm - 12:00 am",
      distance: "Stadium 12 km"
    }
  ];

  // ========================================
  // FUNCTIONS
  // ========================================
  
  // Function untuk pindah ke event lain
  const goToEvent = (index) => {
    if (index >= 0 && index < events.length) {
      setCurrentIndex(index);
    }
  };

  // Function saat tombol View/Plus diklik
  const handleViewClick = (event) => {
    console.log("View clicked:", event);
    // Tambahin logic navigasi ke detail page di sini
    // Contoh: navigate(`/event/${event.id}`)
    // Atau: setPage("eventDetail"); setSelectedEvent(event);
  };

  // ========================================
  // FILTER DATA
  // ========================================
  const currentEvent = events[currentIndex];
  const upcomingEvents = events.filter((_, idx) => idx !== currentIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-950">
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}
      <div className="bg-red-950 border-b border-red-800 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Event Ticketing</h1>
          <div className="flex items-center gap-6">
            <button className="text-sm font-semibold text-white hover:text-red-300 transition">
              Search
            </button>
            <button className="text-sm font-semibold text-white hover:text-red-300 transition">
              Login
            </button>
            <button className="text-sm font-semibold text-white hover:text-red-300 transition">
              Register
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* ========================================== */}
        {/* BAGIAN ATAS: TODAY (CAROUSEL - BISA DIGESER) */}
        {/* ========================================== */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Today</h2>
          
          <div className="relative flex items-center gap-4">
            {/* Tombol Kiri (Previous) */}
            <button
              onClick={() => goToEvent(currentIndex - 1)}
              disabled={currentIndex === 0}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                currentIndex === 0
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <ChevronLeft 
                className={currentIndex === 0 ? 'text-gray-400' : 'text-gray-700'} 
                size={24} 
              />
            </button>

            {/* Card Besar (Primary Card) */}
            <div className="flex-1">
              <ProductCard 
                event={currentEvent} 
                primary={true}
                onViewClick={handleViewClick}
              />
            </div>

            {/* Tombol Kanan (Next) */}
            <button
              onClick={() => goToEvent(currentIndex + 1)}
              disabled={currentIndex === events.length - 1}
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                currentIndex === events.length - 1
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <ChevronRight 
                className={currentIndex === events.length - 1 ? 'text-gray-400' : 'text-gray-700'} 
                size={24} 
              />
            </button>
          </div>

          {/* Dots Indicator (titik-titik di bawah) */}
          <div className="flex justify-center gap-2 mt-4">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToEvent(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* BAGIAN BAWAH: UPCOMING (GRID) */}
        {/* ========================================== */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Upcoming</h2>
          
          {/* Grid 2-3 kolom (responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <ProductCard 
                key={event.id}
                event={event}
                primary={false}
                onViewClick={handleViewClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}