import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TeacherSidebar from "@/components/TeacherSidebar";

const classes = [
  {
    id: "class10a",
    name: "Class 10 A",
    subject: "Mathematics",
    students: 45,
    completedChapters: 7,
    totalChapters: 12,
    nextClass: "Tomorrow at 10:30 AM",
    status: "active"
  },
  {
    id: "class10b",
    name: "Class 10 B",
    subject: "Mathematics",
    students: 42,
    completedChapters: 6,
    totalChapters: 12,
    nextClass: "Today at 2:00 PM",
    status: "active"
  },
  {
    id: "class9a",
    name: "Class 9 A",
    subject: "Mathematics",
    students: 38,
    completedChapters: 8,
    totalChapters: 10,
    nextClass: "Friday at 11:00 AM",
    status: "active"
  },
  {
    id: "class9b",
    name: "Class 9 B",
    subject: "Mathematics",
    students: 40,
    completedChapters: 7,
    totalChapters: 10,
    nextClass: "Thursday at 1:30 PM",
    status: "active"
  },
];

export default function TeacherClassList() {
  const getProgressPercent = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">My Classes</h1>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Select a Class</h2>
            <p className="text-muted-foreground">Choose a class to view resources, manage students, and track progress</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{classItem.name}</CardTitle>
                        <CardDescription>{classItem.subject}</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      {classItem.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{classItem.students} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {classItem.completedChapters}/{classItem.totalChapters} Chapters
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {getProgressPercent(classItem.completedChapters, classItem.totalChapters)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${getProgressPercent(classItem.completedChapters, classItem.totalChapters)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground mb-3">
                      Next class: <span className="font-medium text-foreground">{classItem.nextClass}</span>
                    </p>
                    <Link to={`/teacher/batch/${classItem.id}`}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group-hover:gap-3 gap-2 transition-all">
                        Open Class
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
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
