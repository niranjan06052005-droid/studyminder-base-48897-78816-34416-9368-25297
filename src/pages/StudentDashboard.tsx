import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, DollarSign, Bell, LogOut, Home, Calculator, Beaker, Globe, ClipboardList, Trophy, Award, Smile, Languages, User } from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";
import { useStudentStandard } from "@/hooks/useStudentStandard";

const StudentDashboard = () => {
  const { selectedStandard } = useStudentStandard();

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
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
            <p className="text-muted-foreground">Viewing data for <span className="font-semibold text-primary">{selectedStandard}th Standard</span></p>
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
