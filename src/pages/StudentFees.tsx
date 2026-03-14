import { useState } from "react";
import { Link } from "react-router-dom";
import StudentSidebar from "@/components/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  DollarSign, 
  LogOut, 
  Home, 
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  Banknote,
  Clock,
  Smartphone
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useStudentStandard } from "@/hooks/useStudentStandard";

type PaymentMethod = "card" | "gpay" | "phonepe" | "cash";

interface Installment {
  id: string;
  label: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "upcoming" | "cd_pending";
  paidDate?: string;
  transactionId?: string;
  paymentMethod?: string;
}

const StudentFees = () => {
  const { selectedStandard } = useStudentStandard();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("card");
  const [payingInstallmentId, setPayingInstallmentId] = useState<string | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // Mock: Admin-assigned plan for the student
  const assignedPlan = {
    planName: "3 Months Plan",
    totalFee: 15000,
    academicYear: "2025-2026",
    standard: `${selectedStandard}th Standard`,
  };

  const [installments, setInstallments] = useState<Installment[]>([
    { id: "inst-1", label: "June Installment", amount: 5000, dueDate: "2025-06-15", status: "paid", paidDate: "2025-06-10", transactionId: "TXN20250610001", paymentMethod: "UPI - GPay" },
    { id: "inst-2", label: "September Installment", amount: 5000, dueDate: "2025-09-15", status: "pending" },
    { id: "inst-3", label: "December Installment", amount: 5000, dueDate: "2025-12-15", status: "upcoming" },
  ]);

  const paidAmount = installments.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const remainingAmount = assignedPlan.totalFee - paidAmount;

  const openPayDialog = (installmentId: string) => {
    setPayingInstallmentId(installmentId);
    setSelectedPaymentMethod("card");
    setIsPaymentDialogOpen(true);
  };

  const handlePayment = () => {
    if (!payingInstallmentId) return;
    const inst = installments.find(i => i.id === payingInstallmentId);
    if (!inst) return;

    if (selectedPaymentMethod === "cash") {
      // Cash Deposit: send request to admin
      setInstallments(prev => prev.map(i => i.id === payingInstallmentId ? { ...i, status: "cd_pending" as const } : i));
      setIsPaymentDialogOpen(false);
      toast({
        title: "Cash Deposit Request Sent",
        description: `Request for ₹${inst.amount.toLocaleString()} sent to admin. Please deposit the cash and wait for confirmation.`,
      });
    } else {
      // Online payment
      toast({
        title: "Payment Initiated",
        description: `Processing ₹${inst.amount.toLocaleString()} via ${selectedPaymentMethod.toUpperCase()}...`,
      });
      setTimeout(() => {
        setInstallments(prev => prev.map(i => i.id === payingInstallmentId ? {
          ...i, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0],
          transactionId: `TXN${Date.now()}`, paymentMethod: selectedPaymentMethod === "gpay" ? "UPI - GPay" : selectedPaymentMethod === "phonepe" ? "UPI - PhonePe" : "Debit/Credit Card"
        } : i));
        setIsPaymentDialogOpen(false);
        toast({ title: "Payment Successful!", description: "Receipt has been sent to your email." });
      }, 2000);
    }
  };

  const getStatusBadge = (status: Installment["status"]) => {
    switch (status) {
      case "paid": return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700 border-amber-300"><AlertCircle className="h-3 w-3 mr-1" />Due</Badge>;
      case "upcoming": return <Badge className="bg-blue-100 text-blue-700 border-blue-300"><Clock className="h-3 w-3 mr-1" />Upcoming</Badge>;
      case "cd_pending": return <Badge className="bg-purple-100 text-purple-700 border-purple-300"><Banknote className="h-3 w-3 mr-1" />CD Pending</Badge>;
    }
  };

  const payableInstallment = installments.find(i => i.id === payingInstallmentId);

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Fee Management</h1>
            <div className="flex gap-2">
              <Link to="/"><Button variant="outline" size="sm"><Home className="h-4 w-4 mr-2" />Home</Button></Link>
              <Link to="/login"><Button variant="outline" size="sm"><LogOut className="h-4 w-4 mr-2" />Logout</Button></Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Tabs defaultValue="installments" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="installments">My Installments</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>

            {/* Installments Tab */}
            <TabsContent value="installments" className="space-y-6">
              {/* Plan Summary */}
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Your Fee Plan
                  </CardTitle>
                  <CardDescription>{assignedPlan.standard} — Academic Year {assignedPlan.academicYear}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <p className="text-lg font-bold text-primary">{assignedPlan.planName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Fee</p>
                      <p className="text-lg font-bold">₹{assignedPlan.totalFee.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Paid</p>
                      <p className="text-lg font-bold text-emerald-600">₹{paidAmount.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-lg font-bold text-destructive">₹{remainingAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Payment Progress</span>
                      <span>{Math.round((paidAmount / assignedPlan.totalFee) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all" style={{ width: `${(paidAmount / assignedPlan.totalFee) * 100}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Installment Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Installment Schedule</h3>
                {installments.map((inst) => (
                  <Card key={inst.id} className={`border-2 ${inst.status === "paid" ? "border-emerald-200 bg-emerald-50/30" : inst.status === "cd_pending" ? "border-purple-200 bg-purple-50/30" : inst.status === "pending" ? "border-amber-200" : "border-border"}`}>
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-lg">{inst.label}</h4>
                            {getStatusBadge(inst.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Due: {new Date(inst.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            {inst.paidDate && <span>Paid: {new Date(inst.paidDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                          </div>
                          {inst.transactionId && <p className="text-xs text-muted-foreground font-mono">Txn: {inst.transactionId}</p>}
                          {inst.status === "cd_pending" && <p className="text-xs text-purple-600 font-medium">Cash deposit request sent to admin. Awaiting confirmation.</p>}
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-2xl font-bold">₹{inst.amount.toLocaleString()}</p>
                          {(inst.status === "pending" || inst.status === "upcoming") && (
                            <Button onClick={() => openPayDialog(inst.id)} className="min-w-[100px]">Pay Now</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Payment History Tab */}
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>All completed transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {installments.filter(i => i.status === "paid").map((payment) => (
                      <Card key={payment.id} className="border">
                        <CardContent className="p-5">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300"><CheckCircle className="h-3 w-3 mr-1" />COMPLETED</Badge>
                                <span className="text-sm text-muted-foreground">{payment.paidDate && new Date(payment.paidDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Amount</p>
                                  <p className="text-xl font-bold text-primary">₹{payment.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Method</p>
                                  <p className="font-semibold">{payment.paymentMethod}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                                  <p className="font-mono text-sm">{payment.transactionId}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Installment</p>
                                  <p className="font-semibold">{payment.label}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Receipt</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {installments.filter(i => i.status === "paid").length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No payments made yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Payment Method Dialog */}
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Payment Method</DialogTitle>
                <DialogDescription>
                  {payableInstallment && `Pay ₹${payableInstallment.amount.toLocaleString()} for ${payableInstallment.label}`}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <RadioGroup value={selectedPaymentMethod} onValueChange={(v) => setSelectedPaymentMethod(v as PaymentMethod)}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value="card" id="pay-card" />
                      <Label htmlFor="pay-card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="p-2 bg-blue-100 rounded-lg"><CreditCard className="h-5 w-5 text-blue-600" /></div>
                        <div>
                          <p className="font-semibold">Debit / Credit Card</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value="gpay" id="pay-gpay" />
                      <Label htmlFor="pay-gpay" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="p-2 bg-green-100 rounded-lg"><Smartphone className="h-5 w-5 text-green-600" /></div>
                        <div>
                          <p className="font-semibold">Google Pay</p>
                          <p className="text-xs text-muted-foreground">Pay via UPI</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value="phonepe" id="pay-phonepe" />
                      <Label htmlFor="pay-phonepe" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="p-2 bg-purple-100 rounded-lg"><Smartphone className="h-5 w-5 text-purple-600" /></div>
                        <div>
                          <p className="font-semibold">PhonePe</p>
                          <p className="text-xs text-muted-foreground">Pay via UPI</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <RadioGroupItem value="cash" id="pay-cash" />
                      <Label htmlFor="pay-cash" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="p-2 bg-amber-100 rounded-lg"><Banknote className="h-5 w-5 text-amber-600" /></div>
                        <div>
                          <p className="font-semibold">Cash Deposit</p>
                          <p className="text-xs text-muted-foreground">Deposit cash at office — admin will confirm</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {selectedPaymentMethod === "cash" && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    <p className="font-medium">How Cash Deposit works:</p>
                    <ol className="list-decimal list-inside mt-1 space-y-0.5 text-xs">
                      <li>A request will be sent to the admin</li>
                      <li>Deposit the cash at the office</li>
                      <li>Admin will verify and mark it as successful</li>
                    </ol>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={handlePayment}>
                    {selectedPaymentMethod === "cash" ? "Send CD Request" : "Confirm & Pay"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default StudentFees;
