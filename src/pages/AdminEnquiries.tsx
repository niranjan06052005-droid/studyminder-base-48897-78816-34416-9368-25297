import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, LogOut, Eye, Phone, Mail, Calendar, User, Users, BookOpen, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminSidebar from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";

interface Enquiry {
  id: string;
  parentName: string;
  childName: string;
  section: string;
  standard: string;
  contactNo: string;
  description: string;
  status: "new" | "contacted" | "scheduled" | "enrolled" | "rejected";
  submittedAt: string;
}

const mockEnquiries: Enquiry[] = [
  {
    id: "ENQ001",
    parentName: "Rajesh Kumar",
    childName: "Arjun Kumar",
    section: "Primary",
    standard: "Standard 3",
    contactNo: "9876543210",
    description: "Looking for admission in next academic year. Child is currently studying in another school.",
    status: "new",
    submittedAt: "2024-12-14T10:30:00"
  },
  {
    id: "ENQ002",
    parentName: "Priya Sharma",
    childName: "Ananya Sharma",
    section: "Middle",
    standard: "Standard 6",
    contactNo: "9123456789",
    description: "Interested in science-focused curriculum. Please share fee details.",
    status: "new",
    submittedAt: "2024-12-14T09:15:00"
  },
  {
    id: "ENQ003",
    parentName: "Amit Patel",
    childName: "Riya Patel",
    section: "Secondary",
    standard: "Standard 9",
    contactNo: "9988776655",
    description: "Need information about board exam preparation batches.",
    status: "contacted",
    submittedAt: "2024-12-13T16:45:00"
  },
  {
    id: "ENQ004",
    parentName: "Sunita Verma",
    childName: "Karan Verma",
    section: "Primary",
    standard: "Standard 1",
    contactNo: "9567890123",
    description: "",
    status: "scheduled",
    submittedAt: "2024-12-13T11:20:00"
  },
  {
    id: "ENQ005",
    parentName: "Deepak Gupta",
    childName: "Ishaan Gupta",
    section: "Middle",
    standard: "Standard 7",
    contactNo: "9234567890",
    description: "Transferring from another city. Need mid-year admission.",
    status: "enrolled",
    submittedAt: "2024-12-12T14:00:00"
  },
];

const AdminEnquiries = () => {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusBadge = (status: Enquiry["status"]) => {
    const styles = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      scheduled: "bg-purple-100 text-purple-800 border-purple-200",
      enrolled: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status];
  };

  const getStatusLabel = (status: Enquiry["status"]) => {
    const labels = {
      new: "New",
      contacted: "Contacted",
      scheduled: "Visit Scheduled",
      enrolled: "Enrolled",
      rejected: "Rejected",
    };
    return labels[status];
  };

  const handleStatusChange = (enquiryId: string, newStatus: Enquiry["status"]) => {
    setEnquiries(prev => 
      prev.map(enq => 
        enq.id === enquiryId ? { ...enq, status: newStatus } : enq
      )
    );
    toast({
      title: "Status Updated",
      description: `Enquiry status changed to ${getStatusLabel(newStatus)}`,
    });
  };

  const filteredEnquiries = filterStatus === "all" 
    ? enquiries 
    : enquiries.filter(enq => enq.status === filterStatus);

  const newEnquiriesCount = enquiries.filter(e => e.status === "new").length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b border-border px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admission Enquiries</h1>
            <p className="text-muted-foreground text-sm">Review and manage parent enquiries</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Enquiries</p>
                    <p className="text-2xl font-bold text-blue-600">{newEnquiriesCount}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Contacted</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {enquiries.filter(e => e.status === "contacted").length}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Visit Scheduled</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {enquiries.filter(e => e.status === "scheduled").length}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Enrolled</p>
                    <p className="text-2xl font-bold text-green-600">
                      {enquiries.filter(e => e.status === "enrolled").length}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enquiries Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                All Enquiries
              </CardTitle>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="all">All Enquiries</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="scheduled">Visit Scheduled</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Parent Name</TableHead>
                    <TableHead>Child Name</TableHead>
                    <TableHead>Section / Standard</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id} className={enquiry.status === "new" ? "bg-blue-50/50" : ""}>
                      <TableCell className="font-medium">{enquiry.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {enquiry.parentName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {enquiry.childName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          {enquiry.section} - {enquiry.standard}
                        </div>
                      </TableCell>
                      <TableCell>
                        <a href={`tel:${enquiry.contactNo}`} className="flex items-center gap-2 text-primary hover:underline">
                          <Phone className="h-4 w-4" />
                          {enquiry.contactNo}
                        </a>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(enquiry.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(enquiry.status)}>
                          {getStatusLabel(enquiry.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEnquiry(enquiry)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredEnquiries.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No enquiries found with the selected filter.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Enquiry Detail Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Enquiry Details - {selectedEnquiry?.id}
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedEnquiry && formatDate(selectedEnquiry.submittedAt)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" /> Parent's Name
                  </p>
                  <p className="font-medium">{selectedEnquiry.parentName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" /> Child's Name
                  </p>
                  <p className="font-medium">{selectedEnquiry.childName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Section
                  </p>
                  <p className="font-medium">{selectedEnquiry.section}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Standard
                  </p>
                  <p className="font-medium">{selectedEnquiry.standard}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Contact Number
                </p>
                <a href={`tel:${selectedEnquiry.contactNo}`} className="font-medium text-primary hover:underline">
                  +91 {selectedEnquiry.contactNo}
                </a>
              </div>
              
              {selectedEnquiry.description && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Additional Information
                  </p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedEnquiry.description}</p>
                </div>
              )}
              
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {(["new", "contacted", "scheduled", "enrolled", "rejected"] as const).map((status) => (
                    <Button
                      key={status}
                      variant={selectedEnquiry.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        handleStatusChange(selectedEnquiry.id, status);
                        setSelectedEnquiry({ ...selectedEnquiry, status });
                      }}
                      className={selectedEnquiry.status === status ? "" : getStatusBadge(status)}
                    >
                      {status === "enrolled" && <CheckCircle className="h-4 w-4 mr-1" />}
                      {status === "rejected" && <XCircle className="h-4 w-4 mr-1" />}
                      {getStatusLabel(status)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEnquiries;
