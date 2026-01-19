import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from "recharts";
import { AlertCircle, TrendingUp, Home, LogOut, Plus, Trash2, GraduationCap, Users, IndianRupee, CalendarDays, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "@/hooks/use-toast";

const AdminFeeManagement = () => {
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [expenditures, setExpenditures] = useState([
    { id: 1, category: "Staff Salaries", amount: 455000, subcategory: "(Monthly)" },
    { id: 2, category: "Printing & Notes", amount: 15000, subcategory: "" },
    { id: 3, category: "Extracurricular Activities", amount: 8000, subcategory: "" },
    { id: 4, category: "Class Maintenance", amount: 20000, subcategory: "" },
    { id: 5, category: "Rent", amount: 50000, subcategory: "" },
  ]);
  const [newExpenditure, setNewExpenditure] = useState({ category: "", amount: "", subcategory: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Academic months from June to April
  const academicMonths = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  // Section-wise fee collection data
  const sectionWiseData = {
    primary: {
      name: "Primary (1st - 4th)",
      totalFees: 850000,
      collected: 765000,
      pending: 85000,
      students: 120,
      color: "#f97316"
    },
    middle: {
      name: "Middle (5th - 7th)", 
      totalFees: 920000,
      collected: 874000,
      pending: 46000,
      students: 95,
      color: "#6366f1"
    },
    secondary: {
      name: "Secondary (8th - 10th)",
      totalFees: 1150000,
      collected: 1035000,
      pending: 115000,
      students: 85,
      color: "#0d9488"
    }
  };

  // Batch-wise monthly collection data (June to April)
  const batchWiseMonthlyData = academicMonths.map((month, index) => ({
    month,
    "1st": 45000 + Math.random() * 10000,
    "2nd": 48000 + Math.random() * 12000,
    "3rd": 52000 + Math.random() * 8000,
    "4th": 55000 + Math.random() * 10000,
    "5th": 58000 + Math.random() * 12000,
    "6th": 62000 + Math.random() * 10000,
    "7th": 65000 + Math.random() * 15000,
    "8th": 70000 + Math.random() * 12000,
    "9th": 75000 + Math.random() * 10000,
    "10th": 80000 + Math.random() * 15000,
  }));

  // Section-wise monthly trend
  const sectionMonthlyTrend = academicMonths.map((month) => ({
    month,
    primary: Math.round(65000 + Math.random() * 20000),
    middle: Math.round(75000 + Math.random() * 25000),
    secondary: Math.round(95000 + Math.random() * 30000),
  }));

  // Pie chart data for sections
  const sectionPieData = [
    { name: "Primary", value: sectionWiseData.primary.collected, color: sectionWiseData.primary.color },
    { name: "Middle", value: sectionWiseData.middle.collected, color: sectionWiseData.middle.color },
    { name: "Secondary", value: sectionWiseData.secondary.collected, color: sectionWiseData.secondary.color },
  ];

  // Batch collection summary
  const batchCollectionSummary = [
    { batch: "1st Std", collected: 485000, pending: 35000, percentage: 93 },
    { batch: "2nd Std", collected: 520000, pending: 28000, percentage: 95 },
    { batch: "3rd Std", collected: 498000, pending: 42000, percentage: 92 },
    { batch: "4th Std", collected: 510000, pending: 30000, percentage: 94 },
    { batch: "5th Std", collected: 545000, pending: 45000, percentage: 92 },
    { batch: "6th Std", collected: 580000, pending: 38000, percentage: 94 },
    { batch: "7th Std", collected: 620000, pending: 52000, percentage: 92 },
    { batch: "8th Std", collected: 680000, pending: 48000, percentage: 93 },
    { batch: "9th Std", collected: 720000, pending: 55000, percentage: 93 },
    { batch: "10th Std", collected: 850000, pending: 68000, percentage: 93 },
  ];

  // Delayed students data
  const delayedStudents = [
    { id: 1, name: "Raj Singh", class: "10th - A", amount: "₹3,500", lastDate: "Oct 05", overdue: true },
    { id: 2, name: "Amit Kumar", class: "9th - B", amount: "₹3,200", lastDate: "Oct 08", overdue: true },
    { id: 3, name: "Sneha Gupta", class: "8th - A", amount: "₹2,800", lastDate: "Oct 10", overdue: false },
    { id: 4, name: "Priya Sharma", class: "7th - B", amount: "₹3,500", lastDate: "Nov 05", overdue: true },
    { id: 5, name: "Rahul Verma", class: "6th - A", amount: "₹2,500", lastDate: "Nov 08", overdue: true },
    { id: 6, name: "Anjali Desai", class: "5th - B", amount: "₹2,200", lastDate: "Nov 12", overdue: false },
  ];

  const handleAddExpenditure = () => {
    if (!newExpenditure.category || !newExpenditure.amount) {
      toast({
        title: "Missing information",
        description: "Please fill in category and amount",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(newExpenditure.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setExpenditures([
      ...expenditures,
      {
        id: Date.now(),
        category: newExpenditure.category,
        amount: amount,
        subcategory: newExpenditure.subcategory,
      },
    ]);

    setNewExpenditure({ category: "", amount: "", subcategory: "" });
    setIsDialogOpen(false);
    toast({
      title: "Expenditure added",
      description: "New expenditure has been added successfully",
    });
  };

  const handleDeleteExpenditure = (id: number) => {
    setExpenditures(expenditures.filter((exp) => exp.id !== id));
    toast({
      title: "Expenditure deleted",
      description: "Expenditure has been removed",
    });
  };

  const totalExpenditure = expenditures.reduce((sum, exp) => sum + exp.amount, 0);
  const totalCollected = Object.values(sectionWiseData).reduce((sum, s) => sum + s.collected, 0);
  const totalPending = Object.values(sectionWiseData).reduce((sum, s) => sum + s.pending, 0);
  const totalStudents = Object.values(sectionWiseData).reduce((sum, s) => sum + s.students, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
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
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">Fee Management</h2>
            <p className="text-muted-foreground">Monitor collections, expenses, and financial health (Academic Year: June - April)</p>
          </div>

          <Tabs defaultValue="collection" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="collection">Collection</TabsTrigger>
              <TabsTrigger value="delay-fees">Delay Fees</TabsTrigger>
              <TabsTrigger value="expenditure">Expenditure</TabsTrigger>
            </TabsList>

            {/* Collection Tab - Modern Dashboard */}
            <TabsContent value="collection" className="space-y-6">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm">Total Collected</p>
                        <h3 className="text-3xl font-bold mt-1">₹{(totalCollected / 100000).toFixed(1)}L</h3>
                        <p className="text-emerald-100 text-xs mt-1 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +12% from last month
                        </p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-xl">
                        <IndianRupee className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-100 text-sm">Pending Fees</p>
                        <h3 className="text-3xl font-bold mt-1">₹{(totalPending / 100000).toFixed(1)}L</h3>
                        <p className="text-amber-100 text-xs mt-1">23 students overdue</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-xl">
                        <CalendarDays className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Students</p>
                        <h3 className="text-3xl font-bold mt-1">{totalStudents}</h3>
                        <p className="text-blue-100 text-xs mt-1">Across all sections</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-xl">
                        <Users className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Collection Rate</p>
                        <h3 className="text-3xl font-bold mt-1">{Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%</h3>
                        <p className="text-purple-100 text-xs mt-1">Academic year 2025-26</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-xl">
                        <GraduationCap className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-2">
                  {["Monthly", "Quarterly", "Yearly"].map((period) => (
                    <Button
                      key={period}
                      variant={timePeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimePeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
                
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Section" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="primary">Primary (1st - 4th)</SelectItem>
                    <SelectItem value="middle">Middle (5th - 7th)</SelectItem>
                    <SelectItem value="secondary">Secondary (8th - 10th)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="all">All Batches</SelectItem>
                    {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"].map(std => (
                      <SelectItem key={std} value={std}>{std} Std</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Section-wise Collection Cards */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Section-wise Collection (June - April)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(sectionWiseData).map(([key, section]) => (
                    <Card key={key} className="overflow-hidden">
                      <div className="h-2" style={{ backgroundColor: section.color }} />
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{section.name}</h4>
                            <p className="text-sm text-muted-foreground">{section.students} Students</p>
                          </div>
                          <span 
                            className="text-2xl font-bold"
                            style={{ color: section.color }}
                          >
                            {Math.round((section.collected / section.totalFees) * 100)}%
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Collected</span>
                            <span className="font-medium text-emerald-600">₹{(section.collected / 100000).toFixed(2)}L</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Pending</span>
                            <span className="font-medium text-amber-600">₹{(section.pending / 100000).toFixed(2)}L</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div 
                              className="h-2 rounded-full transition-all"
                              style={{ 
                                width: `${(section.collected / section.totalFees) * 100}%`,
                                backgroundColor: section.color 
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trend by Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Collection Trend (Section-wise)</CardTitle>
                    <CardDescription>Fee collection from June to April by section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={sectionMonthlyTrend}>
                        <defs>
                          <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorMiddle" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" tickFormatter={(value) => `₹${value/1000}K`} />
                        <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                        <Legend />
                        <Area type="monotone" dataKey="primary" name="Primary" stroke="#f97316" fill="url(#colorPrimary)" strokeWidth={2} />
                        <Area type="monotone" dataKey="middle" name="Middle" stroke="#6366f1" fill="url(#colorMiddle)" strokeWidth={2} />
                        <Area type="monotone" dataKey="secondary" name="Secondary" stroke="#0d9488" fill="url(#colorSecondary)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Section Distribution Pie */}
                <Card>
                  <CardHeader>
                    <CardTitle>Collection Distribution</CardTitle>
                    <CardDescription>Total collection by section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={sectionPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sectionPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `₹${(value / 100000).toFixed(2)}L`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      {sectionPieData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Batch-wise Collection Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Batch-wise Fee Collection Summary</CardTitle>
                  <CardDescription>Collection status for all standards (1st to 10th)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Batch</TableHead>
                          <TableHead className="text-right">Collected</TableHead>
                          <TableHead className="text-right">Pending</TableHead>
                          <TableHead className="text-right">Collection %</TableHead>
                          <TableHead>Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {batchCollectionSummary.map((batch) => (
                          <TableRow key={batch.batch}>
                            <TableCell className="font-medium">{batch.batch}</TableCell>
                            <TableCell className="text-right text-emerald-600 font-medium">
                              ₹{(batch.collected / 100000).toFixed(2)}L
                            </TableCell>
                            <TableCell className="text-right text-amber-600 font-medium">
                              ₹{(batch.pending / 1000).toFixed(0)}K
                            </TableCell>
                            <TableCell className="text-right font-bold">{batch.percentage}%</TableCell>
                            <TableCell>
                              <div className="w-32 bg-muted rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                  style={{ width: `${batch.percentage}%` }}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Collection Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Batch-wise Collection</CardTitle>
                  <CardDescription>Detailed monthly collection by batch (June - April)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={batchWiseMonthlyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(value) => `₹${value/1000}K`} />
                      <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="1st" name="1st Std" fill="#f97316" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="5th" name="5th Std" fill="#6366f1" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="8th" name="8th Std" fill="#0d9488" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="10th" name="10th Std" fill="#ec4899" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Delay Fees Tab */}
            <TabsContent value="delay-fees">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Students with Delayed Fees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {delayedStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{student.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell className="font-medium">{student.amount}</TableCell>
                            <TableCell>{student.lastDate}</TableCell>
                            <TableCell>
                              {student.overdue ? (
                                <span className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded-full font-medium">
                                  Overdue
                                </span>
                              ) : (
                                <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Due Soon
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="border-destructive/50 bg-destructive/5">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-5 w-5" />
                      <CardTitle>Fee Delay Alerts</CardTitle>
                    </div>
                    <CardDescription className="text-destructive font-medium">
                      23 Students with Overdue Fees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full">Send SMS Reminders</Button>
                    <Button variant="outline" className="w-full">Send Email Reminders</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Expenditure Tab */}
            <TabsContent value="expenditure">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Operational Costs Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={expenditures.map((exp) => ({
                            name: exp.category,
                            value: exp.amount,
                          }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {expenditures.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${(index * 360) / expenditures.length}, 70%, 50%)`} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {expenditures.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: `hsl(${(index * 360) / expenditures.length}, 70%, 50%)` }}
                            />
                            <span>{item.category}</span>
                          </div>
                          <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Operational Costs</CardTitle>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Expenditure
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Expenditure</DialogTitle>
                            <DialogDescription>Enter the details of the new expenditure item</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="category">Category *</Label>
                              <Input
                                id="category"
                                placeholder="e.g., Staff Salaries"
                                value={newExpenditure.category}
                                onChange={(e) => setNewExpenditure({ ...newExpenditure, category: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="amount">Amount (₹) *</Label>
                              <Input
                                id="amount"
                                type="number"
                                placeholder="e.g., 50000"
                                value={newExpenditure.amount}
                                onChange={(e) => setNewExpenditure({ ...newExpenditure, amount: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                              <Input
                                id="subcategory"
                                placeholder="e.g., Monthly"
                                value={newExpenditure.subcategory}
                                onChange={(e) => setNewExpenditure({ ...newExpenditure, subcategory: e.target.value })}
                              />
                            </div>
                            <Button onClick={handleAddExpenditure} className="w-full">
                              Add Expenditure
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {expenditures.map((exp) => (
                      <div key={exp.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{exp.category}</p>
                          {exp.subcategory && (
                            <p className="text-sm text-muted-foreground">{exp.subcategory}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">₹{exp.amount.toLocaleString()}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExpenditure(exp.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Expenditure</span>
                        <span className="text-xl font-bold text-primary">
                          ₹{totalExpenditure.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminFeeManagement;