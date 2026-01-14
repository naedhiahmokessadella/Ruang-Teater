import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";

// Daftar metode pembayaran
const paymentOptions = [
  { id: "WhatsApp", label: "WhatsApp", icons: ["WhatsApp"] },
  { id: "mbanking", label: "M-Banking", icons: ["BCA", "Mandiri", "BRI", "BNI"] },
  { id: "Qris", label: "QRIS", icons: ["QRIS"] },
  { id: "Dana", label: "Dana", icons: ["Dana"] },
  { id: "Gopay", label: "GoPay", icons: ["GoPay"] },
  { id: "Card", label: "Credit / Debit Card", icons: ["Visa", "MasterCard", "Amex"] },
];

// Komponen logo pembayaran
function PaymentIcon({ name }) {
  const logos = {
    WhatsApp: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    BCA: "https://png.pngtree.com/png-clipart/20221224/original/pngtree-bca-bank-logo-png-image_8801637.png",
    Mandiri: "https://tse4.mm.bing.net/th/id/OIP.L2HwHrcAI66hMbOuhvYH-wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    BRI: "https://www.freelogovectors.net/wp-content/uploads/2023/02/bri-logo-freelogovectors.net_.png",
    BNI: "https://i.pinimg.com/originals/36/38/43/36384348ef9d7bfff66da6da9e975d56.png",
    QRIS: "https://tse3.mm.bing.net/th/id/OIP.ygl20QGpbbgcG39FVM3AQQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    Dana: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipDaD-39vGN38RrBmUjfY5jz9yDK2SdbcuFd20a4b0t1Vkb97hlXQFHE1Tic8ys4Kwa0eghASHcp7OjgcGibXZ5qiiY6_gSKs8RwGkxymcUmdzQtdZ2eKe2SswYtrEPBSM9DQjD3_eeB84ZE_b2WiTTbZGkTIGT516Rdie-i2tP7Jm8RsGcadsPQ/s2482/Logo%20DANA%20-%20%20(Koleksilogo.com).png",
    GoPay: "https://tse4.mm.bing.net/th/id/OIP.m-xQNMYA7kSueKShKmQ7OwHaHk?rs=1&pid=ImgDetMain&o=7&rm=3",
    Visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    MasterCard: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    Amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/Amex_logo.svg",
  };

  return (
    <img
      src={logos[name]}
      alt={name}
      title={name}
      className="w-9 h-9 rounded-full object-contain bg-white p-1 shadow-sm"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://via.placeholder.com/36?text=?";
      }}
    />
  );
}

// Komponen utama Payment
export default function Payment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const event = location.state;
  // default selectedMethod disamakan dengan ID metode yang benar
  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [openMethod, setOpenMethod] = useState("Card");

  if (!event) return <p className="p-4">Data event tidak tersedia</p>;

  const handlePayment = () => {
    // Jika metode WhatsApp, langsung buka chat WA
    if (selectedMethod === "WhatsApp") {
      const waNumber = "6283170731973"; // format internasional tanpa +
      const message = encodeURIComponent(
        `Halo, saya ingin melakukan pembayaran untuk event ${event.title}`
      );
      const waLink = `https://wa.me/${waNumber}?text=${message}`;
      window.open(waLink, "_blank");
      return;
    }

    // 1️⃣ Simpan ke riwayat pembelian di localStorage
    const storedHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const updatedHistory = [
      ...storedHistory,
      { ...event, purchasedAt: new Date().toISOString(), paymentMethod: selectedMethod },
    ];
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));

    // 2️⃣ Navigasi ke halaman tiket
    navigate(`/ticket/${id}`, { state: event });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-6">
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs text-gray-600 mb-3"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <h1 className="text-lg font-semibold mb-4">Payment</h1>

        <div className="mb-4">
          <h2 className="font-semibold text-sm">{event.title}</h2>
          <p className="text-xs text-gray-500">
            {event.date} • {event.time}
          </p>
        </div>

        {/* Payment Methods Accordion */}
        <div className="space-y-3 mb-4">
          {paymentOptions.map(({ id: methodId, label, icons }) => (
            <div
              key={methodId}
              className={`border rounded-lg overflow-hidden ${
                selectedMethod === methodId ? "border-red-600" : "border-gray-300"
              }`}
            >
              <button
                onClick={() => {
                  setOpenMethod(openMethod === methodId ? "" : methodId);
                  setSelectedMethod(methodId); // otomatis pilih metode saat buka accordion
                }}
                className="w-full flex justify-between items-center px-3 py-2 bg-gray-50"
                aria-expanded={openMethod === methodId}
                aria-controls={`${methodId}-content`}
              >
                <div className="flex items-center gap-2">
                  {icons.map((icon) => (
                    <PaymentIcon key={icon} name={icon} />
                  ))}
                </div>
                {openMethod === methodId ? (
                  <ChevronUp className="text-red-600" />
                ) : (
                  <ChevronDown />
                )}
              </button>

              {openMethod === methodId && (
                <div id={`${methodId}-content`} className="px-4 py-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={methodId}
                      checked={selectedMethod === methodId}
                      onChange={() => setSelectedMethod(methodId)}
                      className="accent-red-600"
                    />
                    <span className="text-sm font-medium">{label}</span>
                  </label>

                  {/* Info tambahan */}
                  {methodId === "Card" && (
                    <div className="mt-2 text-xs text-gray-600">
                      Pay securely with your credit or debit card.
                    </div>
                  )}
                  {methodId === "mbanking" && (
                    <div className="mt-2 text-xs text-gray-600">
                      Proceed to your bank's app payment.
                    </div>
                  )}
                  {(methodId === "Qris" || methodId === "Dana" || methodId === "Gopay") && (
                    <div className="mt-2 text-xs text-gray-600">
                      Open the app to scan QR code and complete the payment.
                    </div>
                  )}
                  {methodId === "WhatsApp" && (
                    <div className="mt-2 text-xs text-gray-600">
                      Klik "Pay Now" untuk membayar melalui WhatsApp.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm font-medium mb-4">
          <span>Total</span>
          <span>{event.price}</span>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-2.5 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-red-900 to-red-600"
          disabled={!selectedMethod}
          aria-disabled={!selectedMethod}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}