import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Megaphone, Bell, LogOut, Home, Calendar, BookOpen, Users, GraduationCap, BarChart3, MessageSquare, Folder, ClipboardCheck } from "lucide-react";

const TeacherDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Teacher Portal</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/teacher/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home/Dashboard</span>
            </Link>
            
            <Link to="/teacher/batch/class10a" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <GraduationCap className="h-5 w-5" />
              <span>My Classes</span>
            </Link>
            
            <Link to="/teacher/resources" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Folder className="h-5 w-5" />
              <span>My Resources</span>
            </Link>
            
            <Link to="/teacher/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <ClipboardCheck className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
            
            <Link to="/teacher/test-results" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <BarChart3 className="h-5 w-5" />
              <span>Test Results</span>
            </Link>
            
            <Link to="/teacher/notices" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span>Notices</span>
            </Link>
            
            <Link to="/teacher/schedule" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Calendar className="h-5 w-5" />
              <span>Schedule</span>
            </Link>
            
            <Link to="/teacher/progress" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <CheckCircle2 className="h-5 w-5" />
              <span>My Progress</span>
            </Link>
            
            <Link to="/teacher/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Teacher Portal</h1>
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {/* Welcher's Workflow Section */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-2">Welcher's Workflow</h2>
            <p className="text-muted-foreground">Manage your classes and resources efficiently</p>
          </div>

          {/* Quick Actions Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Prepare for Next Class */}
            <Card className="gradient-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#0891b2] rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-primary">Prepare for Next Class</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">Next Up: <span className="text-primary">Std. 9th - Algabra</span> at 10:30 AM</p>
                  <p className="text-sm text-muted-foreground">Topic: Linear Equations</p>
                </div>
                <Button className="w-full bg-[#0891b2] hover:bg-[#0891b2]/90 text-white">
                  View/Add Quick Quiz
                </Button>
              </CardContent>
            </Card>

            {/* Classroom Actions */}
            <Card className="gradient-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#f59e0b] rounded-lg flex items-center justify-center mb-3">
                  <Megaphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-primary">Classroom Actions</CardTitle>
                <CardDescription>Manage your classes efficiently.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-[#0891b2] hover:bg-[#0891b2]/90 text-white">
                  Mark Attendance
                </Button>
                <Button variant="outline" className="w-full">
                  Post Announcement
                </Button>
              </CardContent>
            </Card>

            {/* New Submissions */}
            <Card className="gradient-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#1e3a5f] rounded-lg flex items-center justify-center mb-3">
                  <ClipboardCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-5xl font-bold text-primary mb-2">12</CardTitle>
                <CardDescription className="text-base">New Submissions to Grade</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                  View Performance Hub
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Today's Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Submissions Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#0891b2] rounded-lg flex items-center justify-center">
                      <ClipboardCheck className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Submissions to Grade</p>
                      <p className="text-4xl font-bold text-primary">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Class Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Std. 8th - Section A</p>
                      <p className="text-sm text-muted-foreground">Mathematics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Unanswered Doubts */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#f59e0b] rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Unanswered Doubts</p>
                      <p className="text-4xl font-bold text-primary">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
