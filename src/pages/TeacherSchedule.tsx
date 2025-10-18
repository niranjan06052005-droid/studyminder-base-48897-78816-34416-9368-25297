import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const weekSchedule = [
  {
    day: "Monday",
    classes: [
      { time: "09:00 - 10:00", batch: "Class 10 A", subject: "Mathematics", topic: "Quadratic Equations" },
      { time: "11:00 - 12:00", batch: "Class 9 A", subject: "Mathematics", topic: "Linear Equations" },
      { time: "14:00 - 15:00", batch: "Class 10 B", subject: "Mathematics", topic: "Algebra" },
    ]
  },
  {
    day: "Tuesday",
    classes: [
      { time: "09:00 - 10:00", batch: "Class 10 A", subject: "Mathematics", topic: "Trigonometry" },
      { time: "10:00 - 11:00", batch: "Class 9 B", subject: "Mathematics", topic: "Geometry" },
      { time: "15:00 - 16:00", batch: "Class 10 B", subject: "Mathematics", topic: "Statistics" },
    ]
  },
  {
    day: "Wednesday",
    classes: [
      { time: "09:00 - 10:00", batch: "Class 10 A", subject: "Mathematics", topic: "Probability" },
      { time: "11:00 - 12:00", batch: "Class 9 A", subject: "Mathematics", topic: "Mensuration" },
      { time: "13:00 - 14:00", batch: "Class 10 B", subject: "Mathematics", topic: "Coordinate Geometry" },
    ]
  },
  {
    day: "Thursday",
    classes: [
      { time: "10:00 - 11:00", batch: "Class 10 A", subject: "Mathematics", topic: "Calculus Basics" },
      { time: "11:00 - 12:00", batch: "Class 9 B", subject: "Mathematics", topic: "Number Systems" },
      { time: "14:00 - 15:00", batch: "Class 10 B", subject: "Mathematics", topic: "Sequences & Series" },
    ]
  },
  {
    day: "Friday",
    classes: [
      { time: "09:00 - 10:00", batch: "Class 10 A", subject: "Mathematics", topic: "Revision Session" },
      { time: "11:00 - 12:00", batch: "Class 9 A", subject: "Mathematics", topic: "Problem Solving" },
      { time: "15:00 - 16:00", batch: "Class 10 B", subject: "Mathematics", topic: "Test Discussion" },
    ]
  },
  {
    day: "Saturday",
    classes: [
      { time: "10:00 - 12:00", batch: "All Batches", subject: "Mathematics", topic: "Doubt Clearing Session" },
    ]
  },
];

export default function TeacherSchedule() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const totalClasses = weekSchedule.reduce((sum, day) => sum + day.classes.length, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Teacher Portal</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/teacher/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/teacher/schedule" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Calendar className="h-5 w-5" />
              <span>Schedule</span>
            </Link>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Weekly Schedule</h1>
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
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">My Teaching Schedule</h2>
            <p className="text-muted-foreground">View your weekly class timetable and upcoming sessions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Classes</p>
                    <p className="text-2xl font-bold">{totalClasses}/week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Classes</p>
                    <p className="text-2xl font-bold">
                      {weekSchedule.find(d => d.day === today)?.classes.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Day</p>
                    <p className="text-2xl font-bold">{today}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {weekSchedule.map((daySchedule) => (
              <Card key={daySchedule.day} className={daySchedule.day === today ? "border-primary border-2" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl">{daySchedule.day}</CardTitle>
                      {daySchedule.day === today && (
                        <Badge className="bg-primary text-primary-foreground">Today</Badge>
                      )}
                    </div>
                    <CardDescription className="text-lg">
                      {daySchedule.classes.length} {daySchedule.classes.length === 1 ? "class" : "classes"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {daySchedule.classes.map((classItem, index) => (
                      <Card key={index} className="bg-accent/5 hover:bg-accent/10 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-mono text-sm font-medium">{classItem.time}</span>
                              </div>
                              <div className="h-8 w-px bg-border" />
                              <div>
                                <p className="font-semibold text-primary">{classItem.batch}</p>
                                <p className="text-sm text-muted-foreground">{classItem.subject}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{classItem.topic}</p>
                              <Button variant="outline" size="sm" className="mt-2">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
