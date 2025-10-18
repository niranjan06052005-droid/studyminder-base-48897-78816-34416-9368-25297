import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, BarChart3, TrendingUp, TrendingDown, Users } from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const batchAnalytics = {
  "class10a": {
    name: "Class 10 A - Mathematics",
    students: [
      { id: 1, name: "Aarav Sharma", rollNo: "10A01", avgScore: 88, tests: 9, attendance: 95, trend: "up" },
      { id: 2, name: "Diya Patel", rollNo: "10A02", avgScore: 92, tests: 9, attendance: 98, trend: "up" },
      { id: 3, name: "Rohan Kumar", rollNo: "10A03", avgScore: 75, tests: 8, attendance: 87, trend: "down" },
      { id: 4, name: "Ananya Singh", rollNo: "10A04", avgScore: 85, tests: 9, attendance: 92, trend: "up" },
      { id: 5, name: "Arjun Mehta", rollNo: "10A05", avgScore: 68, tests: 7, attendance: 78, trend: "down" },
      { id: 6, name: "Priya Desai", rollNo: "10A06", avgScore: 90, tests: 9, attendance: 96, trend: "up" },
      { id: 7, name: "Vihaan Joshi", rollNo: "10A07", avgScore: 82, tests: 9, attendance: 90, trend: "stable" },
      { id: 8, name: "Isha Reddy", rollNo: "10A08", avgScore: 95, tests: 9, attendance: 99, trend: "up" },
    ],
    batchStats: {
      avgScore: 84.4,
      avgAttendance: 91.9,
      topPerformer: "Isha Reddy",
      needsAttention: 2
    }
  }
};

export default function TeacherAnalytics() {
  const [selectedBatch, setSelectedBatch] = useState("class10a");
  const analytics = batchAnalytics[selectedBatch as keyof typeof batchAnalytics];

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return { label: "Excellent", className: "bg-success text-success-foreground" };
    if (score >= 75) return { label: "Good", className: "bg-accent text-accent-foreground" };
    if (score >= 60) return { label: "Average", className: "bg-muted text-muted-foreground" };
    return { label: "Needs Attention", className: "bg-destructive text-destructive-foreground" };
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Student Performance Analytics</h1>
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
            <h2 className="text-3xl font-bold text-primary mb-2">Batch Performance Analysis</h2>
            <p className="text-muted-foreground">Comprehensive view of student performance based on test results</p>
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
              <CardTitle>Student Performance Overview</CardTitle>
              <CardDescription>Detailed analysis of each student's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Tests Taken</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.students.map((student) => {
                    const performanceBadge = getPerformanceBadge(student.avgScore);
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-mono">{student.rollNo}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <span className="text-lg font-bold">{student.avgScore}%</span>
                        </TableCell>
                        <TableCell>{student.tests}</TableCell>
                        <TableCell>
                          <span className={student.attendance >= 90 ? "text-success" : student.attendance >= 75 ? "text-accent-foreground" : "text-destructive"}>
                            {student.attendance}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={performanceBadge.className}>
                            {performanceBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(student.trend)}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
