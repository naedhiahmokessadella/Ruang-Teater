import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Favorite</h1>
        <p>Belum ada event favorit</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      <h1 className="text-xl font-bold mb-4">Favorite</h1>

      {/* GRID FAVORITE (KOTAK & PENUH) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/event/${event.id}`)}
            className="bg-white rounded-xl shadow-sm cursor-pointer
                       hover:shadow-md transition overflow-hidden"
          >
            {/* GAMBAR PERSEGI */}
            <div className="aspect-square w-full">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <div className="p-3">
              <h3 className="text-sm font-semibold line-clamp-2">
                {event.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}