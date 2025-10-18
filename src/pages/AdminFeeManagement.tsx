import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertCircle, TrendingUp, Home, LogOut, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";

const AdminFeeManagement = () => {
  const [timePeriod, setTimePeriod] = useState("Monthly");

  // Mock data for charts
  const revenueData = [
    { month: "Jan", tuition: 350000, extra: 180000 },
    { month: "Feb", tuition: 280000, extra: 150000 },
    { month: "Mar", tuition: 420000, extra: 200000 },
    { month: "Apr", tuition: 480000, extra: 220000 },
    { month: "May", tuition: 520000, extra: 240000 },
  ];

  const pieData = [
    { name: "Tuition", value: 30, color: "#3b82f6" },
    { name: "Extra", value: 20, color: "#60a5fa" },
    { name: "Others", value: 30, color: "#93c5fd" },
  ];

  // Mock data for delayed fees
  const delayedStudents = [
    { id: 1, name: "Raj Singh", class: "10th - A", amount: "₹3,500", lastDate: "Oct 00", overdue: true },
    { id: 2, name: "Raj Singh", class: "10th - A", amount: "₹3,500", lastDate: "1 cv 05", overdue: true },
    { id: 3, name: "Sneha Gupta", class: "9th - B", amount: "₹3,60.05", lastDate: "₹3,60.05", overdue: false },
    { id: 4, name: "Sneha Gupta", class: "9th - B", amount: "₹3,500", lastDate: "Nov 05", overdue: true },
    { id: 5, name: "Priya Singh", class: "9th - A", amount: "₹3,500", lastDate: "Nov 00", overdue: true },
    { id: 6, name: "Amk Sharma", class: "10th - A", amount: "₹3,500", lastDate: "Nov 3038", overdue: false },
  ];

  // Mock data for expenditure
  const expenditures = [
    { category: "Staff Salaries", amount: "₹4,55,000", subcategory: "(Monthly)" },
    { category: "Printing & Notes", amount: "₹15,000", subcategory: "" },
    { category: "Extracurrular Activities", amount: "₹8,000", subcategory: "" },
    { category: "Class Maintenance", amount: "₹20,000", subcategory: "" },
    { category: "Rent", amount: "₹50,000", subcategory: "" },
  ];

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
            <p className="text-muted-foreground">Monitor collections, expenses, and financial health</p>
          </div>

          <Tabs defaultValue="collection" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="collection">Collection</TabsTrigger>
              <TabsTrigger value="delay-fees">Delay Fees</TabsTrigger>
              <TabsTrigger value="expenditure">Expenditure</TabsTrigger>
            </TabsList>

            {/* Collection Tab */}
            <TabsContent value="collection">
              {/* Time Period Selector */}
              <div className="flex gap-2 mb-6">
                {["Monthly", "3 Months", "6 Year"].map((period) => (
                  <Button
                    key={period}
                    variant={timePeriod === period ? "default" : "outline"}
                    onClick={() => setTimePeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Overview */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Total Fee Collection</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-bold">₹12,45,000</h3>
                        <span className="text-success flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          +15% from last month
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-4">Total Fee Collection</p>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="month" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip />
                          <Line type="monotone" dataKey="tuition" stroke="#3b82f6" strokeWidth={2} name="Tuition Fees" />
                          <Line type="monotone" dataKey="extra" stroke="#60a5fa" strokeWidth={2} name="Extra Fees" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {pieData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                          <TableHead>Student ID</TableHead>
                          <TableHead>Amount Name</TableHead>
                          <TableHead>Last Date</TableHead>
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
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {student.lastDate}
                                {student.overdue && (
                                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">!</span>
                                )}
                              </div>
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
                          data={[
                            { name: "Staff Salaries", value: 455000, color: "#3b82f6" },
                            { name: "Rent", value: 50000, color: "#60a5fa" },
                            { name: "Class Maintenance", value: 20000, color: "#93c5fd" },
                            { name: "Printing & Notes", value: 15000, color: "#bfdbfe" },
                            { name: "Extracurricular", value: 8000, color: "#dbeafe" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {[
                            { name: "Staff Salaries", value: 455000, color: "#3b82f6" },
                            { name: "Rent", value: 50000, color: "#60a5fa" },
                            { name: "Class Maintenance", value: 20000, color: "#93c5fd" },
                            { name: "Printing & Notes", value: 15000, color: "#bfdbfe" },
                            { name: "Extracurricular", value: 8000, color: "#dbeafe" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {[
                        { name: "Staff Salaries", value: 455000, color: "#3b82f6" },
                        { name: "Rent", value: 50000, color: "#60a5fa" },
                        { name: "Class Maintenance", value: 20000, color: "#93c5fd" },
                        { name: "Printing & Notes", value: 15000, color: "#bfdbfe" },
                        { name: "Extracurricular", value: 8000, color: "#dbeafe" },
                      ].map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">₹{item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Operational Costs</CardTitle>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">Staff Salaries</span>
                      <span className="font-semibold">₹4,55,000</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">Printing & Notes</span>
                      <span className="font-semibold">₹15,000</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">Extracurricular Activities</span>
                      <span className="font-semibold">₹8,000</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">Class Maintenance</span>
                      <span className="font-semibold">₹20,000</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium">Rent</span>
                      <span className="font-semibold">₹50,000</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total Monthly Expenditure</span>
                        <span className="font-semibold">₹5,48,000</span>
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
