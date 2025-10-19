import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, BarChart3, TrendingUp, TrendingDown, Users, Eye } from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const batchAnalytics = {
  "class10a": {
    name: "Class 10 A - Mathematics",
    batchStats: {
      avgScore: 84.4,
      avgAttendance: 91.9,
      topPerformer: "Isha Reddy",
      needsAttention: 2
    },
    chapterTests: [
      {
        id: "ct1",
        chapter: "Chapter 1: Linear Equations",
        testName: "Chapter 1 Concept Test",
        avgMarks: 88.5,
        topPerformer: "Diya Patel",
        notAttempted: 2,
        students: [
          { rollNo: "10A01", name: "Aarav Sharma", score: 85 },
          { rollNo: "10A02", name: "Diya Patel", score: 95 },
          { rollNo: "10A03", name: "Rohan Kumar", score: 78 },
          { rollNo: "10A04", name: "Ananya Singh", score: 90 },
          { rollNo: "10A05", name: "Arjun Mehta", score: null },
          { rollNo: "10A06", name: "Priya Desai", score: 92 },
          { rollNo: "10A07", name: "Vihaan Joshi", score: 87 },
          { rollNo: "10A08", name: "Isha Reddy", score: null },
        ]
      },
      {
        id: "ct2",
        chapter: "Chapter 1: Linear Equations",
        testName: "Chapter 1 Final Test",
        avgMarks: 82.3,
        topPerformer: "Isha Reddy",
        notAttempted: 1,
        students: [
          { rollNo: "10A01", name: "Aarav Sharma", score: 80 },
          { rollNo: "10A02", name: "Diya Patel", score: 88 },
          { rollNo: "10A03", name: "Rohan Kumar", score: 72 },
          { rollNo: "10A04", name: "Ananya Singh", score: 85 },
          { rollNo: "10A05", name: "Arjun Mehta", score: 65 },
          { rollNo: "10A06", name: "Priya Desai", score: 90 },
          { rollNo: "10A07", name: "Vihaan Joshi", score: 84 },
          { rollNo: "10A08", name: "Isha Reddy", score: 95 },
        ]
      },
      {
        id: "ct3",
        chapter: "Chapter 2: Quadratic Equations",
        testName: "Chapter 2 Concept Test",
        avgMarks: 75.8,
        topPerformer: "Priya Desai",
        notAttempted: 3,
        students: [
          { rollNo: "10A01", name: "Aarav Sharma", score: 78 },
          { rollNo: "10A02", name: "Diya Patel", score: 85 },
          { rollNo: "10A03", name: "Rohan Kumar", score: null },
          { rollNo: "10A04", name: "Ananya Singh", score: 72 },
          { rollNo: "10A05", name: "Arjun Mehta", score: null },
          { rollNo: "10A06", name: "Priya Desai", score: 92 },
          { rollNo: "10A07", name: "Vihaan Joshi", score: 75 },
          { rollNo: "10A08", name: "Isha Reddy", score: null },
        ]
      },
    ]
  }
};

export default function TeacherAnalytics() {
  const [selectedBatch, setSelectedBatch] = useState("class10a");
  const [selectedTest, setSelectedTest] = useState<typeof batchAnalytics.class10a.chapterTests[0] | null>(null);
  const analytics = batchAnalytics[selectedBatch as keyof typeof batchAnalytics];

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Analytics</h1>
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
            <h2 className="text-3xl font-bold text-primary mb-2">Chapter-wise Test Performance</h2>
            <p className="text-muted-foreground">Comprehensive view of test performance across all chapters</p>
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batch Average</p>
                    <p className="text-2xl font-bold">{analytics.batchStats.avgScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                    <p className="text-2xl font-bold">{analytics.batchStats.avgAttendance}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Top Performer</p>
                    <p className="text-lg font-bold">{analytics.batchStats.topPerformer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Needs Attention</p>
                    <p className="text-2xl font-bold">{analytics.batchStats.needsAttention}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chapter-wise Test Analysis</CardTitle>
              <CardDescription>View detailed performance metrics for each chapter test</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chapter</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Avg Marks</TableHead>
                    <TableHead>Top Performer</TableHead>
                    <TableHead>Not Attempted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.chapterTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.chapter}</TableCell>
                      <TableCell>{test.testName}</TableCell>
                      <TableCell>
                        <span className="text-lg font-bold">{test.avgMarks}%</span>
                      </TableCell>
                      <TableCell className="text-success font-medium">{test.topPerformer}</TableCell>
                      <TableCell>
                        <span className={test.notAttempted > 0 ? "text-destructive font-medium" : "text-muted-foreground"}>
                          {test.notAttempted} students
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedTest(test)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Student Scores Modal */}
      <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTest?.testName}</DialogTitle>
            <DialogDescription>{selectedTest?.chapter}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedTest?.students.map((student) => (
                  <TableRow key={student.rollNo}>
                    <TableCell className="font-mono">{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      {student.score !== null ? (
                        <span className={`text-lg font-bold ${
                          student.score >= 90 ? "text-success" : 
                          student.score >= 75 ? "text-accent-foreground" : 
                          student.score >= 60 ? "text-muted-foreground" : 
                          "text-destructive"
                        }`}>
                          {student.score}%
                        </span>
                      ) : (
                        <span className="text-destructive">Not Attempted</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
