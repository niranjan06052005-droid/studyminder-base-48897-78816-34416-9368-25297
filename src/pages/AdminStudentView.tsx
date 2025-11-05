import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Home, LogOut, ArrowLeft, Mail, Phone, MapPin, Calendar, BookOpen, Award, TrendingUp } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const AdminStudentView = () => {
  const { studentId } = useParams();

  // Mock student data - would come from API/database
  const student = {
    id: studentId || "STU001",
    name: "Raj Kumar",
    email: "raj.kumar@email.com",
    phone: "98765-43210",
    standard: "10th - A",
    rollNumber: "10A23",
    dateOfBirth: "15 March 2009",
    joiningDate: "1 April 2023",
    address: "123 Main Street, Mumbai, Maharashtra",
    fatherName: "Ramesh Kumar",
    motherName: "Sunita Kumar",
    guardianContact: "98765-43210",
    bloodGroup: "O+",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies"],
    attendance: "92%",
    overallGrade: "A+",
    lastTestScore: "87%",
    feesStatus: "Paid",
    dueAmount: "₹0"
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Admin Portal</h1>
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
          {/* Back Button */}
          <Link to="/admin/students">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Student Management
            </Button>
          </Link>

          {/* Student Profile Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-primary mb-2">{student.name}</h2>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{student.standard}</Badge>
                        <Badge variant="outline">Roll No: {student.rollNumber}</Badge>
                        <Badge className="bg-success">Active</Badge>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Button variant="outline">Edit Details</Button>
                      <Button variant="destructive">Delete Student</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{student.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Joined</p>
                        <p className="font-medium">{student.joiningDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                    <p className="text-2xl font-bold">{student.attendance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Grade</p>
                    <p className="text-2xl font-bold">{student.overallGrade}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Test</p>
                    <p className="text-2xl font-bold">{student.lastTestScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <span className="text-xl">₹</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fee Status</p>
                    <p className="text-lg font-bold text-success">{student.feesStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{student.dateOfBirth}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-medium">{student.bloodGroup}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{student.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Guardian Information */}
            <Card>
              <CardHeader>
                <CardTitle>Guardian Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Father's Name</p>
                  <p className="font-medium">{student.fatherName}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Mother's Name</p>
                  <p className="font-medium">{student.motherName}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Guardian Contact</p>
                  <p className="font-medium">{student.guardianContact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground mb-2">Enrolled Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {student.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fee Information */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fee Status</p>
                  <Badge className="mt-1 bg-success">{student.feesStatus}</Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Due Amount</p>
                  <p className="font-medium text-lg">{student.dueAmount}</p>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Fee History
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudentView;
