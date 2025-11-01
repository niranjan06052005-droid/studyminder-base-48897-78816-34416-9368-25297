import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Home, LogOut, ClipboardList, FileText, Trophy, Award, Smile, DollarSign, Bell, Calendar, BookOpen, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const StudentAttendance = () => {
  // Mock data for overall attendance
  const overallAttendance = 86; // percentage
  const totalClasses = 120;
  const attendedClasses = 103;
  const absentClasses = 17;

  // Pie chart data
  const attendanceData = [
    { name: 'Present', value: attendedClasses, color: '#10b981' },
    { name: 'Absent', value: absentClasses, color: '#ef4444' }
  ];

  // Subject-wise attendance for bar chart
  const subjectAttendance = [
    { subject: 'Mathematics', percentage: 88, present: 22, total: 25 },
    { subject: 'Science', percentage: 90, present: 27, total: 30 },
    { subject: 'English', percentage: 85, present: 17, total: 20 },
    { subject: 'Social Studies', percentage: 82, present: 18, total: 22 },
    { subject: 'Marathi', percentage: 87, present: 13, total: 15 },
    { subject: 'Hindi', percentage: 84, present: 6, total: 8 }
  ];

  // Absent days with topics missed
  const absentDays = [
    { 
      date: "2025-10-18",
      day: "Monday",
      subject: "Mathematics",
      topic: "Quadratic Equations - Advanced Problems",
      period: "2nd Period (9:30 AM)"
    },
    { 
      date: "2025-10-15",
      day: "Friday",
      subject: "Science",
      topic: "Chemical Reactions and Equations",
      period: "3rd Period (10:30 AM)"
    },
    { 
      date: "2025-10-12",
      day: "Tuesday",
      subject: "English",
      topic: "Essay Writing - Descriptive Essays",
      period: "1st Period (8:30 AM)"
    },
    { 
      date: "2025-10-08",
      day: "Friday",
      subject: "Social Studies",
      topic: "Indian Freedom Movement - 1920-1947",
      period: "4th Period (11:30 AM)"
    },
    { 
      date: "2025-10-05",
      day: "Tuesday",
      subject: "Mathematics",
      topic: "Trigonometric Identities",
      period: "2nd Period (9:30 AM)"
    }
  ];

  // Monthly attendance trend
  const monthlyTrend = [
    { month: 'Jul', percentage: 92 },
    { month: 'Aug', percentage: 88 },
    { month: 'Sep', percentage: 85 },
    { month: 'Oct', percentage: 86 }
  ];

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
            
            <Link to="/student/report" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <ClipboardList className="h-5 w-5" />
              <span>My Report</span>
            </Link>
            
            <Link to="/student/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
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
            <h1 className="text-2xl font-bold text-primary">My Attendance</h1>
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

        <main className="flex-1 p-8 space-y-8">
          {/* Overall Attendance Overview */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Overall Attendance Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart Card */}
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Attendance Distribution</CardTitle>
                  <CardDescription>Total classes: {totalClasses}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {attendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Stats Card */}
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>Current academic year performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Attendance</span>
                      <span className={`text-2xl font-bold ${overallAttendance >= 85 ? 'text-success' : overallAttendance >= 75 ? 'text-accent' : 'text-destructive'}`}>
                        {overallAttendance}%
                      </span>
                    </div>
                    <Progress value={overallAttendance} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-success/10 p-4 rounded-lg border border-success/30">
                      <p className="text-sm text-muted-foreground mb-1">Classes Attended</p>
                      <p className="text-2xl font-bold text-success">{attendedClasses}</p>
                    </div>
                    <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
                      <p className="text-sm text-muted-foreground mb-1">Classes Missed</p>
                      <p className="text-2xl font-bold text-destructive">{absentClasses}</p>
                    </div>
                  </div>

                  {overallAttendance < 85 && (
                    <div className="flex gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Your attendance is below 85%. Please improve to meet minimum requirements.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Subject-wise Attendance */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Subject-wise Attendance</h2>
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Attendance by Subject</CardTitle>
                <CardDescription>Breakdown of your attendance across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectAttendance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
                                <p className="font-bold">{data.subject}</p>
                                <p className="text-sm">Present: {data.present}/{data.total}</p>
                                <p className="text-sm">Percentage: {data.percentage}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="percentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Monthly Attendance Trend</h2>
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
                <CardDescription>Your attendance pattern over the last few months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="percentage" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Absent Days & Missed Topics */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Absent Days & Topics Missed</h2>
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle>Recent Absences</CardTitle>
                </div>
                <CardDescription>
                  Topics covered on days you were absent - Make sure to catch up!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Topic Missed</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {absentDays.map((day, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{day.date}</TableCell>
                        <TableCell>{day.day}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            {day.subject}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <span className="text-sm">{day.topic}</span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {day.period}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Notes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="gradient-card hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Request Leave</CardTitle>
                  <CardDescription>Submit a leave application</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Apply for Leave
                  </Button>
                </CardContent>
              </Card>

              <Card className="gradient-card hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Download Report</CardTitle>
                  <CardDescription>Get detailed attendance report</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="gradient-card hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">View Calendar</CardTitle>
                  <CardDescription>See full attendance calendar</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Open Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAttendance;
