import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Video, ClipboardList, Upload, Trash2, Eye, Edit, Play, Download, Plus, Search, Home, LogOut, FolderOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminSidebar from "@/components/AdminSidebar";

const sections = [
  {
    id: "primary",
    name: "Primary",
    standards: [
      { id: "1", label: "1st Standard" },
      { id: "2", label: "2nd Standard" },
      { id: "3", label: "3rd Standard" },
      { id: "4", label: "4th Standard" },
    ],
  },
  {
    id: "middle",
    name: "Middle",
    standards: [
      { id: "5", label: "5th Standard" },
      { id: "6", label: "6th Standard" },
      { id: "7", label: "7th Standard" },
    ],
  },
  {
    id: "secondary",
    name: "Secondary",
    standards: [
      { id: "8", label: "8th Standard" },
      { id: "9", label: "9th Standard" },
      { id: "10", label: "10th Standard" },
    ],
  },
];

// Mock resource data per standard
const mockResources: Record<string, {
  subjects: {
    id: string;
    name: string;
    chapters: {
      id: string;
      title: string;
      notes: { id: string; title: string; file: string; uploadedDate: string }[];
      videos: { id: string; title: string; duration: string; uploadedDate: string }[];
      tests: { id: string; title: string; file: string; uploadedDate: string }[];
    }[];
  }[];
}> = {
  "10": {
    subjects: [
      {
        id: "math",
        name: "Mathematics",
        chapters: [
          {
            id: "ch1",
            title: "Chapter 1: Linear Equations in Two Variables",
            notes: [
              { id: "n1", title: "Practice Set 1.1 Solutions", file: "ch1-ps1.pdf", uploadedDate: "2024-01-15" },
              { id: "n2", title: "Practice Set 1.2 Solutions", file: "ch1-ps2.pdf", uploadedDate: "2024-01-18" },
            ],
            videos: [
              { id: "v1", title: "Module 1.1: Introduction to Linear Equations", duration: "12:45", uploadedDate: "2024-01-10" },
              { id: "v2", title: "Module 1.2: Solving by Cramer's Rule", duration: "15:30", uploadedDate: "2024-01-12" },
            ],
            tests: [
              { id: "t1", title: "Chapter 1 Concept Test", file: "ch1-test.pdf", uploadedDate: "2024-01-20" },
            ],
          },
          {
            id: "ch2",
            title: "Chapter 2: Quadratic Equations",
            notes: [
              { id: "n3", title: "Practice Set 2.1 Solutions", file: "ch2-ps1.pdf", uploadedDate: "2024-01-22" },
            ],
            videos: [
              { id: "v3", title: "Module 2.1: Nature of Roots", duration: "14:15", uploadedDate: "2024-01-20" },
            ],
            tests: [
              { id: "t2", title: "Chapter 2 Concept Test", file: "ch2-test.pdf", uploadedDate: "2024-01-25" },
            ],
          },
        ],
      },
      {
        id: "sci",
        name: "Science",
        chapters: [
          {
            id: "ch1",
            title: "Chapter 1: Gravitation",
            notes: [
              { id: "sn1", title: "Gravitation Formulas & Derivations", file: "grav-notes.pdf", uploadedDate: "2024-02-01" },
            ],
            videos: [
              { id: "sv1", title: "Introduction to Gravitation", duration: "18:20", uploadedDate: "2024-02-02" },
            ],
            tests: [
              { id: "st1", title: "Gravitation MCQ Test", file: "grav-test.pdf", uploadedDate: "2024-02-05" },
            ],
          },
        ],
      },
    ],
  },
  "9": {
    subjects: [
      {
        id: "math",
        name: "Mathematics",
        chapters: [
          {
            id: "ch1",
            title: "Chapter 1: Sets",
            notes: [
              { id: "9n1", title: "Sets - Basic Concepts", file: "sets-notes.pdf", uploadedDate: "2024-01-10" },
            ],
            videos: [
              { id: "9v1", title: "Introduction to Sets", duration: "10:30", uploadedDate: "2024-01-11" },
            ],
            tests: [
              { id: "9t1", title: "Sets Practice Test", file: "sets-test.pdf", uploadedDate: "2024-01-15" },
            ],
          },
        ],
      },
    ],
  },
};

