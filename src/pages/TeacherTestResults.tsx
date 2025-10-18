import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, LogOut, ClipboardCheck, Trophy, TrendingUp, Save, Upload } from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockStudents = [
  { id: 1, name: "Aarav Sharma", rollNo: "10A01", score: "" },
  { id: 2, name: "Diya Patel", rollNo: "10A02", score: "" },
  { id: 3, name: "Rohan Kumar", rollNo: "10A03", score: "" },
  { id: 4, name: "Ananya Singh", rollNo: "10A04", score: "" },
  { id: 5, name: "Arjun Mehta", rollNo: "10A05", score: "" },
  { id: 6, name: "Priya Desai", rollNo: "10A06", score: "" },
  { id: 7, name: "Vihaan Joshi", rollNo: "10A07", score: "" },
  { id: 8, name: "Isha Reddy", rollNo: "10A08", score: "" },
];

export default function TeacherTestResults() {
  const [selectedBatch, setSelectedBatch] = useState("class10a");
  const [selectedTest, setSelectedTest] = useState("test1");
  const [students, setStudents] = useState(mockStudents);
  const [maxMarks, setMaxMarks] = useState("50");

  const updateScore = (studentId: number, score: string) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, score } : student
    ));
  };

  const handleSave = () => {
    toast.success("Test results saved successfully!");
  };

  const completedCount = students.filter(s => s.score !== "").length;
  const avgScore = students.length > 0 
    ? students.reduce((sum, s) => sum + (parseFloat(s.score) || 0), 0) / students.filter(s => s.score !== "").length
    : 0;
  const highestScore = Math.max(...students.map(s => parseFloat(s.score) || 0));

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Declare Test Results</h1>
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
            <h2 className="text-3xl font-bold text-primary mb-2">Test Results Management</h2>
            <p className="text-muted-foreground">Enter and manage test scores for your students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Results Entered</p>
                    <p className="text-2xl font-bold">{completedCount}/{students.length}</p>
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
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold">{isNaN(avgScore) ? "0" : avgScore.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Highest Score</p>
                    <p className="text-2xl font-bold text-success">{highestScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
              <CardDescription>Select the batch and test to enter results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Batch</label>
                  <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class10a">Class 10 A - Mathematics</SelectItem>
                      <SelectItem value="class10b">Class 10 B - Mathematics</SelectItem>
                      <SelectItem value="class9a">Class 9 A - Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Test</label>
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test1">Chapter 1 - Unit Test</SelectItem>
                      <SelectItem value="test2">Chapter 2 - Unit Test</SelectItem>
                      <SelectItem value="midterm">Mid-Term Examination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Maximum Marks</label>
                  <Input 
                    type="number" 
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    placeholder="Enter max marks"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Enter Student Scores</CardTitle>
                  <CardDescription>Input marks obtained by each student</CardDescription>
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Score (out of {maxMarks})</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const score = parseFloat(student.score) || 0;
                    const percentage = maxMarks ? (score / parseFloat(maxMarks)) * 100 : 0;
                    const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : percentage >= 70 ? "B" : percentage >= 60 ? "C" : percentage >= 50 ? "D" : "F";
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-mono">{student.rollNo}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={student.score}
                            onChange={(e) => updateScore(student.id, e.target.value)}
                            placeholder="0"
                            className="w-24"
                            max={maxMarks}
                          />
                        </TableCell>
                        <TableCell>
                          {student.score ? `${percentage.toFixed(1)}%` : "-"}
                        </TableCell>
                        <TableCell>
                          {student.score ? (
                            <span className={`font-semibold ${
                              grade === "A+" || grade === "A" ? "text-success" :
                              grade === "B" ? "text-accent-foreground" :
                              "text-destructive"
                            }`}>
                              {grade}
                            </span>
                          ) : "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
