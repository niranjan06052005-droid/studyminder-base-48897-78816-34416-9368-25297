import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, LogOut, Search, MoreVertical, Eye } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface Student {
  id: string;
  name: string;
  std: string;
  contact: string;
}

const AdminStudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const students: Student[] = [
    { id: "STU001", name: "Raj Kumar", std: "10th - A", contact: "98765-43210" },
    { id: "STU002", name: "Priya Singh", std: "9th - B", contact: "87654-32109" },
    { id: "STU003", name: "Amit Sharma", std: "8th - A", contact: "76543-21098" },
    { id: "STU004", name: "Neha Patel", std: "10th - C", contact: "65432-10987" },
    { id: "STU005", name: "Rohit Verma", std: "9th - A", contact: "54321-09876" },
    { id: "STU006", name: "Anjali Desai", std: "10th - B", contact: "43210-98765" },
    { id: "STU007", name: "Vikram Gupta", std: "8th - B", contact: "32109-87654" },
    { id: "STU008", name: "Pooja Reddy", std: "9th - C", contact: "21098-76543" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.std.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Student Management</h2>
            <p className="text-muted-foreground">Here's what's classes with resources efficiently</p>
          </div>

          {/* Controls */}
          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button variant="outline" className="whitespace-nowrap">
                Filter by Standard
              </Button>
              
              <Button 
                className="whitespace-nowrap bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                onClick={() => navigate("/admin/students/add")}
              >
                + Add New Student
              </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Student ID</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Std</TableHead>
                    <TableHead className="font-semibold">Contact No</TableHead>
                    <TableHead className="font-semibold">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.std}</TableCell>
                      <TableCell>{student.contact}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/admin/students/${student.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminStudentManagement;
