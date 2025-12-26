import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  DollarSign, 
  Bell, 
  LogOut, 
  Home, 
  Trophy, 
  Award, 
  Smile, 
  ClipboardList, 
  FileText,
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const StudentFees = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [selectedInstallment, setSelectedInstallment] = useState("full");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [customAmountError, setCustomAmountError] = useState("");

  // Mock data
  const pendingFees = {
    totalAmount: 45000,
    paidAmount: 15000,
    remainingAmount: 30000,
    dueDate: "2025-11-30",
    academicYear: "2024-25"
  };

  const paymentHistory = [
    {
      id: 1,
      date: "2024-08-15",
      amount: 15000,
      method: "UPI - GPay",
      status: "completed",
      receiptUrl: "#receipt-1",
      installment: "1st Installment",
      transactionId: "TXN001234567"
    },
    {
      id: 2,
      date: "2024-05-10",
      amount: 20000,
      method: "Card",
      status: "completed",
      receiptUrl: "#receipt-2",
      installment: "Admission Fee",
      transactionId: "TXN001234566"
    }
  ];

  const installmentOptions = [
    { id: "full", label: "One-time Payment", amount: 30000, description: "Pay full amount at once (5% discount)" },
    { id: "3months", label: "3 Months Plan", amount: 10500, description: "₹10,500 x 3 months" },
    { id: "6months", label: "6 Months Plan", amount: 5250, description: "₹5,250 x 6 months" },
    { id: "9months", label: "9 Months Plan", amount: 3500, description: "₹3,500 x 9 months" },
    { id: "custom", label: "Custom Amount", amount: 0, description: "Enter your desired amount" }
  ];

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setCustomAmountError("");
    
    const amount = parseFloat(value);
    if (isNaN(amount) || amount <= 0) {
      setCustomAmountError("Please enter a valid amount");
    } else if (amount > pendingFees.remainingAmount) {
      setCustomAmountError(`Amount cannot exceed remaining balance of ₹${pendingFees.remainingAmount.toLocaleString()}`);
    } else if (amount < 100) {
      setCustomAmountError("Minimum amount is ₹100");
    }
  };

  const getPaymentAmount = () => {
    if (selectedInstallment === "custom") {
      return parseFloat(customAmount) || 0;
    }
    return installmentOptions.find(opt => opt.id === selectedInstallment)?.amount || 0;
  };

  const handlePayment = () => {
    const amount = getPaymentAmount();
    
    if (selectedInstallment === "custom" && customAmountError) {
      toast({
        title: "Invalid Amount",
        description: customAmountError,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Payment Initiated",
      description: `Processing payment of ₹${amount.toLocaleString()} via ${selectedPaymentMethod.toUpperCase()}...`,
    });
    
    setTimeout(() => {
      setIsPaymentDialogOpen(false);
      setCustomAmount("");
      toast({
        title: "Payment Successful!",
        description: "Your payment has been processed successfully. Receipt has been sent to your email.",
      });
    }, 2000);
  };

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
            
            <Link to="/student/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Award className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            
            <Link to="/student/report" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <ClipboardList className="h-5 w-5" />
              <span>My Report</span>
            </Link>
            
            <Link to="/student/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
            
            <Link to="/student/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </Link>
            
            <Link to="/student/fees" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
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
            <h1 className="text-2xl font-bold text-primary">Fee Management</h1>
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
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="pending">Pending Fees</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>

            {/* Pending Fees Tab */}
            <TabsContent value="pending" className="space-y-6">
              {/* Fee Summary Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Pending Fee Summary
                  </CardTitle>
                  <CardDescription>Academic Year: {pendingFees.academicYear}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Total Fee</p>
                      <p className="text-2xl font-bold">₹{pendingFees.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Paid Amount</p>
                      <p className="text-2xl font-bold text-success">₹{pendingFees.paidAmount.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-2xl font-bold text-destructive">₹{pendingFees.remainingAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-destructive" />
                    <span className="text-sm">
                      <span className="font-semibold">Due Date:</span> {new Date(pendingFees.dueDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Make Payment</CardTitle>
                  <CardDescription>Choose your payment plan and method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Installment Options */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Select Payment Plan</Label>
                    <RadioGroup value={selectedInstallment} onValueChange={setSelectedInstallment}>
                      {installmentOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-semibold">{option.label}</p>
                                <p className="text-sm text-muted-foreground">{option.description}</p>
                                {option.id === "custom" && selectedInstallment === "custom" && (
                                  <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">₹</span>
                                      <input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={customAmount}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        min="100"
                                        max={pendingFees.remainingAmount}
                                      />
                                    </div>
                                    {customAmountError && (
                                      <p className="text-xs text-destructive">{customAmountError}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                      Max: ₹{pendingFees.remainingAmount.toLocaleString()} | Min: ₹100
                                    </p>
                                  </div>
                                )}
                              </div>
                              {option.id !== "custom" && (
                                <Badge variant="secondary" className="ml-2">
                                  ₹{option.amount.toLocaleString()}
                                </Badge>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Select Payment Method</Label>
                    <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5" />
                            <span>Debit/Credit Card</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                          <RadioGroupItem value="gpay" id="gpay" />
                          <Label htmlFor="gpay" className="flex items-center gap-2 cursor-pointer">
                            <DollarSign className="h-5 w-5" />
                            <span>Google Pay</span>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                          <RadioGroupItem value="phonepe" id="phonepe" />
                          <Label htmlFor="phonepe" className="flex items-center gap-2 cursor-pointer">
                            <DollarSign className="h-5 w-5" />
                            <span>PhonePe</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg" 
                        className="w-full"
                        disabled={selectedInstallment === "custom" && (!!customAmountError || !customAmount)}
                      >
                        Proceed to Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Payment</DialogTitle>
                        <DialogDescription>
                          Please review your payment details before proceeding
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Plan:</span>
                          <span className="font-semibold">
                            {installmentOptions.find(opt => opt.id === selectedInstallment)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="text-xl font-bold text-primary">
                            ₹{getPaymentAmount().toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Method:</span>
                          <span className="font-semibold capitalize">{selectedPaymentMethod}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setIsPaymentDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="flex-1" onClick={handlePayment}>
                          Confirm & Pay
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment History Tab */}
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>View all your completed transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <Card key={payment.id} className="border-2">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-success/10 text-success border-success/30">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {payment.status.toUpperCase()}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(payment.date).toLocaleDateString('en-IN', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                  })}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                                  <p className="text-xl font-bold text-primary">₹{payment.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Payment Method</p>
                                  <p className="font-semibold">{payment.method}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                                  <p className="font-mono text-sm">{payment.transactionId}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Installment</p>
                                  <p className="font-semibold">{payment.installment}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Receipt
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StudentFees;