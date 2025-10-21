import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, LogOut, BookOpen, TrendingUp, Award, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data structure for student's test scores
const studentScores = [
  {
    subject: "Mathematics",
    unitTest1: 85,
    semester1: 78,
    unitTest2: 92,
    finalSemester: 88,
    totalTests: 12,
    averageScore: 85.75
  },
  {
    subject: "Science",
    unitTest1: 78,
    semester1: 82,
    unitTest2: 85,
    finalSemester: 90,
    totalTests: 10,
    averageScore: 83.75
  },
  {
    subject: "English",
    unitTest1: 92,
    semester1: 88,
    unitTest2: 90,
    finalSemester: 95,
    totalTests: 8,
    averageScore: 91.25
  },
  {
    subject: "Social Studies",
    unitTest1: 75,
    semester1: 80,
    unitTest2: 82,
    finalSemester: 85,
    totalTests: 9,
    averageScore: 80.5
  },
  {
    subject: "Hindi",
    unitTest1: 88,
    semester1: 85,
    unitTest2: 90,
    finalSemester: 92,
    totalTests: 7,
    averageScore: 88.75
  }
];

// Data for bar chart
const chartData = studentScores.map(score => ({
  subject: score.subject,
  average: score.averageScore
}));

const StudentReport = () => {
  // Calculate overall statistics
  const overallAverage = (studentScores.reduce((sum, score) => sum + score.averageScore, 0) / studentScores.length).toFixed(2);
  const totalTests = studentScores.reduce((sum, score) => sum + score.totalTests, 0);
  const highestAverage = Math.max(...studentScores.map(s => s.averageScore));
  const topSubject = studentScores.find(s => s.averageScore === highestAverage)?.subject;

  const getGrade = (marks: number) => {
    if (marks >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (marks >= 80) return { grade: 'A', color: 'text-green-500' };
    if (marks >= 70) return { grade: 'B+', color: 'text-blue-600' };
    if (marks >= 60) return { grade: 'B', color: 'text-blue-500' };
    if (marks >= 50) return { grade: 'C', color: 'text-yellow-600' };
    return { grade: 'D', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Student Portal</h2>
          <p className="text-sm text-muted-foreground">Rajiv Kumar</p>
        </div>
        <nav className="px-4 space-y-2">
          <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg">
            <BookOpen className="h-5 w-5" />
            <span>My Report</span>
          </div>
          <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
            <TrendingUp className="h-5 w-5" />
            <span>Attendance</span>
          </Link>
          <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors">
            <Award className="h-5 w-5" />
            <span>Achievements</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-foreground">My Academic Report</h1>
          <div className="flex gap-3">
            <Link to="/student/dashboard">
              <Button variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Link to="/login">
              <Button variant="destructive" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{overallAverage}%</div>
                <p className="text-xs text-muted-foreground mt-1">Across all subjects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalTests}</div>
                <p className="text-xs text-muted-foreground mt-1">Tests completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-foreground">{topSubject}</div>
                <p className="text-xs text-muted-foreground mt-1">{highestAverage}% average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getGrade(parseFloat(overallAverage)).color}`}>
                  {getGrade(parseFloat(overallAverage)).grade}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Current performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Average Score Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Subject-wise Average Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Visual representation of your average scores across all subjects</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="hsl(var(--primary))" name="Average Score (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Exam Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Detailed Examination Scores</CardTitle>
              <p className="text-sm text-muted-foreground">Your marks in Unit Tests, Semester Exams, and Final Semester</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Subject</TableHead>
                      <TableHead className="text-center font-bold">Unit Test 1</TableHead>
                      <TableHead className="text-center font-bold">Semester 1</TableHead>
                      <TableHead className="text-center font-bold">Unit Test 2</TableHead>
                      <TableHead className="text-center font-bold">Final Semester</TableHead>
                      <TableHead className="text-center font-bold">Average</TableHead>
                      <TableHead className="text-center font-bold">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentScores.map((score) => {
                      const gradeInfo = getGrade(score.averageScore);
                      return (
                        <TableRow key={score.subject}>
                          <TableCell className="font-medium">{score.subject}</TableCell>
                          <TableCell className="text-center">{score.unitTest1}</TableCell>
                          <TableCell className="text-center">{score.semester1}</TableCell>
                          <TableCell className="text-center">{score.unitTest2}</TableCell>
                          <TableCell className="text-center">{score.finalSemester}</TableCell>
                          <TableCell className="text-center font-bold">{score.averageScore}</TableCell>
                          <TableCell className="text-center">
                            <span className={`font-bold ${gradeInfo.color}`}>
                              {gradeInfo.grade}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">Strong Performance</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      You're excelling in {topSubject} with an average of {highestAverage}%. Keep up the excellent work!
                    </p>
                  </div>
                </div>
                
                {studentScores
                  .filter(s => s.averageScore < 85)
                  .map(score => (
                    <div key={score.subject} className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-900 dark:text-yellow-100">Room for Improvement</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          Focus on {score.subject} to improve your average from {score.averageScore}% to 85% or higher.
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
