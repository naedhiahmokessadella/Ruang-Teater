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

      <div className="space-y-4">
        {favorites.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/event/${event.id}`)}
            className="bg-white shadow rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
