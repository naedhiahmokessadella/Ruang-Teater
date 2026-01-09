import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* HEADER (FIXED) */}
        <AdminHeader />

        {/* MAIN CONTENT */}
        <main className="p-6 flex-1 overflow-y-auto mt-16 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
