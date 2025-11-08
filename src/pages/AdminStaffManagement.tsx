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

interface Staff {
  id: string;
  name: string;
  section: string;
  contact: string;
}

const AdminStaffManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const staff: Staff[] = [
    { id: "STF001", name: "Dr. Rajesh Kumar", section: "Mathematics", contact: "98765-43210" },
    { id: "STF002", name: "Mrs. Priya Sharma", section: "Science", contact: "87654-32109" },
    { id: "STF003", name: "Mr. Amit Patel", section: "English", contact: "76543-21098" },
    { id: "STF004", name: "Ms. Neha Gupta", section: "History", contact: "65432-10987" },
    { id: "STF005", name: "Prof. Rohit Singh", section: "Physics", contact: "54321-09876" },
    { id: "STF006", name: "Mrs. Anjali Reddy", section: "Chemistry", contact: "43210-98765" },
    { id: "STF007", name: "Mr. Vikram Desai", section: "Computer Science", contact: "32109-87654" },
    { id: "STF008", name: "Dr. Pooja Verma", section: "Biology", contact: "21098-76543" },
  ];

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.section.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h2 className="text-3xl font-bold text-primary mb-2">Staff Management</h2>
            <p className="text-muted-foreground">Manage your teaching staff and resources efficiently</p>
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
                Filter by Role
              </Button>
              
              <Button className="whitespace-nowrap bg-[#3b82f6] hover:bg-[#2563eb] text-white">
                + Add New Staff
              </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Staff ID</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold">Contact No</TableHead>
                    <TableHead className="font-semibold">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member) => (
                    <TableRow key={member.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.section}</TableCell>
                      <TableCell>{member.contact}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/admin/staff/${member.id}`)}
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

export default AdminStaffManagement;
