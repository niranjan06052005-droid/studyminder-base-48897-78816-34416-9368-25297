import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, DollarSign, Bell, LogOut, Home, Calculator, Beaker, Globe, ClipboardList, Trophy, Award, Smile, Languages } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Student Portal</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home/Dashboard</span>
            </Link>
            
            <Link to="/student/report" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <ClipboardList className="h-5 w-5" />
              <span>My Report</span>
            </Link>
            
            <Link to="/student/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
            
            <Link to="/student/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </Link>
            
            <Link to="/student/achievements" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Award className="h-5 w-5" />
              <span>Achievements</span>
            </Link>
            
            <Link to="/student/fun-spot" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Smile className="h-5 w-5" />
              <span>Fun Spot</span>
            </Link>
            
            <Link to="/student/fees" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <DollarSign className="h-5 w-5" />
              <span>Fees</span>
            </Link>
            
            <Link to="/student/notices" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span>Notices</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Student Portal</h1>
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
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome back, Raj Kumar!</h2>
            <p className="text-muted-foreground">Here's what's happening with your studies</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription>Overall Attendance</CardDescription>
                <CardTitle className="text-3xl text-success">92%</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={92} className="h-2" />
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription>Upcoming Test</CardDescription>
                <CardTitle className="text-lg text-primary">Maths - Chapter 5</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Oct 15th, 2025</p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription>Pending Fees</CardDescription>
                <CardTitle className="text-3xl text-destructive">₹1,500</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Due: Oct 20th</p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription>Recent Notices</CardDescription>
                <CardTitle className="text-lg text-primary">3 New</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View all notices</p>
              </CardContent>
            </Card>
          </div>

          {/* My Subjects Section */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">My Subjects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Mathematics", icon: Calculator, color: "bg-accent/10 border-accent/30", title: "mathematics" },
                { name: "Science", icon: Beaker, color: "bg-success/10 border-success/30", title: "science" },
                { name: "English", icon: BookOpen, color: "bg-secondary/10 border-secondary/30", title: "english" },
                { name: "Social Studies", icon: Globe, color: "bg-primary/10 border-primary/30", title: "social-studies" },
                { name: "Marathi", icon: Languages, color: "bg-accent/10 border-accent/30", title: "marathi" },
                { name: "Hindi", icon: Languages, color: "bg-secondary/10 border-secondary/30", title: "hindi" }
              ].map((subject, index) => (
                <Card
                  key={index}
                  className={`${subject.color} hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                        <subject.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Notes:</span>
                        <span className="font-semibold">12 files</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tests:</span>
                        <span className="font-semibold">8 papers</span>
                      </div>
                      <Link to={`/student/subject/${subject.title}`}>
                        <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                          View Resources
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
