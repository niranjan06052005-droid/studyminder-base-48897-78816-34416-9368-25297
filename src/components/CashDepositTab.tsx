import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Banknote, CheckCircle, XCircle, Clock, AlertCircle, MoreVertical, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CashDepositRequest {
  id: string;
  studentName: string;
  standard: string;
  installment: string;
  amount: number;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

const CashDepositTab = () => {
  const [requests, setRequests] = useState<CashDepositRequest[]>([
    { id: "cd-1", studentName: "Raj Kumar", standard: "9th - A", installment: "September", amount: 5000, requestDate: "2025-09-10", status: "pending" },
    { id: "cd-2", studentName: "Sneha Patil", standard: "7th - B", installment: "June", amount: 4500, requestDate: "2025-06-12", status: "approved" },
    { id: "cd-3", studentName: "Amit Sharma", standard: "10th - A", installment: "September", amount: 6000, requestDate: "2025-09-08", status: "pending" },
    { id: "cd-4", studentName: "Priya Desai", standard: "8th - A", installment: "June", amount: 5000, requestDate: "2025-06-14", status: "rejected" },
  ]);

  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; id: string; action: "approve" | "reject" }>({ open: false, id: "", action: "approve" });

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const approvedCount = requests.filter(r => r.status === "approved").length;
  const totalPendingAmount = requests.filter(r => r.status === "pending").reduce((s, r) => s + r.amount, 0);

  const handleAction = () => {
    const { id, action } = confirmDialog;
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action === "approve" ? "approved" as const : "rejected" as const } : r));
    setConfirmDialog({ open: false, id: "", action: "approve" });
    toast({
      title: action === "approve" ? "Cash Deposit Confirmed" : "Request Rejected",
      description: action === "approve" ? "Payment has been marked as successful." : "The cash deposit request has been rejected.",
    });
  };

  const handleEmailReminder = (req: CashDepositRequest) => {
    toast({
      title: "Reminder Email Sent",
      description: `Email reminder sent to ${req.studentName} for ₹${req.amount.toLocaleString()} cash deposit.`,
    });
  };

  const getStatusBadge = (status: CashDepositRequest["status"]) => {
    switch (status) {
      case "pending": return <Badge className="bg-amber-100 text-amber-700 border-amber-300"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "approved": return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected": return <Badge className="bg-red-100 text-red-700 border-red-300"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Pending Requests</p>
                <h3 className="text-3xl font-bold mt-1">{pendingCount}</h3>
                <p className="text-amber-100 text-xs mt-1">Awaiting verification</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl"><AlertCircle className="h-8 w-8" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Approved This Month</p>
                <h3 className="text-3xl font-bold mt-1">{approvedCount}</h3>
                <p className="text-emerald-100 text-xs mt-1">Successfully deposited</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl"><CheckCircle className="h-8 w-8" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Pending Amount</p>
                <h3 className="text-3xl font-bold mt-1">₹{totalPendingAmount.toLocaleString()}</h3>
                <p className="text-blue-100 text-xs mt-1">To be collected</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl"><Banknote className="h-8 w-8" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Banknote className="h-5 w-5 text-primary" />Cash Deposit Requests</CardTitle>
          <CardDescription>Review and confirm cash deposits from students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Installment</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8"><AvatarFallback>{req.studentName.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar>
                      <span className="font-medium">{req.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{req.standard}</TableCell>
                  <TableCell>{req.installment}</TableCell>
                  <TableCell className="text-right font-bold">₹{req.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(req.requestDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {req.status === "pending" && (
                          <DropdownMenuItem onClick={() => setConfirmDialog({ open: true, id: req.id, action: "approve" })}>
                            <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleEmailReminder(req)}>
                          <Mail className="h-4 w-4 mr-2 text-blue-600" />
                          Email Reminder
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Confirm Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => !open && setConfirmDialog({ open: false, id: "", action: "approve" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cash Deposit</DialogTitle>
            <DialogDescription>
              Has the student deposited the cash? This will mark the installment as paid.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmDialog({ open: false, id: "", action: "approve" })}>Cancel</Button>
            <Button className="flex-1" onClick={handleAction}>Confirm Payment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashDepositTab;
