import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Home, LogOut, TrendingUp, TrendingDown, DollarSign, Users, 
  UserPlus, Wallet, PiggyBank, GraduationCap, Calendar,
  Download, FileText, BarChart3, Clock, Phone, CheckCircle, XCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import AdminSidebar from "@/components/AdminSidebar";

const AdminReports = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Monthly revenue data (Academic Year: June to April)
  const monthlyRevenueData = [
    { month: "Jun", collection: 850000, expenses: 680000, balance: 170000 },
    { month: "Jul", collection: 1450000, expenses: 920000, balance: 530000 },
    { month: "Aug", collection: 1380000, expenses: 880000, balance: 500000 },
    { month: "Sep", collection: 1290000, expenses: 840000, balance: 450000 },
    { month: "Oct", collection: 1350000, expenses: 860000, balance: 490000 },
    { month: "Nov", collection: 1420000, expenses: 890000, balance: 530000 },
    { month: "Dec", collection: 1280000, expenses: 830000, balance: 450000 },
    { month: "Jan", collection: 1250000, expenses: 820000, balance: 430000 },
    { month: "Feb", collection: 1180000, expenses: 790000, balance: 390000 },
    { month: "Mar", collection: 1320000, expenses: 850000, balance: 470000 },
    { month: "Apr", collection: 1150000, expenses: 780000, balance: 370000 },
  ];

  // Admission/Enquiry data based on enquiry statuses
  const enquiryData = [
    { month: "Jun", new: 45, contacted: 38, scheduled: 25, enrolled: 20, rejected: 5 },
    { month: "Jul", new: 85, contacted: 72, scheduled: 55, enrolled: 45, rejected: 8 },
    { month: "Aug", new: 65, contacted: 58, scheduled: 42, enrolled: 35, rejected: 6 },
    { month: "Sep", new: 35, contacted: 30, scheduled: 22, enrolled: 18, rejected: 4 },
    { month: "Oct", new: 25, contacted: 22, scheduled: 15, enrolled: 12, rejected: 3 },
    { month: "Nov", new: 18, contacted: 15, scheduled: 10, enrolled: 8, rejected: 2 },
    { month: "Dec", new: 12, contacted: 10, scheduled: 7, enrolled: 5, rejected: 2 },
    { month: "Jan", new: 22, contacted: 18, scheduled: 12, enrolled: 10, rejected: 2 },
    { month: "Feb", new: 15, contacted: 12, scheduled: 8, enrolled: 6, rejected: 2 },
    { month: "Mar", new: 28, contacted: 24, scheduled: 18, enrolled: 15, rejected: 3 },
    { month: "Apr", new: 10, contacted: 8, scheduled: 5, enrolled: 4, rejected: 1 },
  ];

  // Calculate enquiry totals
  const totalEnquiries = enquiryData.reduce((sum, item) => sum + item.new, 0);
  const totalContacted = enquiryData.reduce((sum, item) => sum + item.contacted, 0);
  const totalScheduled = enquiryData.reduce((sum, item) => sum + item.scheduled, 0);
  const totalEnrolled = enquiryData.reduce((sum, item) => sum + item.enrolled, 0);
  const totalRejected = enquiryData.reduce((sum, item) => sum + item.rejected, 0);
  const conversionRate = ((totalEnrolled / totalEnquiries) * 100).toFixed(1);

  // Expense breakdown
  const expenseBreakdown = [
    { name: "Staff Salaries", value: 5800000, percentage: 58 },
    { name: "Rent & Utilities", value: 1800000, percentage: 18 },
    { name: "Study Materials", value: 800000, percentage: 8 },
    { name: "Maintenance", value: 600000, percentage: 6 },
    { name: "Marketing", value: 400000, percentage: 4 },
    { name: "Events & Activities", value: 350000, percentage: 3.5 },
    { name: "Miscellaneous", value: 250000, percentage: 2.5 },
  ];

  const EXPENSE_COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', '#8884d8', '#82ca9d'];

  // Staff salary data - individual staff members
  const staffSalaryDetails = [
    { id: 1, name: "Dr. Rajesh Kumar", role: "Senior Teacher", monthlySalary: 55000, annualPackage: 660000, disbursed: 605000, pending: 55000 },
    { id: 2, name: "Priya Sharma", role: "Senior Teacher", monthlySalary: 48000, annualPackage: 576000, disbursed: 528000, pending: 48000 },
    { id: 3, name: "Amit Patel", role: "Senior Teacher", monthlySalary: 45000, annualPackage: 540000, disbursed: 495000, pending: 45000 },
    { id: 4, name: "Sunita Verma", role: "Junior Teacher", monthlySalary: 32000, annualPackage: 384000, disbursed: 352000, pending: 32000 },
    { id: 5, name: "Rahul Gupta", role: "Junior Teacher", monthlySalary: 30000, annualPackage: 360000, disbursed: 330000, pending: 30000 },
    { id: 6, name: "Meera Singh", role: "Junior Teacher", monthlySalary: 28000, annualPackage: 336000, disbursed: 308000, pending: 28000 },
    { id: 7, name: "Vikram Joshi", role: "Teaching Assistant", monthlySalary: 22000, annualPackage: 264000, disbursed: 242000, pending: 22000 },
    { id: 8, name: "Neha Reddy", role: "Teaching Assistant", monthlySalary: 20000, annualPackage: 240000, disbursed: 220000, pending: 20000 },
    { id: 9, name: "Kiran Desai", role: "Administrative Staff", monthlySalary: 28000, annualPackage: 336000, disbursed: 308000, pending: 28000 },
    { id: 10, name: "Manoj Tiwari", role: "Support Staff", monthlySalary: 18000, annualPackage: 216000, disbursed: 198000, pending: 18000 },
  ];

  // Calculate salary totals
  const totalMonthlySalary = staffSalaryDetails.reduce((sum, staff) => sum + staff.monthlySalary, 0);
  const totalAnnualPackage = staffSalaryDetails.reduce((sum, staff) => sum + staff.annualPackage, 0);
  const totalDisbursed = staffSalaryDetails.reduce((sum, staff) => sum + staff.disbursed, 0);
  const totalPendingSalary = staffSalaryDetails.reduce((sum, staff) => sum + staff.pending, 0);

  // Yearly comparison
  const yearlyComparison = [
    { year: "2022", revenue: 12500000, expenses: 9200000, students: 380, staff: 22 },
    { year: "2023", revenue: 14200000, expenses: 10100000, students: 420, staff: 24 },
    { year: "2024", revenue: 15800000, expenses: 10800000, students: 480, staff: 26 },
    { year: "2025", revenue: 14900000, expenses: 9860000, students: 583, staff: 30 },
  ];

  // Calculate totals
  const totalCollection = monthlyRevenueData.reduce((sum, item) => sum + item.collection, 0);
  const totalExpenses = monthlyRevenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalBalance = totalCollection - totalExpenses;
  const totalNewAdmissions = totalEnrolled;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Reports & Analytics</h1>
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
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filter:</span>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Total Collection
                </CardDescription>
                <CardTitle className="text-3xl text-primary">{formatCurrency(totalCollection)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> +8.2% from last year
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Total Expenses
                </CardDescription>
                <CardTitle className="text-3xl text-destructive">{formatCurrency(totalExpenses)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <TrendingDown className="h-4 w-4" /> -3.5% from last year
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4" />
                  Net Balance
                </CardDescription>
                <CardTitle className="text-3xl text-success">{formatCurrency(totalBalance)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> +24% profit margin
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  New Admissions
                </CardDescription>
                <CardTitle className="text-3xl text-primary">{totalNewAdmissions}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> +15% from last year
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different report sections */}
          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="salaries">Salaries</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>

            {/* Revenue Tab - Modern Design without Fee Collection Status */}
            <TabsContent value="revenue" className="space-y-6">
              {/* Monthly Revenue Overview - Full Width Modern Card */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        Monthly Revenue Overview
                      </CardTitle>
                      <CardDescription className="mt-1">Collection vs Expenses - Academic Year {selectedYear} (June - April)</CardDescription>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Avg. Monthly Collection</p>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(totalCollection / 11)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Avg. Monthly Profit</p>
                        <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalBalance / 11)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={monthlyRevenueData}>
                      <defs>
                        <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-xs" />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="collection" name="Collection" stroke="hsl(var(--primary))" fill="url(#colorCollection)" strokeWidth={2} />
                      <Area type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(var(--destructive))" fill="url(#colorExpenses)" strokeWidth={2} />
                      <Area type="monotone" dataKey="balance" name="Balance" stroke="#10b981" fill="url(#colorBalance)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Monthly Revenue Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Monthly Financial Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Collection</TableHead>
                        <TableHead className="text-right">Expenses</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead className="text-right">Margin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyRevenueData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right text-success">{formatCurrency(row.collection)}</TableCell>
                          <TableCell className="text-right text-destructive">{formatCurrency(row.expenses)}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(row.balance)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">
                              {((row.balance / row.collection) * 100).toFixed(1)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admissions Tab - Based on Enquiry System */}
            <TabsContent value="admissions" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Enquiries</p>
                        <p className="text-2xl font-bold text-blue-600">{totalEnquiries}</p>
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
                        <p className="text-2xl font-bold text-yellow-600">{totalContacted}</p>
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
                        <p className="text-sm text-muted-foreground">Scheduled</p>
                        <p className="text-2xl font-bold text-purple-600">{totalScheduled}</p>
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
                        <p className="text-2xl font-bold text-green-600">{totalEnrolled}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Rejected</p>
                        <p className="text-2xl font-bold text-red-600">{totalRejected}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conversion Rate Card */}
              <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm">Enquiry to Enrollment Conversion Rate</p>
                      <h3 className="text-4xl font-bold mt-1">{conversionRate}%</h3>
                      <p className="text-emerald-100 text-sm mt-1">{totalEnrolled} enrolled out of {totalEnquiries} enquiries</p>
                    </div>
                    <div className="p-4 bg-white/20 rounded-xl">
                      <TrendingUp className="h-10 w-10" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Details Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Monthly Admission Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">New Enquiries</TableHead>
                        <TableHead className="text-right">Contacted</TableHead>
                        <TableHead className="text-right">Scheduled</TableHead>
                        <TableHead className="text-right">Enrolled</TableHead>
                        <TableHead className="text-right">Rejected</TableHead>
                        <TableHead className="text-right">Conversion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enquiryData.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right text-blue-600">{row.new}</TableCell>
                          <TableCell className="text-right text-yellow-600">{row.contacted}</TableCell>
                          <TableCell className="text-right text-purple-600">{row.scheduled}</TableCell>
                          <TableCell className="text-right text-green-600 font-medium">{row.enrolled}</TableCell>
                          <TableCell className="text-right text-red-600">{row.rejected}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={row.enrolled / row.new > 0.4 ? "default" : "secondary"}>
                              {((row.enrolled / row.new) * 100).toFixed(0)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-muted/50">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right text-blue-600">{totalEnquiries}</TableCell>
                        <TableCell className="text-right text-yellow-600">{totalContacted}</TableCell>
                        <TableCell className="text-right text-purple-600">{totalScheduled}</TableCell>
                        <TableCell className="text-right text-green-600">{totalEnrolled}</TableCell>
                        <TableCell className="text-right text-red-600">{totalRejected}</TableCell>
                        <TableCell className="text-right">
                          <Badge>{conversionRate}%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expenses Tab */}
            <TabsContent value="expenses" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Expense Breakdown
                    </CardTitle>
                    <CardDescription>Category-wise expenses ({selectedYear})</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expense Details</CardTitle>
                    <CardDescription>Breakdown by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="text-right">%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenseBreakdown.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell className="text-right">{formatCurrency(row.value)}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant="outline">{row.percentage}%</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="font-bold bg-muted/50">
                          <TableCell>Total</TableCell>
                          <TableCell className="text-right">{formatCurrency(totalExpenses)}</TableCell>
                          <TableCell className="text-right">100%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Salaries Tab - Updated with new cards and table structure */}
            <TabsContent value="salaries" className="space-y-6">
              {/* Salary Summary Cards - Modern Design */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Total Annual Package</p>
                        <h3 className="text-3xl font-bold text-primary mt-2">{formatCurrency(totalAnnualPackage)}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{staffSalaryDetails.length} staff members</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
                        <Wallet className="h-8 w-8 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Disbursed</p>
                        <h3 className="text-3xl font-bold text-emerald-600 mt-2">{formatCurrency(totalDisbursed)}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {((totalDisbursed / totalAnnualPackage) * 100).toFixed(0)}% of annual package
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Pending</p>
                        <h3 className="text-3xl font-bold text-amber-600 mt-2">{formatCurrency(totalPendingSalary)}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {((totalPendingSalary / totalAnnualPackage) * 100).toFixed(0)}% remaining
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl">
                        <Clock className="h-8 w-8 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Staff Salary Details Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Staff Salary Details
                  </CardTitle>
                  <CardDescription>Individual staff salary breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff Name</TableHead>
                        <TableHead className="text-right">Monthly Salary</TableHead>
                        <TableHead className="text-right">Annual Package</TableHead>
                        <TableHead className="text-right">Disbursed</TableHead>
                        <TableHead className="text-right">Pending</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffSalaryDetails.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell className="text-right">{formatCurrency(staff.monthlySalary)}</TableCell>
                          <TableCell className="text-right text-primary font-medium">{formatCurrency(staff.annualPackage)}</TableCell>
                          <TableCell className="text-right text-emerald-600">{formatCurrency(staff.disbursed)}</TableCell>
                          <TableCell className="text-right text-amber-600">{formatCurrency(staff.pending)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-muted/50">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalMonthlySalary)}</TableCell>
                        <TableCell className="text-right text-primary">{formatCurrency(totalAnnualPackage)}</TableCell>
                        <TableCell className="text-right text-emerald-600">{formatCurrency(totalDisbursed)}</TableCell>
                        <TableCell className="text-right text-amber-600">{formatCurrency(totalPendingSalary)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Yearly Comparison Tab */}
            <TabsContent value="yearly" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Year-over-Year Comparison
                  </CardTitle>
                  <CardDescription>Performance trends across years</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={yearlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value: number, name: string) => name.includes('Students') || name.includes('Staff') ? value : formatCurrency(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Yearly Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">Expenses</TableHead>
                        <TableHead className="text-right">Profit</TableHead>
                        <TableHead className="text-right">Students</TableHead>
                        <TableHead className="text-right">Staff</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {yearlyComparison.map((row) => (
                        <TableRow key={row.year}>
                          <TableCell className="font-medium">{row.year}</TableCell>
                          <TableCell className="text-right text-success">{formatCurrency(row.revenue)}</TableCell>
                          <TableCell className="text-right text-destructive">{formatCurrency(row.expenses)}</TableCell>
                          <TableCell className="text-right font-medium text-primary">{formatCurrency(row.revenue - row.expenses)}</TableCell>
                          <TableCell className="text-right">{row.students}</TableCell>
                          <TableCell className="text-right">{row.staff}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
