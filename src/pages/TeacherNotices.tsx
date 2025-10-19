import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, LogOut, Bell, Plus, Trash2, Edit, Eye, ImagePlus } from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const mockNotices = [
  { 
    id: 1, 
    title: "Mid-Term Exam Schedule", 
    content: "Mid-term exams will be conducted from October 15-20. Please prepare accordingly.",
    date: "2025-10-10",
    batch: "Class 10 A",
    priority: "high"
  },
  { 
    id: 2, 
    title: "Assignment Submission Reminder", 
    content: "Chapter 2 assignment must be submitted by October 12th.",
    date: "2025-10-08",
    batch: "Class 10 A",
    priority: "medium"
  },
  { 
    id: 3, 
    title: "Extra Class Schedule", 
    content: "Extra doubt-clearing session on Saturday 10 AM.",
    date: "2025-10-05",
    batch: "All Batches",
    priority: "low"
  },
];

export default function TeacherNotices() {
  const [notices, setNotices] = useState(mockNotices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    batch: "",
    priority: "medium",
    image: null as File | null
  });

  const handleAddNotice = () => {
    const notice = {
      id: notices.length + 1,
      ...newNotice,
      date: new Date().toISOString().split('T')[0],
      imageName: newNotice.image?.name
    };
    setNotices([notice, ...notices]);
    setNewNotice({ title: "", content: "", batch: "", priority: "medium", image: null });
    setIsAddDialogOpen(false);
    toast.success("Notice published successfully!");
  };

  const handleDelete = (id: number) => {
    setNotices(notices.filter(n => n.id !== id));
    toast.success("Notice deleted successfully!");
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Notice Management</h1>
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
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Notices & Announcements</h2>
              <p className="text-muted-foreground">Create and manage notices for your students</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Notice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Notice</DialogTitle>
                  <DialogDescription>Post an announcement or notice for your students</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Notice Title</Label>
                    <Input 
                      placeholder="Enter notice title"
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Notice Content</Label>
                    <Textarea 
                      placeholder="Enter notice details"
                      rows={5}
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Batch</Label>
                      <Select value={newNotice.batch} onValueChange={(value) => setNewNotice({...newNotice, batch: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Batches</SelectItem>
                          <SelectItem value="class10a">Class 10 A</SelectItem>
                          <SelectItem value="class10b">Class 10 B</SelectItem>
                          <SelectItem value="class9a">Class 9 A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select value={newNotice.priority} onValueChange={(value) => setNewNotice({...newNotice, priority: value})}>
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
                  <div className="space-y-2">
                    <Label>Attach Image (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setNewNotice({...newNotice, image: file});
                          }
                        }}
                        className="cursor-pointer"
                      />
                      <ImagePlus className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {newNotice.image && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {newNotice.image.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddNotice} className="bg-primary text-primary-foreground">
                    Publish Notice
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Notices</p>
                    <p className="text-2xl font-bold">{notices.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                    <p className="text-2xl font-bold">{notices.filter(n => n.priority === "high").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold">{notices.filter(n => new Date(n.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {notices.map((notice) => (
              <Card key={notice.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{notice.title}</CardTitle>
                        <Badge className={getPriorityColor(notice.priority)}>
                          {notice.priority}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {notice.batch} • {new Date(notice.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(notice.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{notice.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
