import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, LogOut, Calendar, UserCheck, UserX, Users, Save } from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const mockStudents = [
  { id: 1, name: "Aarav Sharma", rollNo: "10A01", attendance: null },
  { id: 2, name: "Diya Patel", rollNo: "10A02", attendance: null },
  { id: 3, name: "Rohan Kumar", rollNo: "10A03", attendance: null },
  { id: 4, name: "Ananya Singh", rollNo: "10A04", attendance: null },
  { id: 5, name: "Arjun Mehta", rollNo: "10A05", attendance: null },
  { id: 6, name: "Priya Desai", rollNo: "10A06", attendance: null },
  { id: 7, name: "Vihaan Joshi", rollNo: "10A07", attendance: null },
  { id: 8, name: "Isha Reddy", rollNo: "10A08", attendance: null },
  { id: 9, name: "Aditya Gupta", rollNo: "10A09", attendance: null },
  { id: 10, name: "Kavya Nair", rollNo: "10A10", attendance: null },
];

export default function TeacherAttendance() {
  const [selectedBatch, setSelectedBatch] = useState("class10a");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState(mockStudents);

  const toggleAttendance = (studentId: number, status: 'present' | 'absent') => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, attendance: student.attendance === status ? null : status }
        : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, attendance: 'present' as const })));
  };

  const handleSave = () => {
    toast.success("Attendance saved successfully!");
  };

  const presentCount = students.filter(s => s.attendance === 'present').length;
  const absentCount = students.filter(s => s.attendance === 'absent').length;
  const totalCount = students.length;

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Mark Attendance</h1>
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
            <h2 className="text-3xl font-bold text-primary mb-2">Attendance Management</h2>
            <p className="text-muted-foreground">Mark student attendance for your classes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{totalCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Present</p>
                    <p className="text-2xl font-bold text-success">{presentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <UserX className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Absent</p>
                    <p className="text-2xl font-bold text-destructive">{absentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance %</p>
                    <p className="text-2xl font-bold">
                      {totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Batch & Date</CardTitle>
              <CardDescription>Choose the batch and date for attendance marking</CardDescription>
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
                  <label className="text-sm font-medium mb-2 block">Select Date</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={markAllPresent} className="w-full bg-success text-success-foreground hover:bg-success/90">
                    Mark All Present
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>Mark each student as present or absent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-muted-foreground w-16">{student.rollNo}</span>
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={student.attendance === 'present' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleAttendance(student.id, 'present')}
                        className={student.attendance === 'present' ? 'bg-success text-success-foreground hover:bg-success/90' : ''}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Present
                      </Button>
                      <Button
                        variant={student.attendance === 'absent' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleAttendance(student.id, 'absent')}
                        className={student.attendance === 'absent' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Absent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSave} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
