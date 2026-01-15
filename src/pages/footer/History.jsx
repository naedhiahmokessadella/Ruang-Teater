import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    setHistory(stored);
  }, []);

  if (!history || history.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-lg font-semibold mb-4">Purchase History</h1>
        <p className="text-gray-500 text-sm">Belum ada riwayat pembelian.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-lg font-semibold mb-4">Purchase History</h1>

      <ul className="space-y-4">
        {history.map((item, index) => (
          <li
            key={index}
            className="bg-white rounded-xl shadow p-4 cursor-pointer"
            onClick={() => navigate(`/event/${item.id}`)}
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-red-700">{item.title}</h2>
                <p className="text-xs text-gray-500">
                  {item.date} • {item.time}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Purchased at: {new Date(item.purchasedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
