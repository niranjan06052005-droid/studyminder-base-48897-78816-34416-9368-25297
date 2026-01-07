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
  Download, FileText, BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import AdminSidebar from "@/components/AdminSidebar";

const AdminReports = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Monthly revenue data
  const monthlyRevenueData = [
    { month: "Jan", collection: 1250000, expenses: 820000, balance: 430000 },
    { month: "Feb", collection: 1180000, expenses: 790000, balance: 390000 },
    { month: "Mar", collection: 1320000, expenses: 850000, balance: 470000 },
    { month: "Apr", collection: 1150000, expenses: 780000, balance: 370000 },
    { month: "May", collection: 980000, expenses: 720000, balance: 260000 },
    { month: "Jun", collection: 850000, expenses: 680000, balance: 170000 },
    { month: "Jul", collection: 1450000, expenses: 920000, balance: 530000 },
    { month: "Aug", collection: 1380000, expenses: 880000, balance: 500000 },
    { month: "Sep", collection: 1290000, expenses: 840000, balance: 450000 },
    { month: "Oct", collection: 1350000, expenses: 860000, balance: 490000 },
    { month: "Nov", collection: 1420000, expenses: 890000, balance: 530000 },
    { month: "Dec", collection: 1280000, expenses: 830000, balance: 450000 },
  ];

  // Student admission trends
  const admissionData = [
    { month: "Jan", newAdmissions: 12, totalStudents: 420 },
    { month: "Feb", newAdmissions: 8, totalStudents: 428 },
    { month: "Mar", newAdmissions: 15, totalStudents: 443 },
    { month: "Apr", newAdmissions: 6, totalStudents: 449 },
    { month: "May", newAdmissions: 4, totalStudents: 453 },
    { month: "Jun", newAdmissions: 3, totalStudents: 456 },
    { month: "Jul", newAdmissions: 45, totalStudents: 501 },
    { month: "Aug", newAdmissions: 38, totalStudents: 539 },
    { month: "Sep", newAdmissions: 22, totalStudents: 561 },
    { month: "Oct", newAdmissions: 10, totalStudents: 571 },
    { month: "Nov", newAdmissions: 7, totalStudents: 578 },
    { month: "Dec", newAdmissions: 5, totalStudents: 583 },
  ];

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

  // Staff salary data
  const staffSalaryData = [
    { role: "Senior Teachers", count: 8, avgSalary: 45000, totalSalary: 360000 },
    { role: "Junior Teachers", count: 10, avgSalary: 30000, totalSalary: 300000 },
    { role: "Teaching Assistants", count: 4, avgSalary: 20000, totalSalary: 80000 },
    { role: "Administrative Staff", count: 3, avgSalary: 25000, totalSalary: 75000 },
    { role: "Support Staff", count: 5, avgSalary: 15000, totalSalary: 75000 },
  ];

  // Yearly comparison
  const yearlyComparison = [
    { year: "2022", revenue: 12500000, expenses: 9200000, students: 380, staff: 22 },
    { year: "2023", revenue: 14200000, expenses: 10100000, students: 420, staff: 24 },
    { year: "2024", revenue: 15800000, expenses: 10800000, students: 480, staff: 26 },
    { year: "2025", revenue: 14900000, expenses: 9860000, students: 583, staff: 30 },
  ];

  // Program-wise student distribution
  const programDistribution = [
    { name: "Primary (1-4)", value: 180, color: 'hsl(var(--chart-1))' },
    { name: "Middle (5-7)", value: 210, color: 'hsl(var(--chart-2))' },
    { name: "Secondary (8-10)", value: 193, color: 'hsl(var(--chart-3))' },
  ];

  // Fee collection status
  const feeCollectionData = [
    { status: "Collected", value: 12800000, percentage: 87 },
    { status: "Pending", value: 1200000, percentage: 8 },
    { status: "Overdue", value: 700000, percentage: 5 },
  ];

  const FEE_COLORS = ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  // Calculate totals
  const totalCollection = monthlyRevenueData.reduce((sum, item) => sum + item.collection, 0);
  const totalExpenses = monthlyRevenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalBalance = totalCollection - totalExpenses;
  const totalNewAdmissions = admissionData.reduce((sum, item) => sum + item.newAdmissions, 0);
  const totalSalaries = staffSalaryData.reduce((sum, item) => sum + item.totalSalary, 0);

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
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="jan">January</SelectItem>
                <SelectItem value="feb">February</SelectItem>
                <SelectItem value="mar">March</SelectItem>
                <SelectItem value="apr">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="jun">June</SelectItem>
                <SelectItem value="jul">July</SelectItem>
                <SelectItem value="aug">August</SelectItem>
                <SelectItem value="sep">September</SelectItem>
                <SelectItem value="oct">October</SelectItem>
                <SelectItem value="nov">November</SelectItem>
                <SelectItem value="dec">December</SelectItem>
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

            {/* Revenue Tab */}
            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Monthly Revenue Overview
                    </CardTitle>
                    <CardDescription>Collection vs Expenses ({selectedYear})</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-xs" />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                        />
                        <Legend />
                        <Bar dataKey="collection" name="Collection" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fee Collection Status</CardTitle>
                    <CardDescription>Current year breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={feeCollectionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {feeCollectionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={FEE_COLORS[index % FEE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {feeCollectionData.map((item, index) => (
                        <div key={item.status} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{item.status}</span>
                          <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "destructive"}>
                            {item.percentage}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

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

            {/* Admissions Tab */}
            <TabsContent value="admissions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Student Enrollment Trends
                    </CardTitle>
                    <CardDescription>New admissions and total students ({selectedYear})</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={admissionData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="newAdmissions" name="New Admissions" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                        <Line yAxisId="right" type="monotone" dataKey="totalStudents" name="Total Students" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-2))' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Program Distribution</CardTitle>
                    <CardDescription>Students by program level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={programDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {programDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {programDistribution.map((item) => (
                        <div key={item.name} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                          <Badge variant="outline">{item.value} students</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Admission Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Monthly Admission Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">New Admissions</TableHead>
                        <TableHead className="text-right">Total Students</TableHead>
                        <TableHead className="text-right">Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {admissionData.map((row, index) => (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right text-primary font-medium">+{row.newAdmissions}</TableCell>
                          <TableCell className="text-right">{row.totalStudents}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={row.newAdmissions > 10 ? "default" : "secondary"}>
                              {index > 0 
                                ? `${(((row.totalStudents - admissionData[index-1].totalStudents) / admissionData[index-1].totalStudents) * 100).toFixed(1)}%`
                                : "—"
                              }
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
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

            {/* Salaries Tab */}
            <TabsContent value="salaries" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="gradient-card">
                  <CardHeader className="pb-3">
                    <CardDescription>Total Monthly Salary</CardDescription>
                    <CardTitle className="text-3xl text-primary">{formatCurrency(totalSalaries)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">30 staff members</p>
                  </CardContent>
                </Card>

                <Card className="gradient-card">
                  <CardHeader className="pb-3">
                    <CardDescription>Annual Salary Expense</CardDescription>
                    <CardTitle className="text-3xl text-primary">{formatCurrency(totalSalaries * 12)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">58% of total expenses</p>
                  </CardContent>
                </Card>

                <Card className="gradient-card">
                  <CardHeader className="pb-3">
                    <CardDescription>Average Salary</CardDescription>
                    <CardTitle className="text-3xl text-primary">{formatCurrency(totalSalaries / 30)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Per staff member</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Staff Salary Details
                  </CardTitle>
                  <CardDescription>Role-wise salary breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Staff Count</TableHead>
                        <TableHead className="text-right">Avg. Salary</TableHead>
                        <TableHead className="text-right">Total Monthly</TableHead>
                        <TableHead className="text-right">Annual</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staffSalaryData.map((row) => (
                        <TableRow key={row.role}>
                          <TableCell className="font-medium">{row.role}</TableCell>
                          <TableCell className="text-right">{row.count}</TableCell>
                          <TableCell className="text-right">{formatCurrency(row.avgSalary)}</TableCell>
                          <TableCell className="text-right text-primary font-medium">{formatCurrency(row.totalSalary)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(row.totalSalary * 12)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-muted/50">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">{staffSalaryData.reduce((sum, row) => sum + row.count, 0)}</TableCell>
                        <TableCell className="text-right">—</TableCell>
                        <TableCell className="text-right text-primary">{formatCurrency(totalSalaries)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(totalSalaries * 12)}</TableCell>
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
