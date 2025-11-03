import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, LogOut, BookOpen, Award, Download, ClipboardList, FileText, Trophy, Smile, DollarSign, Bell, User } from "lucide-react";
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

// Data for average performance chart
const averageChartData = studentScores.map(score => ({
  subject: score.subject,
  average: score.averageScore
}));

// Data for each exam type
const unitTest1Data = studentScores.map(score => ({
  subject: score.subject,
  score: score.unitTest1
}));

const semester1Data = studentScores.map(score => ({
  subject: score.subject,
  score: score.semester1
}));

const unitTest2Data = studentScores.map(score => ({
  subject: score.subject,
  score: score.unitTest2
}));

const finalSemesterData = studentScores.map(score => ({
  subject: score.subject,
  score: score.finalSemester
}));

const StudentReport = () => {
  // Calculate statistics for each exam type
  const unitTest1Total = studentScores.reduce((sum, score) => sum + score.unitTest1, 0);
  const unitTest1Average = (unitTest1Total / studentScores.length).toFixed(2);
  
  const semester1Total = studentScores.reduce((sum, score) => sum + score.semester1, 0);
  const semester1Average = (semester1Total / studentScores.length).toFixed(2);
  
  const unitTest2Total = studentScores.reduce((sum, score) => sum + score.unitTest2, 0);
  const unitTest2Average = (unitTest2Total / studentScores.length).toFixed(2);
  
  const finalSemesterTotal = studentScores.reduce((sum, score) => sum + score.finalSemester, 0);
  const finalSemesterAverage = (finalSemesterTotal / studentScores.length).toFixed(2);

  const getGrade = (marks: number) => {
    if (marks >= 90) return { grade: 'A+', color: 'text-green-600 dark:text-green-400' };
    if (marks >= 80) return { grade: 'A', color: 'text-green-500 dark:text-green-300' };
    if (marks >= 70) return { grade: 'B+', color: 'text-blue-600 dark:text-blue-400' };
    if (marks >= 60) return { grade: 'B', color: 'text-blue-500 dark:text-blue-300' };
    if (marks >= 50) return { grade: 'C', color: 'text-yellow-600 dark:text-yellow-400' };
    return { grade: 'D', color: 'text-red-600 dark:text-red-400' };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col fixed left-0 top-0 h-screen overflow-y-auto z-40">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Student Portal</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <Link to="/student/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10">
              <ClipboardList className="h-5 w-5" />
              <span>My Report</span>
            </div>
            
            <Link to="/student/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
            
            <Link to="/student/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
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
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">My Academic Report</h1>
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
                <Button variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 space-y-6">
          {/* Average Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Average Performance Across All Tests</CardTitle>
              <p className="text-sm text-muted-foreground">Overall average scores for each subject</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={averageChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="subject" className="text-xs" />
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
                    {/* Total Row */}
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-center">{unitTest1Total}</TableCell>
                      <TableCell className="text-center">{semester1Total}</TableCell>
                      <TableCell className="text-center">{unitTest2Total}</TableCell>
                      <TableCell className="text-center">{finalSemesterTotal}</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    {/* Percentage Row */}
                    <TableRow className="bg-muted font-bold">
                      <TableCell className="font-bold">Percentage</TableCell>
                      <TableCell className="text-center">{unitTest1Average}%</TableCell>
                      <TableCell className="text-center">{semester1Average}%</TableCell>
                      <TableCell className="text-center">{unitTest2Average}%</TableCell>
                      <TableCell className="text-center">{finalSemesterAverage}%</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Visual Representations of Each Exam */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Unit Test 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Unit Test 1 Scores</CardTitle>
                <p className="text-sm text-muted-foreground">Total: {unitTest1Total} | Average: {unitTest1Average}%</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={unitTest1Data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="subject" className="text-xs" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--chart-1))" name="Score (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Semester 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Semester 1 Scores</CardTitle>
                <p className="text-sm text-muted-foreground">Total: {semester1Total} | Average: {semester1Average}%</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={semester1Data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="subject" className="text-xs" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--chart-2))" name="Score (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Unit Test 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Unit Test 2 Scores</CardTitle>
                <p className="text-sm text-muted-foreground">Total: {unitTest2Total} | Average: {unitTest2Average}%</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={unitTest2Data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="subject" className="text-xs" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--chart-3))" name="Score (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Final Semester */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Final Semester Scores</CardTitle>
                <p className="text-sm text-muted-foreground">Total: {finalSemesterTotal} | Average: {finalSemesterAverage}%</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={finalSemesterData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="subject" className="text-xs" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--chart-4))" name="Score (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentReport;