const AdminResources = () => {
  const [selectedSection, setSelectedSection] = useState("secondary");
  const [selectedStandard, setSelectedStandard] = useState("10");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [uploadChapter, setUploadChapter] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");

  const currentSection = sections.find(s => s.id === selectedSection);
  const currentStandards = currentSection?.standards || [];
  const currentResources = mockResources[selectedStandard];
  const subjects = currentResources?.subjects || [];
  const currentSubjectData = selectedSubject ? subjects.find(s => s.id === selectedSubject) : subjects[0];

  // Auto-select first subject when standard changes
  const effectiveSubject = currentSubjectData || subjects[0];

  const handleSectionChange = (sectionId: string) => {
    setSelectedSection(sectionId);
    const section = sections.find(s => s.id === sectionId);
    if (section && section.standards.length > 0) {
      setSelectedStandard(section.standards[0].id);
      setSelectedSubject(null);
    }
  };

  const handleUpload = () => {
    if (!uploadType || !uploadChapter || !uploadTitle) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success(`${uploadType === "notes" ? "Note" : uploadType === "video" ? "Video" : "Test"} uploaded successfully!`);
    setIsUploadDialogOpen(false);
    setUploadType("");
    setUploadChapter("");
    setUploadTitle("");
  };

  const handleDelete = (type: string, title: string) => {
    toast.success(`${title} deleted successfully`);
  };

  const totalNotes = effectiveSubject?.chapters.reduce((acc, ch) => acc + ch.notes.length, 0) || 0;
  const totalVideos = effectiveSubject?.chapters.reduce((acc, ch) => acc + ch.videos.length, 0) || 0;
  const totalTests = effectiveSubject?.chapters.reduce((acc, ch) => acc + ch.tests.length, 0) || 0;

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Resource Management</h1>
              <p className="text-sm text-muted-foreground">Centralized resource library for all standards</p>
            </div>
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
          {/* Section & Standard Selector */}
          <div className="mb-6 flex flex-wrap gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Section</Label>
              <Select value={selectedSection} onValueChange={handleSectionChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Standard</Label>
              <Select value={selectedStandard} onValueChange={(val) => { setSelectedStandard(val); setSelectedSubject(null); }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentStandards.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Subject</Label>
              <Select value={effectiveSubject?.id || ""} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Resource
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Resource</DialogTitle>
                  <DialogDescription>
                    Add resource for {currentStandards.find(s => s.id === selectedStandard)?.label || selectedStandard} - {effectiveSubject?.name || "Select subject"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Resource Type</Label>
                    <Select value={uploadType} onValueChange={setUploadType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notes">Notes / Document</SelectItem>
                        <SelectItem value="video">Video Lecture</SelectItem>
                        <SelectItem value="test">Test Paper (PDF)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Chapter</Label>
                    <Select value={uploadChapter} onValueChange={setUploadChapter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chapter" />
                      </SelectTrigger>
                      <SelectContent>
                        {effectiveSubject?.chapters.map(ch => (
                          <SelectItem key={ch.id} value={ch.id}>{ch.title}</SelectItem>
                        ))}
                        <SelectItem value="new">+ Create New Chapter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      placeholder="Enter resource title"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                    />
                  </div>
                  {uploadType === "video" && (
                    <div className="space-y-2">
                      <Label>Video URL or Upload</Label>
                      <Input placeholder="Paste video URL or upload file" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Upload File</Label>
                    <Input type="file" />
                  </div>
                  {uploadType === "notes" && (
                    <div className="space-y-2">
                      <Label>Description (optional)</Label>
                      <Textarea placeholder="Brief description of the notes" rows={3} />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpload}>Upload</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{effectiveSubject?.chapters.length || 0}</p>
                  <p className="text-xs text-muted-foreground">Chapters</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{totalNotes}</p>
                  <p className="text-xs text-muted-foreground">Notes</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{totalVideos}</p>
                  <p className="text-xs text-muted-foreground">Videos</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <ClipboardList className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{totalTests}</p>
                  <p className="text-xs text-muted-foreground">Tests</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* No data state */}
          {!effectiveSubject ? (
            <Card className="p-12 text-center">
              <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
              <p className="text-muted-foreground mb-4">
                No resources have been added for this standard yet. Click "Upload Resource" to get started.
              </p>
            </Card>
          ) : (
            /* Resource Tabs */
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="notes" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Notes ({totalNotes})
                </TabsTrigger>
                <TabsTrigger value="videos" className="gap-2">
                  <Video className="h-4 w-4" />
                  Video Lectures ({totalVideos})
                </TabsTrigger>
                <TabsTrigger value="tests" className="gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Tests ({totalTests})
                </TabsTrigger>
              </TabsList>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-4">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {effectiveSubject.chapters.map((chapter) => {
                    const filteredNotes = chapter.notes.filter(n =>
                      n.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    if (searchQuery && filteredNotes.length === 0) return null;
                    return (
                      <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                        <AccordionTrigger className="px-6 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-medium">{chapter.title}</span>
                            <Badge variant="secondary">{chapter.notes.length} notes</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="space-y-3 mt-2">
                            {(searchQuery ? filteredNotes : chapter.notes).map((note) => (
                              <Card key={note.id} className="bg-accent/10">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                      <FileText className="h-5 w-5 text-primary" />
                                      <div>
                                        <p className="font-medium">{note.title}</p>
                                        <p className="text-xs text-muted-foreground">{note.file} • Uploaded {new Date(note.uploadedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm" title="View">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="outline" size="sm" title="Edit">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button variant="outline" size="sm" title="Download">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        title="Delete"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDelete("note", note.title)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos" className="space-y-4">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {effectiveSubject.chapters.map((chapter) => {
                    const filteredVideos = chapter.videos.filter(v =>
                      v.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    if (searchQuery && filteredVideos.length === 0) return null;
                    return (
                      <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                        <AccordionTrigger className="px-6 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-medium">{chapter.title}</span>
                            <Badge variant="secondary">{chapter.videos.length} videos</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="space-y-3 mt-2">
                            {(searchQuery ? filteredVideos : chapter.videos).map((video) => (
                              <Card key={video.id} className="bg-accent/10">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="w-32 h-20 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                                      <Play className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{video.title}</h4>
                                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                                        <span>{video.duration}</span>
                                        <span>Uploaded {new Date(video.uploadedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm" title="View">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="outline" size="sm" title="Edit">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        title="Delete"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDelete("video", video.title)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>

              {/* Tests Tab */}
              <TabsContent value="tests" className="space-y-4">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {effectiveSubject.chapters.map((chapter) => {
                    const filteredTests = chapter.tests.filter(t =>
                      t.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    if (searchQuery && filteredTests.length === 0) return null;
                    return (
                      <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                        <AccordionTrigger className="px-6 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-medium">{chapter.title}</span>
                            <Badge variant="secondary">{chapter.tests.length} tests</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="space-y-3 mt-2">
                            {(searchQuery ? filteredTests : chapter.tests).map((test) => (
                              <Card key={test.id} className="bg-accent/10">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <ClipboardList className="h-6 w-6 text-primary" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{test.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {test.file} • Uploaded {new Date(test.uploadedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm" title="View">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="outline" size="sm" title="Edit">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button variant="outline" size="sm" title="Download">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        title="Delete"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDelete("test", test.title)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminResources;
