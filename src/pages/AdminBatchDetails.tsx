import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Home, ArrowLeft, Users, UserCheck, TrendingUp, DollarSign, BookOpen, Calendar, MessageSquare, Award, Trophy, Target, RefreshCw } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AdminBatchDetails = () => {
  const { batchId } = useParams();
  const [activeTab, setActiveTab] = useState("status");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [studentIdInput, setStudentIdInput] = useState("");
  const [validatedStudent, setValidatedStudent] = useState<{ id: string; name: string } | null>(null);
  const [changeTeacherOpen, setChangeTeacherOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedNewTeacher, setSelectedNewTeacher] = useState<string>("");

  // Mock available teachers
  const availableTeachers = [
    { id: "T001", name: "Mr. Sharma", subject: "Mathematics", qualification: "M.Sc Mathematics" },
    { id: "T002", name: "Dr. Verma", subject: "Science", qualification: "Ph.D Physics" },
    { id: "T003", name: "Ms. Patel", subject: "English", qualification: "M.A English" },
    { id: "T004", name: "Mr. Kumar", subject: "Social Studies", qualification: "M.A History" },
    { id: "T005", name: "Mrs. Gupta", subject: "Hindi", qualification: "M.A Hindi" },
    { id: "T006", name: "Mr. Singh", subject: "Mathematics", qualification: "B.Sc Mathematics, B.Ed" },
    { id: "T007", name: "Ms. Reddy", subject: "Science", qualification: "M.Sc Chemistry" },
  ];

  const handleChangeTeacher = () => {
    if (!selectedNewTeacher) {
      toast.error("Please select a new teacher");
      return;
    }
    const teacher = availableTeachers.find(t => t.id === selectedNewTeacher);
    toast.success(`Teacher changed to ${teacher?.name} for ${selectedSubject}!`);
    setChangeTeacherOpen(false);
    setSelectedSubject("");
    setSelectedNewTeacher("");
  };

  // Mock student database for validation
  const studentDatabase: Record<string, string> = {
    "S001": "Amit Kumar",
    "S002": "Priya Sharma",
    "S003": "Rahul Verma",
    "S004": "Sneha Patel",
    "S005": "Arjun Singh",
    "S006": "Divya Reddy",
    "S007": "Karan Malhotra",
    "S008": "Neha Singh"
  };

  const handleStudentIdChange = (value: string) => {
    setStudentIdInput(value.toUpperCase());
    const studentName = studentDatabase[value.toUpperCase()];
    if (studentName) {
      setValidatedStudent({ id: value.toUpperCase(), name: studentName });
    } else {
      setValidatedStudent(null);
    }
  };

  const handleAddStudent = () => {
    if (!validatedStudent) {
      toast.error("Please enter a valid student ID");
      return;
    }
    toast.success(`${validatedStudent.name} has been added to the batch!`);
    setAddStudentOpen(false);
    setStudentIdInput("");
    setValidatedStudent(null);
  };

  // Mock data
  const batchInfo = {
    name: "9th Standard - Section A",
    totalStudents: 42,
    assignedTeachers: 5,
    avgAttendance: 91,
    feeCollection: 88,
    feeCollectionDate: "Oct 8th, 2025"
  };

  const subjectProgress = [
    { subject: "Mathematics", teacher: "Mr. Sharma", totalChapters: 15, completedChapters: 12, progress: 80, testsCount: 8, avgScore: 76, color: "hsl(210, 86%, 16%)" },
    { subject: "Science", teacher: "Dr. Verma", totalChapters: 18, completedChapters: 14, progress: 78, testsCount: 7, avgScore: 82, color: "hsl(184, 75%, 35%)" },
    { subject: "English", teacher: "Ms. Patel", totalChapters: 12, completedChapters: 10, progress: 83, testsCount: 6, avgScore: 79, color: "hsl(38, 95%, 56%)" },
    { subject: "Social Studies", teacher: "Mr. Kumar", totalChapters: 14, completedChapters: 9, progress: 64, testsCount: 5, avgScore: 71, color: "hsl(134, 61%, 41%)" },
    { subject: "Hindi", teacher: "Mrs. Gupta", totalChapters: 10, completedChapters: 8, progress: 80, testsCount: 5, avgScore: 85, color: "hsl(0, 84%, 60%)" },
  ];

  const topPerformers = [
    { name: "Amit Kumar", score: 94, tests: 8, consistency: 95 },
    { name: "Priya Sharma", score: 92, tests: 8, consistency: 93 },
    { name: "Rahul Verma", score: 89, tests: 7, consistency: 88 },
  ];

  const consistentPerformers = [
    { name: "Sneha Patel", avgScore: 85, consistency: 97, testsAttended: 8 },
    { name: "Arjun Singh", avgScore: 82, consistency: 95, testsAttended: 8 },
    { name: "Divya Reddy", avgScore: 80, consistency: 94, testsAttended: 7 },
  ];

  const students = [
    { id: "S001", name: "Amit Kumar", contact: "+91 98765 43210", attendance: 95, feeStatus: "Paid" },
    { id: "S002", name: "Priya Sharma", contact: "+91 98765 43211", attendance: 92, feeStatus: "Paid" },
    { id: "S003", name: "Rahul Verma", contact: "+91 98765 43212", attendance: 88, feeStatus: "Pending" },
    { id: "S004", name: "Sneha Patel", contact: "+91 98765 43213", attendance: 97, feeStatus: "Paid" },
    { id: "S005", name: "Arjun Singh", contact: "+91 98765 43214", attendance: 90, feeStatus: "Paid" },
  ];

  const timetable = {
    Monday: [
      { time: "9:00 AM - 10:00 AM", subject: "Mathematics", teacher: "Mr. Sharma" },
      { time: "10:15 AM - 11:15 AM", subject: "Science", teacher: "Dr. Verma" },
      { time: "11:30 AM - 12:30 PM", subject: "English", teacher: "Ms. Patel" },
    ],
    Tuesday: [
      { time: "9:00 AM - 10:00 AM", subject: "Hindi", teacher: "Mrs. Gupta" },
      { time: "10:15 AM - 11:15 AM", subject: "Social Studies", teacher: "Mr. Kumar" },
      { time: "11:30 AM - 12:30 PM", subject: "Mathematics", teacher: "Mr. Sharma" },
    ],
    Wednesday: [
      { time: "9:00 AM - 10:00 AM", subject: "Science", teacher: "Dr. Verma" },
      { time: "10:15 AM - 11:15 AM", subject: "English", teacher: "Ms. Patel" },
      { time: "11:30 AM - 12:30 PM", subject: "Hindi", teacher: "Mrs. Gupta" },
    ],
  };

  const chartConfig = {
    completed: { label: "Completed", color: "hsl(134, 61%, 41%)" },
    remaining: { label: "Remaining", color: "hsl(210, 20%, 94%)" },
  };

  const testChartData = subjectProgress.map(s => ({
    subject: s.subject,
    tests: s.testsCount,
    avgScore: s.avgScore
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/batches">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Manage Batch: {batchInfo.name}</h1>
            </div>
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
          {/* Subtitle */}
          <p className="text-muted-foreground mb-6">Here's what's classes with resources efficiently</p>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
            <Card className="gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold text-primary">{batchInfo.totalStudents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <UserCheck className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Assigned Teachers</p>
                    <p className="text-2xl font-bold text-accent">{batchInfo.assignedTeachers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Average Attendance</p>
                    <p className="text-2xl font-bold text-secondary">{batchInfo.avgAttendance}%</p>
                    <p className="text-[10px] text-muted-foreground">{batchInfo.feeCollectionDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Fee Collection Status</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-success">{batchInfo.feeCollection}%</p>
                      <Progress value={batchInfo.feeCollection} className="flex-1 h-2" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">View all fees, 20th</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="status">Batch Status</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="teachers">Teachers & Subjects</TabsTrigger>
              <TabsTrigger value="timetable">Timetable</TabsTrigger>
            </TabsList>

            {/* Batch Status Tab */}
            <TabsContent value="status" className="space-y-6">
              {/* Subject Progress Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary mb-4">Subject Coverage Status</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {subjectProgress.map((subject, index) => (
                    <Card key={index} className="gradient-card hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg text-foreground">{subject.subject}</h4>
                            <p className="text-xs text-muted-foreground">{subject.teacher}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">{subject.progress}%</div>
                            <p className="text-[10px] text-muted-foreground">Complete</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-muted-foreground">{subject.completedChapters}/{subject.totalChapters} Chapters</span>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                          <div className="text-center">
                            <BookOpen className="h-3.5 w-3.5 text-primary mx-auto mb-1" />
                            <div className="text-base font-semibold text-foreground">{subject.totalChapters}</div>
                            <div className="text-[10px] text-muted-foreground">Chapters</div>
                          </div>
                          <div className="text-center">
                            <Target className="h-3.5 w-3.5 text-secondary mx-auto mb-1" />
                            <div className="text-base font-semibold text-foreground">{subject.testsCount}</div>
                            <div className="text-[10px] text-muted-foreground">Tests</div>
                          </div>
                          <div className="text-center">
                            <Award className="h-3.5 w-3.5 text-success mx-auto mb-1" />
                            <div className="text-base font-semibold text-foreground">{subject.avgScore}%</div>
                            <div className="text-[10px] text-muted-foreground">Avg Score</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Visual Representation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">Chapter Coverage Distribution</CardTitle>
                    <CardDescription>Visual breakdown of completed vs remaining chapters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={subjectProgress.map(s => ({
                              name: s.subject,
                              value: s.completedChapters,
                              color: s.color
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {subjectProgress.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-accent" />
                      Top Scorers
                    </CardTitle>
                    <CardDescription>Highest average scores across all tests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPerformers.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.tests} tests attended</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-success">{student.score}%</p>
                            <p className="text-xs text-muted-foreground">Avg Score</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-primary">Student List</h3>
                <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
                  <DialogTrigger asChild>
                    <Button>+ Add Student to Batch</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Student to Batch</DialogTitle>
                      <DialogDescription>
                        Enter the student ID to add them to this batch.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          placeholder="Enter student ID (e.g., S001)"
                          value={studentIdInput}
                          onChange={(e) => handleStudentIdChange(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentName">Student Name</Label>
                        <Input
                          id="studentName"
                          placeholder="Will appear after valid ID"
                          value={validatedStudent?.name || ""}
                          disabled
                          className={validatedStudent ? "text-success" : ""}
                        />
                        {studentIdInput && !validatedStudent && (
                          <p className="text-xs text-destructive">Invalid student ID</p>
                        )}
                        {validatedStudent && (
                          <p className="text-xs text-success">Student found!</p>
                        )}
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button 
                          onClick={handleAddStudent} 
                          disabled={!validatedStudent}
                          className="flex-1"
                        >
                          Add Student
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setAddStudentOpen(false);
                            setStudentIdInput("");
                            setValidatedStudent(null);
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Fee Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.contact}</TableCell>
                          <TableCell>
                            <span className={student.attendance >= 90 ? "text-success" : student.attendance >= 75 ? "text-accent" : "text-destructive"}>
                              {student.attendance}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs ${student.feeStatus === "Paid" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                              {student.feeStatus}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View Profile</Button>
                              <Button variant="ghost" size="sm">Remove</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teachers & Subjects Tab */}
            <TabsContent value="teachers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-primary">Subject-Teacher Mapping</h3>
                <Link to={`/admin/batches/${batchId}/assign-teacher`}>
                  <Button>+ Assign Subject/Teacher</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjectProgress.map((subject, index) => (
                  <Card key={index} className="gradient-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{subject.subject}</CardTitle>
                          <CardDescription>Teacher: {subject.teacher}</CardDescription>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-primary">{subject.testsCount}</span>
                          <p className="text-xs text-muted-foreground">Tests</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-2 pt-2">
                        <Dialog open={changeTeacherOpen && selectedSubject === subject.subject} onOpenChange={(open) => {
                          setChangeTeacherOpen(open);
                          if (open) setSelectedSubject(subject.subject);
                          if (!open) {
                            setSelectedSubject("");
                            setSelectedNewTeacher("");
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Change Teacher
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Change Teacher</DialogTitle>
                              <DialogDescription>
                                Select a new teacher for {subject.subject}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">Current Teacher</p>
                                <p className="font-medium">{subject.teacher}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="newTeacher">Select New Teacher</Label>
                                <Select value={selectedNewTeacher} onValueChange={setSelectedNewTeacher}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose a teacher" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-background">
                                    {availableTeachers
                                      .filter(t => t.subject === subject.subject || t.subject === "Mathematics" || t.subject === "Science")
                                      .map(teacher => (
                                        <SelectItem key={teacher.id} value={teacher.id}>
                                          <div className="flex flex-col">
                                            <span>{teacher.name}</span>
                                            <span className="text-xs text-muted-foreground">{teacher.qualification}</span>
                                          </div>
                                        </SelectItem>
                                      ))
                                    }
                                  </SelectContent>
                                </Select>
                              </div>

                              {selectedNewTeacher && (
                                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                  <p className="text-sm text-muted-foreground">New Assignment Preview</p>
                                  <p className="font-medium text-primary">
                                    {availableTeachers.find(t => t.id === selectedNewTeacher)?.name} → {subject.subject}
                                  </p>
                                </div>
                              )}

                              <div className="flex gap-2 pt-2">
                                <Button 
                                  onClick={handleChangeTeacher} 
                                  className="flex-1"
                                  disabled={!selectedNewTeacher}
                                >
                                  Confirm Change
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={() => {
                                    setChangeTeacherOpen(false);
                                    setSelectedSubject("");
                                    setSelectedNewTeacher("");
                                  }}
                                  className="flex-1"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Timetable Tab */}
            <TabsContent value="timetable" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-primary">Weekly Schedule</h3>
                <Link to={`/admin/batches/${batchId}/edit-timetable`}>
                  <Button>Edit Timetable</Button>
                </Link>
              </div>

              <div className="space-y-6">
                {Object.entries(timetable).map(([day, slots]) => (
                  <Card key={day}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {slots.map((slot, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium">{slot.time}</p>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-primary">{slot.subject}</p>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground">{slot.teacher}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminBatchDetails;
