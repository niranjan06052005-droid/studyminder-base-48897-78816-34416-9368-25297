import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, DollarSign, TrendingUp, UserCheck, LogOut, Home, AlertCircle, ClockAlert, UserPlus, CalendarX } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const AdminDashboard = () => {
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
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome, Admin!</h2>
            <p className="text-muted-foreground">Overview of your coaching institute's performance</p>
          </div>

          {/* Pending Actions - Critical Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-destructive mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Pending Actions - Requires Attention
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fee Payments Overdue */}
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-destructive" />
                      <CardTitle className="text-lg text-destructive">Fee Payments Overdue</CardTitle>
                    </div>
                  </div>
                  <CardDescription>Students whose fee deadlines have passed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-4xl font-bold text-destructive">23</p>
                    <p className="text-sm text-muted-foreground mt-1">Total overdue: ₹3.2L</p>
                  </div>
                  <Link to="/admin/fees">
                    <Button variant="destructive" size="sm" className="w-full">
                      Review Payments
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Attendance to Review */}
              <Card className="border-orange-500/50 bg-orange-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarX className="h-5 w-5 text-orange-600" />
                      <CardTitle className="text-lg text-orange-600 dark:text-orange-500">Attendance to Review</CardTitle>
                    </div>
                  </div>
                  <CardDescription>Classes where attendance is not marked</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-4xl font-bold text-orange-600 dark:text-orange-500">7</p>
                    <p className="text-sm text-muted-foreground mt-1">Classes pending review</p>
                  </div>
                  <Link to="/admin/batches">
                    <Button variant="outline" size="sm" className="w-full border-orange-500 text-orange-600 hover:bg-orange-500/10">
                      View Classes
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* New Inquiries/Admissions */}
              <Card className="border-blue-500/50 bg-blue-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg text-blue-600 dark:text-blue-500">New Inquiries</CardTitle>
                    </div>
                  </div>
                  <CardDescription>Student applications awaiting review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-500">12</p>
                    <p className="text-sm text-muted-foreground mt-1">Pending admissions</p>
                  </div>
                  <Link to="/admin/students">
                    <Button variant="outline" size="sm" className="w-full border-blue-500 text-blue-600 hover:bg-blue-500/10">
                      Review Applications
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Students
                </CardDescription>
                <CardTitle className="text-4xl text-primary">456</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-success">
                  <TrendingUp className="inline h-4 w-4" /> +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Total Staff
                </CardDescription>
                <CardTitle className="text-4xl text-primary">24</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">18 Teachers, 6 Support</p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Monthly Collection
                </CardDescription>
                <CardTitle className="text-4xl text-success">87%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">₹12.8L of ₹14.7L</p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Attendance Today
                </CardDescription>
                <CardTitle className="text-4xl text-success">94%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">428 of 456 students</p>
              </CardContent>
            </Card>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
