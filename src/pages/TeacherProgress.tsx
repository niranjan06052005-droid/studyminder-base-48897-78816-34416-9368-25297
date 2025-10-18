import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const batchProgress = {
  "class10a": {
    name: "Class 10 A - Mathematics",
    totalChapters: 12,
    completedChapters: 7,
    totalTests: 15,
    conductedTests: 9,
    chapters: [
      { id: 1, name: "Linear Equations", status: "completed", completion: 100 },
      { id: 2, name: "Quadratic Equations", status: "completed", completion: 100 },
      { id: 3, name: "Arithmetic Progression", status: "completed", completion: 100 },
      { id: 4, name: "Trigonometry", status: "in-progress", completion: 70 },
      { id: 5, name: "Coordinate Geometry", status: "in-progress", completion: 45 },
      { id: 6, name: "Probability", status: "not-started", completion: 0 },
      { id: 7, name: "Statistics", status: "not-started", completion: 0 },
    ]
  }
};

export default function TeacherProgress() {
  const [selectedBatch, setSelectedBatch] = useState("class10a");
  const progress = batchProgress[selectedBatch as keyof typeof batchProgress];
  const courseCompletionPercent = (progress.completedChapters / progress.totalChapters) * 100;
  const testCompletionPercent = (progress.conductedTests / progress.totalTests) * 100;

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "text-success";
      case "in-progress": return "text-accent-foreground";
      case "not-started": return "text-muted-foreground";
      default: return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-success" />;
      case "in-progress": return <Clock className="h-5 w-5 text-accent-foreground" />;
      case "not-started": return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
      default: return null;
    }
  };

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
            <Link to="/teacher/progress" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <TrendingUp className="h-5 w-5" />
              <span>My Progress</span>
            </Link>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Teaching Progress</h1>
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
            <h2 className="text-3xl font-bold text-primary mb-2">Track Your Progress</h2>
            <p className="text-muted-foreground">Monitor course completion and test conducted status</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Batch</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-full md:w-96">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class10a">Class 10 A - Mathematics</SelectItem>
                  <SelectItem value="class10b">Class 10 B - Mathematics</SelectItem>
                  <SelectItem value="class9a">Class 9 A - Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Course Completion
                </CardTitle>
                <CardDescription>Chapters covered in the syllabus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      {progress.completedChapters}/{progress.totalChapters}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      {courseCompletionPercent.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={courseCompletionPercent} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {progress.totalChapters - progress.completedChapters} chapters remaining
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Tests Conducted
                </CardTitle>
                <CardDescription>Assessments completed this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      {progress.conductedTests}/{progress.totalTests}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      {testCompletionPercent.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={testCompletionPercent} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {progress.totalTests - progress.conductedTests} tests pending
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chapter-wise Progress</CardTitle>
              <CardDescription>Detailed breakdown of syllabus coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progress.chapters.map((chapter) => (
                  <Card key={chapter.id} className="bg-accent/5">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(chapter.status)}
                            <div>
                              <p className="font-semibold">Chapter {chapter.id}: {chapter.name}</p>
                              <p className={`text-sm capitalize ${getStatusColor(chapter.status)}`}>
                                {chapter.status.replace("-", " ")}
                              </p>
                            </div>
                          </div>
                          <span className="text-lg font-bold">{chapter.completion}%</span>
                        </div>
                        <Progress value={chapter.completion} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
