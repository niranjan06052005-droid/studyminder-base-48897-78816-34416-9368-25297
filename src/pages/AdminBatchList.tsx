import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Home, Plus, Users, UserCheck, TrendingUp } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const AdminBatchList = () => {
  const batches = [
    { id: "9a", name: "9th Standard - Section A", students: 42, teachers: 5, attendance: 91 },
    { id: "9b", name: "9th Standard - Section B", students: 38, teachers: 5, attendance: 88 },
    { id: "10a", name: "10th Standard - Section A", students: 45, teachers: 6, attendance: 93 },
    { id: "10b", name: "10th Standard - Section B", students: 40, teachers: 6, attendance: 89 },
    { id: "11sci", name: "11th Standard - Science", students: 35, teachers: 7, attendance: 90 },
    { id: "11com", name: "11th Standard - Commerce", students: 28, teachers: 5, attendance: 87 },
    { id: "12sci", name: "12th Standard - Science", students: 32, teachers: 7, attendance: 92 },
    { id: "12com", name: "12th Standard - Commerce", students: 25, teachers: 5, attendance: 86 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Batch Management</h1>
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
          {/* Header Section */}
          <div className="mb-8 flex justify-between items-center animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">All Batches</h2>
              <p className="text-muted-foreground">Manage and monitor all coaching batches</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create New Batch
            </Button>
          </div>

          {/* Batch Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <Card key={batch.id} className="gradient-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{batch.name}</CardTitle>
                  <CardDescription>Active Batch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-primary">{batch.students}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <UserCheck className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="text-2xl font-bold text-secondary">{batch.teachers}</div>
                      <div className="text-xs text-muted-foreground">Teachers</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                      <div className="text-2xl font-bold text-success">{batch.attendance}%</div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                    </div>
                  </div>
                  
                  <Link to={`/admin/batches/${batch.id}`}>
                    <Button className="w-full" variant="outline">
                      View Batch
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBatchList;
