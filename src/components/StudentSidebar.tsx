import { Link, useLocation } from "react-router-dom";
import { Home, User, ClipboardList, FileText, Trophy, DollarSign, Bell, GraduationCap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudentStandard } from "@/hooks/useStudentStandard";

const navItems = [
  { to: "/student/dashboard", icon: Home, label: "Home" },
  { to: "/student/profile", icon: User, label: "My Profile" },
  { to: "/student/report", icon: ClipboardList, label: "My Report" },
  { to: "/student/attendance", icon: FileText, label: "Attendance" },
  { to: "/student/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/student/fees", icon: DollarSign, label: "Fees" },
  { to: "/student/notices", icon: Bell, label: "Notices" },
];

const StudentSidebar = () => {
  const location = useLocation();
  const { selectedStandard, setSelectedStandard, availableStandards } = useStudentStandard();

  return (
    <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col fixed left-0 top-0 h-screen overflow-y-auto z-40">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">Student Portal</h1>
        <p className="text-white/70 text-sm mt-1">Raj Kumar</p>
        
        {/* Standard Selector */}
        <div className="mt-3">
          <div className="flex items-center gap-2 text-white/60 text-xs mb-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Viewing Standard</span>
          </div>
          <Select value={selectedStandard} onValueChange={setSelectedStandard}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white h-9 text-sm hover:bg-white/15 transition-colors [&>svg]:text-white/60">
              <SelectValue placeholder="Select Standard" />
            </SelectTrigger>
            <SelectContent>
              {availableStandards.map((std) => (
                <SelectItem key={std.value} value={std.value}>
                  {std.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || 
              (item.to === "/student/dashboard" && location.pathname.startsWith("/student/subject"));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-white/10 hover:bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default StudentSidebar;
