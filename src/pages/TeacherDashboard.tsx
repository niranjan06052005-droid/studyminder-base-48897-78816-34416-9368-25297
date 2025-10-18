import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, Plus, CheckCircle2, Clock, Calendar, AlertCircle, Trash2, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import TeacherSidebar from "@/components/TeacherSidebar";

type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed" | "overdue";
  batch: string;
  reminder: string;
};

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Grade Chapter 2 Tests",
    description: "Grade quadratic equations tests for Class 10 A",
    deadline: "2025-10-20",
    priority: "high",
    status: "pending",
    batch: "Class 10 A",
    reminder: "1 day before"
  },
  {
    id: 2,
    title: "Prepare Chapter 3 Quiz",
    description: "Create quiz questions for trigonometry chapter",
    deadline: "2025-10-22",
    priority: "medium",
    status: "pending",
    batch: "Class 10 B",
    reminder: "2 days before"
  },
  {
    id: 3,
    title: "Upload Video Lecture",
    description: "Record and upload Module 4.1 video",
    deadline: "2025-10-18",
    priority: "high",
    status: "overdue",
    batch: "Class 9 A",
    reminder: "Same day"
  },
  {
    id: 4,
    title: "Review Assignments",
    description: "Review submitted assignments for Chapter 1",
    deadline: "2025-10-15",
    priority: "low",
    status: "completed",
    batch: "Class 10 A",
    reminder: "1 day before"
  },
];

const TeacherDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    deadline: string;
    priority: "high" | "medium" | "low";
    batch: string;
    reminder: string;
  }>({
    title: "",
    description: "",
    deadline: "",
    priority: "medium",
    batch: "",
    reminder: "1 day before"
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.deadline || !newTask.batch) {
      toast.error("Please fill in all required fields");
      return;
    }

    const task: Task = {
      id: tasks.length + 1,
      ...newTask,
      status: "pending"
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: "", description: "", deadline: "", priority: "medium", batch: "", reminder: "1 day before" });
    setIsAddDialogOpen(false);
    toast.success("Task created successfully!");
  };

  const handleToggleStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" as const }
        : task
    ));
    toast.success("Task status updated!");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Task deleted!");
  };

  const getWeeklyTasks = () => {
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return tasks.filter(task => new Date(task.deadline) <= weekFromNow);
  };

  const getMonthlyTasks = () => {
    const monthFromNow = new Date();
    monthFromNow.setDate(monthFromNow.getDate() + 30);
    return tasks.filter(task => new Date(task.deadline) <= monthFromNow);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "overdue": return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const pendingTasks = tasks.filter(t => t.status === "pending");
  const overdueTasks = tasks.filter(t => t.status === "overdue");
  const completedTasks = tasks.filter(t => t.status === "completed");

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Teacher Portal</h1>
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Task Management</h2>
            <p className="text-muted-foreground">Manage your teaching tasks and stay organized</p>
          </div>

          {/* Task Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Tasks</p>
                    <p className="text-2xl font-bold">{pendingTasks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold">{overdueTasks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{completedTasks.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full h-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="h-5 w-5 mr-2" />
                      Create Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>Add a new task with deadline and reminders</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Task Title *</Label>
                        <Input 
                          placeholder="Enter task title"
                          value={newTask.title}
                          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea 
                          placeholder="Enter task description"
                          rows={3}
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Target Batch *</Label>
                          <Select value={newTask.batch} onValueChange={(value) => setNewTask({...newTask, batch: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select batch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Class 10 A">Class 10 A</SelectItem>
                              <SelectItem value="Class 10 B">Class 10 B</SelectItem>
                              <SelectItem value="Class 9 A">Class 9 A</SelectItem>
                              <SelectItem value="Class 9 B">Class 9 B</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value as "high" | "medium" | "low"})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="low">Low Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Deadline *</Label>
                          <Input 
                            type="date"
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Reminder</Label>
                          <Select value={newTask.reminder} onValueChange={(value) => setNewTask({...newTask, reminder: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Same day">Same day</SelectItem>
                              <SelectItem value="1 day before">1 day before</SelectItem>
                              <SelectItem value="2 days before">2 days before</SelectItem>
                              <SelectItem value="1 week before">1 week before</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddTask} className="bg-primary text-primary-foreground">
                        Create Task
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Tasks View */}
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList>
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="monthly">Monthly View</TabsTrigger>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="space-y-4 mt-6">
              {getWeeklyTasks().length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No tasks due this week</p>
                  </CardContent>
                </Card>
              ) : (
                getWeeklyTasks().map((task) => (
                  <Card key={task.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <button 
                            onClick={() => handleToggleStatus(task.id)}
                            className="mt-1"
                          >
                            {getStatusIcon(task.status)}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className={`text-xl ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                                {task.title}
                              </CardTitle>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                            </div>
                            <CardDescription>{task.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(task.deadline).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Bell className="h-4 w-4" />
                                {task.reminder}
                              </span>
                              <Badge variant="outline">{task.batch}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4 mt-6">
              {getMonthlyTasks().length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No tasks due this month</p>
                  </CardContent>
                </Card>
              ) : (
                getMonthlyTasks().map((task) => (
                  <Card key={task.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <button 
                            onClick={() => handleToggleStatus(task.id)}
                            className="mt-1"
                          >
                            {getStatusIcon(task.status)}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className={`text-xl ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                                {task.title}
                              </CardTitle>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                            </div>
                            <CardDescription>{task.description}</CardDescription>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(task.deadline).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Bell className="h-4 w-4" />
                                {task.reminder}
                              </span>
                              <Badge variant="outline">{task.batch}</Badge>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-4 mt-6">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button 
                          onClick={() => handleToggleStatus(task.id)}
                          className="mt-1"
                        >
                          {getStatusIcon(task.status)}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className={`text-xl ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </CardTitle>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>
                          <CardDescription>{task.description}</CardDescription>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(task.deadline).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bell className="h-4 w-4" />
                              {task.reminder}
                            </span>
                            <Badge variant="outline">{task.batch}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
