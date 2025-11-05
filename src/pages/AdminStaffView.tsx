import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Home, LogOut, ArrowLeft, Mail, Phone, Calendar, BookOpen, Users, Clock, Award } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const AdminStaffView = () => {
  const { staffId } = useParams();

  // Mock staff data - would come from API/database
  const staff = {
    id: staffId || "STF001",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "98765-43210",
    section: "Mathematics",
    role: "Senior Teacher",
    employeeId: "EMP2023001",
    dateOfBirth: "20 January 1985",
    joiningDate: "15 July 2018",
    qualification: "M.Sc Mathematics, B.Ed",
    experience: "12 years",
    address: "456 Park Avenue, Mumbai, Maharashtra",
    emergencyContact: "98765-54321",
    salary: "₹75,000/month",
    classes: ["Class 10 A - Mathematics", "Class 10 B - Mathematics", "Class 9 A - Mathematics"],
    schedule: "Mon-Fri: 9:00 AM - 4:00 PM",
    totalStudents: 85,
    attendance: "96%",
    performanceRating: "Excellent"
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
          <Link to="/admin/staff">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Staff Management
            </Button>
          </Link>

          {/* Staff Profile Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {staff.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-primary mb-2">{staff.name}</h2>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{staff.role}</Badge>
                        <Badge variant="outline">{staff.section}</Badge>
                        <Badge className="bg-success">Active</Badge>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Button variant="outline">Edit Details</Button>
                      <Button variant="destructive">Remove Staff</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{staff.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{staff.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Joined</p>
                        <p className="font-medium">{staff.joiningDate}</p>
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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Classes</p>
                    <p className="text-2xl font-bold">{staff.classes.length}</p>
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
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{staff.totalStudents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attendance</p>
                    <p className="text-2xl font-bold">{staff.attendance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="text-lg font-bold text-success">{staff.performanceRating}</p>
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
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-medium">{staff.employeeId}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{staff.dateOfBirth}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{staff.address}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium">{staff.emergencyContact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Qualification</p>
                  <p className="font-medium">{staff.qualification}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{staff.experience}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Subject Specialization</p>
                  <p className="font-medium">{staff.section}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Schedule</p>
                  <p className="font-medium">{staff.schedule}</p>
                </div>
              </CardContent>
            </Card>

            {/* Classes Assigned */}
            <Card>
              <CardHeader>
                <CardTitle>Classes Assigned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {staff.classes.map((className, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium">{className}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Salary Information */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Salary</p>
                  <p className="font-medium text-2xl text-success">{staff.salary}</p>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  View Salary History
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStaffView;
