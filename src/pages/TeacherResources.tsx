import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, LogOut, Folder, Upload, Video, FileText, ClipboardCheck, Download, Eye, Trash2, Plus } from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockResources = [
  {
    id: 1,
    title: "Introduction to Quadratic Equations",
    type: "video",
    batch: "Class 10 - Mathematics",
    uploadDate: "2025-01-10",
    size: "125 MB",
    views: 45,
  },
  {
    id: 2,
    title: "Algebraic Expressions - Chapter Notes",
    type: "notes",
    batch: "Class 9 - Mathematics",
    uploadDate: "2025-01-08",
    size: "2.5 MB",
    views: 67,
  },
  {
    id: 3,
    title: "Mid-Term Test - Trigonometry",
    type: "test",
    batch: "Class 10 - Mathematics",
    uploadDate: "2025-01-05",
    size: "1.8 MB",
    views: 38,
  },
  {
    id: 4,
    title: "Calculus Basics - Video Lecture",
    type: "video",
    batch: "Class 12 - Mathematics",
    uploadDate: "2025-01-12",
    size: "210 MB",
    views: 52,
  },
  {
    id: 5,
    title: "Linear Equations Practice Problems",
    type: "notes",
    batch: "Class 9 - Mathematics",
    uploadDate: "2025-01-11",
    size: "1.2 MB",
    views: 71,
  },
  {
    id: 6,
    title: "Statistics Unit Test",
    type: "test",
    batch: "Class 11 - Mathematics",
    uploadDate: "2025-01-09",
    size: "950 KB",
    views: 29,
  },
];

const TeacherResources = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredResources = mockResources.filter((resource) => {
    const typeMatch = filterType === "all" || resource.type === filterType;
    const batchMatch = filterBatch === "all" || resource.batch === filterBatch;
    return typeMatch && batchMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "notes":
        return <FileText className="h-5 w-5" />;
      case "test":
        return <ClipboardCheck className="h-5 w-5" />;
      default:
        return <Folder className="h-5 w-5" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-[#0891b2] text-white";
      case "notes":
        return "bg-[#f59e0b] text-white";
      case "test":
        return "bg-[#1e3a5f] text-white";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">My Resources</h1>
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
          {/* Page Header */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Resource Management</h2>
              <p className="text-muted-foreground">Upload and manage your teaching resources</p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#0891b2] hover:bg-[#0891b2]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                  <DialogDescription>
                    Upload video lectures, notes, or tests for your batches
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Resource Title</Label>
                    <Input id="title" placeholder="Enter resource title" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of the resource" rows={3} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Resource Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Lecture</SelectItem>
                          <SelectItem value="notes">Notes/Document</SelectItem>
                          <SelectItem value="test">Test/Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="batch">Select Batch</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class9">Class 9 - Mathematics</SelectItem>
                          <SelectItem value="class10">Class 10 - Mathematics</SelectItem>
                          <SelectItem value="class11">Class 11 - Mathematics</SelectItem>
                          <SelectItem value="class12">Class 12 - Mathematics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, PPT, MP4 (Max 500MB)
                      </p>
                      <Input id="file" type="file" className="hidden" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-[#0891b2] hover:bg-[#0891b2]/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="filter-type" className="mb-2 block">Filter by Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger id="filter-type">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="video">Video Lectures</SelectItem>
                      <SelectItem value="notes">Notes</SelectItem>
                      <SelectItem value="test">Tests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Label htmlFor="filter-batch" className="mb-2 block">Filter by Batch</Label>
                  <Select value={filterBatch} onValueChange={setFilterBatch}>
                    <SelectTrigger id="filter-batch">
                      <SelectValue placeholder="All Batches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Batches</SelectItem>
                      <SelectItem value="Class 9 - Mathematics">Class 9 - Mathematics</SelectItem>
                      <SelectItem value="Class 10 - Mathematics">Class 10 - Mathematics</SelectItem>
                      <SelectItem value="Class 11 - Mathematics">Class 11 - Mathematics</SelectItem>
                      <SelectItem value="Class 12 - Mathematics">Class 12 - Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Tabs */}
          <Tabs defaultValue="grid" className="w-full">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeBadgeColor(resource.type)}`}>
                          {getTypeIcon(resource.type)}
                        </div>
                        <Badge className={getTypeBadgeColor(resource.type)}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription>{resource.batch}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Size: {resource.size}</span>
                        <span>{resource.views} views</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredResources.map((resource) => (
                      <div key={resource.id} className="p-4 hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeBadgeColor(resource.type)}`}>
                            {getTypeIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{resource.title}</h3>
                              <Badge className={getTypeBadgeColor(resource.type)}>
                                {resource.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{resource.batch}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{resource.size}</p>
                            <p className="text-xs text-muted-foreground">{resource.views} views</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
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

export default TeacherResources;
