import Footer from "../components/public/Footer";

export default function History({ setPage }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="p-6">
        <h2 className="text-xl font-bold mb-4">Riwayat</h2>
        <p>Ini halaman riwayat pembelian.</p>
      </main>

      <Footer setPage={setPage} activePage="history" />
    </div>
  );
}