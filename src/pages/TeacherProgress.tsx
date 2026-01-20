import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, TrendingUp, CheckCircle, Clock, AlertCircle, Lock, Unlock, FileText, Video, ClipboardList } from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const batchProgress = {
  "class10a": {
    name: "Class 10 A - Mathematics",
    totalChapters: 7,
    chapters: [
      { 
        id: 1, 
        name: "Linear Equations", 
        resources: {
          notes: { total: 3, unlocked: 3 },
          videos: { total: 3, unlocked: 3 },
          tests: { total: 2, unlocked: 2 }
        }
      },
      { 
        id: 2, 
        name: "Quadratic Equations", 
        resources: {
          notes: { total: 3, unlocked: 2 },
          videos: { total: 3, unlocked: 2 },
          tests: { total: 2, unlocked: 1 }
        }
      },
      { 
        id: 3, 
        name: "Arithmetic Progression", 
        resources: {
          notes: { total: 2, unlocked: 2 },
          videos: { total: 2, unlocked: 2 },
          tests: { total: 1, unlocked: 1 }
        }
      },
      { 
        id: 4, 
        name: "Trigonometry", 
        resources: {
          notes: { total: 4, unlocked: 2 },
          videos: { total: 4, unlocked: 1 },
          tests: { total: 2, unlocked: 0 }
        }
      },
      { 
        id: 5, 
        name: "Coordinate Geometry", 
        resources: {
          notes: { total: 3, unlocked: 1 },
          videos: { total: 3, unlocked: 0 },
          tests: { total: 2, unlocked: 0 }
        }
      },
      { 
        id: 6, 
        name: "Probability", 
        resources: {
          notes: { total: 2, unlocked: 0 },
          videos: { total: 2, unlocked: 0 },
          tests: { total: 1, unlocked: 0 }
        }
      },
      { 
        id: 7, 
        name: "Statistics", 
        resources: {
          notes: { total: 2, unlocked: 0 },
          videos: { total: 2, unlocked: 0 },
          tests: { total: 1, unlocked: 0 }
        }
      },
    ]
  }
};

export default function TeacherProgress() {
  const [selectedBatch, setSelectedBatch] = useState("class10a");
  const progress = batchProgress[selectedBatch as keyof typeof batchProgress];

  // Calculate totals
  const totalNotes = progress.chapters.reduce((sum, ch) => sum + ch.resources.notes.total, 0);
  const unlockedNotes = progress.chapters.reduce((sum, ch) => sum + ch.resources.notes.unlocked, 0);
  const totalVideos = progress.chapters.reduce((sum, ch) => sum + ch.resources.videos.total, 0);
  const unlockedVideos = progress.chapters.reduce((sum, ch) => sum + ch.resources.videos.unlocked, 0);
  const totalTests = progress.chapters.reduce((sum, ch) => sum + ch.resources.tests.total, 0);
  const unlockedTests = progress.chapters.reduce((sum, ch) => sum + ch.resources.tests.unlocked, 0);

  const totalResources = totalNotes + totalVideos + totalTests;
  const unlockedResources = unlockedNotes + unlockedVideos + unlockedTests;
  const overallProgress = (unlockedResources / totalResources) * 100;

  const getChapterStatus = (chapter: typeof progress.chapters[0]) => {
    const total = chapter.resources.notes.total + chapter.resources.videos.total + chapter.resources.tests.total;
    const unlocked = chapter.resources.notes.unlocked + chapter.resources.videos.unlocked + chapter.resources.tests.unlocked;
    const percent = (unlocked / total) * 100;
    
    if (percent === 100) return "completed";
    if (percent > 0) return "in-progress";
    return "not-started";
  };

  const getChapterCompletion = (chapter: typeof progress.chapters[0]) => {
    const total = chapter.resources.notes.total + chapter.resources.videos.total + chapter.resources.tests.total;
    const unlocked = chapter.resources.notes.unlocked + chapter.resources.videos.unlocked + chapter.resources.tests.unlocked;
    return Math.round((unlocked / total) * 100);
  };

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
      <TeacherSidebar />

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
            <p className="text-muted-foreground">Monitor unlocked resources and content availability for students</p>
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

          {/* Overall Progress */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Overall Content Release Progress
              </CardTitle>
              <CardDescription>Total resources unlocked for students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">
                    {unlockedResources}/{totalResources}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    {overallProgress.toFixed(0)}%
                  </span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Resource Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Notes Unlocked</p>
                    <p className="text-2xl font-bold">{unlockedNotes}/{totalNotes}</p>
                    <Progress value={(unlockedNotes / totalNotes) * 100} className="h-1 mt-2 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Video className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Videos Unlocked</p>
                    <p className="text-2xl font-bold">{unlockedVideos}/{totalVideos}</p>
                    <Progress value={(unlockedVideos / totalVideos) * 100} className="h-1 mt-2 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <ClipboardList className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tests Unlocked</p>
                    <p className="text-2xl font-bold">{unlockedTests}/{totalTests}</p>
                    <Progress value={(unlockedTests / totalTests) * 100} className="h-1 mt-2 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chapter-wise Progress</CardTitle>
              <CardDescription>Detailed breakdown of unlocked resources per chapter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progress.chapters.map((chapter) => {
                  const status = getChapterStatus(chapter);
                  const completion = getChapterCompletion(chapter);
                  
                  return (
                    <Card key={chapter.id} className="bg-accent/5">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(status)}
                              <div>
                                <p className="font-semibold">Chapter {chapter.id}: {chapter.name}</p>
                                <p className={`text-sm capitalize ${getStatusColor(status)}`}>
                                  {status.replace("-", " ")}
                                </p>
                              </div>
                            </div>
                            <span className="text-lg font-bold">{completion}%</span>
                          </div>
                          
                          <Progress value={completion} className="h-2" />
                          
                          {/* Resource breakdown */}
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="text-muted-foreground">Notes:</span>
                              <Badge variant={chapter.resources.notes.unlocked === chapter.resources.notes.total ? "default" : "secondary"} className="gap-1">
                                {chapter.resources.notes.unlocked === chapter.resources.notes.total ? (
                                  <Unlock className="h-3 w-3" />
                                ) : (
                                  <Lock className="h-3 w-3" />
                                )}
                                {chapter.resources.notes.unlocked}/{chapter.resources.notes.total}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Video className="h-4 w-4 text-purple-500" />
                              <span className="text-muted-foreground">Videos:</span>
                              <Badge variant={chapter.resources.videos.unlocked === chapter.resources.videos.total ? "default" : "secondary"} className="gap-1">
                                {chapter.resources.videos.unlocked === chapter.resources.videos.total ? (
                                  <Unlock className="h-3 w-3" />
                                ) : (
                                  <Lock className="h-3 w-3" />
                                )}
                                {chapter.resources.videos.unlocked}/{chapter.resources.videos.total}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <ClipboardList className="h-4 w-4 text-orange-500" />
                              <span className="text-muted-foreground">Tests:</span>
                              <Badge variant={chapter.resources.tests.unlocked === chapter.resources.tests.total ? "default" : "secondary"} className="gap-1">
                                {chapter.resources.tests.unlocked === chapter.resources.tests.total ? (
                                  <Unlock className="h-3 w-3" />
                                ) : (
                                  <Lock className="h-3 w-3" />
                                )}
                                {chapter.resources.tests.unlocked}/{chapter.resources.tests.total}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
