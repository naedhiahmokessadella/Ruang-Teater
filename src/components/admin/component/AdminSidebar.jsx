import {
  LayoutDashboard,
  Calendar,
  Layers,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";


export default function AdminSidebar() {
  const menu = [
    {
      title: "MAIN",
      items: [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          to: "/admin",
        },
        {
          label: "Event Management",
          icon: <Calendar size={18} />,
          to: "/admin/events",
        },
        {
          label: "Categories",
          icon: <Layers size={18} />,
          to: "/admin/categories",
        },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        {
          label: "Registrations",
          icon: <ClipboardList size={18} />,
          to: "/admin/registrations",
        },
        {
          label: "Users",
          icon: <Users size={18} />,
          to: "/admin/users",
        },
      ],
    },
    {
      title: "ANALYTICS",
      items: [
        {
          label: "Reports",
          icon: <BarChart3 size={18} />,
          to: "/admin/reports",
        },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        {
          label: "Settings",
          icon: <Settings size={18} />,
          to: "/admin/settings",
        },
        {
          label: "Logout",
          icon: <LogOut size={18} />,
          to: "/logout",
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-md fixed left-0 top-0 h-screen flex flex-col">
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b">
        Admin Panel
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menu.map((section) => (
          <div key={section.title}>
            <p className="text-xs text-gray-400 mb-2">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
