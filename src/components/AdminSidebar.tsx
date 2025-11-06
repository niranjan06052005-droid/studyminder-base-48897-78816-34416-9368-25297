import { Link, useLocation } from "react-router-dom";
import { Home, Users, UserCheck, DollarSign, BarChart3, Bell, Clock, BookOpen } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: "Home", path: "/admin/dashboard", icon: Home },
    { name: "Student", path: "/admin/students", icon: Users },
    { name: "Staff", path: "/admin/staff", icon: UserCheck },
    { name: "Batch", path: "/admin/batches", icon: BookOpen },
    { name: "Fee", path: "/admin/fees", icon: DollarSign },
    { name: "Report", path: "/admin/reports", icon: BarChart3 },
    { name: "Notice", path: "/admin/notices", icon: Bell },
  ];

  return (
    <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col min-h-screen sticky top-0 h-screen">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">Admin Portal</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/10 font-medium"
                    : "hover:bg-white/10"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
