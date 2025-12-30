import Footer from "../components/public/Footer";

export default function Location({ setPage }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="p-6">
        <h2 className="text-xl font-bold mb-4">Lokasi</h2>
        <p>Ini halaman lokasi teater terdekat.</p>
      </main>

      <Footer setPage={setPage} activePage="location" />
    </div>
  );
}