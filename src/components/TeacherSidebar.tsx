import { Link, useLocation } from "react-router-dom";
import { Calendar, BookOpen, Users, GraduationCap, BarChart3, MessageSquare, Folder, ClipboardCheck, CheckCircle2, UserCircle } from "lucide-react";

export default function TeacherSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { path: "/teacher/profile", icon: UserCircle, label: "My Profile" },
    { path: "/teacher/classes", icon: GraduationCap, label: "My Classes" },
    { path: "/teacher/attendance", icon: ClipboardCheck, label: "Attendance" },
    { path: "/teacher/test-results", icon: BarChart3, label: "Test Results" },
    { path: "/teacher/notices", icon: MessageSquare, label: "Notices" },
    { path: "/teacher/schedule", icon: Calendar, label: "Schedule" },
    { path: "/teacher/progress", icon: CheckCircle2, label: "My Progress" },
    { path: "/teacher/analytics", icon: BarChart3, label: "Analytics" },
  ];

  return (
    <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col sticky top-0 h-screen">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">Teacher Portal</h1>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-white/10 hover:bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
