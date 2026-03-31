import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Video, ClipboardList, Upload, Trash2, Eye, Edit, Play, Download,
  Search, Home, LogOut, FolderOpen, ChevronRight, ArrowLeft, BookOpen, Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminSidebar from "@/components/AdminSidebar";

const allStandards = [
  { id: "1", label: "1st Standard", section: "Primary", subjects: ["English", "Mathematics", "EVS"] },
  { id: "2", label: "2nd Standard", section: "Primary", subjects: ["English", "Mathematics", "EVS"] },
  { id: "3", label: "3rd Standard", section: "Primary", subjects: ["English", "Mathematics", "EVS"] },
  { id: "4", label: "4th Standard", section: "Primary", subjects: ["English", "Mathematics", "EVS", "Hindi"] },
  { id: "5", label: "5th Standard", section: "Middle", subjects: ["English", "Mathematics", "Science", "Hindi", "Social Studies"] },
  { id: "6", label: "6th Standard", section: "Middle", subjects: ["English", "Mathematics", "Science", "Hindi", "Social Studies"] },
  { id: "7", label: "7th Standard", section: "Middle", subjects: ["English", "Mathematics", "Science", "Hindi", "Social Studies", "Marathi"] },
  { id: "8", label: "8th Standard", section: "Secondary", subjects: ["English", "Mathematics", "Science", "Hindi", "Social Studies", "Marathi"] },
  { id: "9", label: "9th Standard", section: "Secondary", subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Marathi"] },
  { id: "10", label: "10th Standard", section: "Secondary", subjects: ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Marathi"] },
];

// Mock resource data
const mockResources: Record<string, Record<string, {
  chapters: {
    id: string;
    title: string;
    notes: { id: string; title: string; file: string; uploadedDate: string }[];
    videos: { id: string; title: string; duration: string; uploadedDate: string }[];
    tests: { id: string; title: string; file: string; uploadedDate: string }[];
  }[];
}>> = {
  "10": {
    "Mathematics": {
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
    "Science": {
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
  },
  "9": {
    "Mathematics": {
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
  },
};

const getResourceCounts = (stdId: string) => {
  const stdData = mockResources[stdId];
  if (!stdData) return { notes: 0, videos: 0, tests: 0, subjects: 0 };
  let notes = 0, videos = 0, tests = 0;
  const subjects = Object.keys(stdData).length;
  Object.values(stdData).forEach(subj => {
    subj.chapters.forEach(ch => {
      notes += ch.notes.length;
      videos += ch.videos.length;
      tests += ch.tests.length;
    });
  });
  return { notes, videos, tests, subjects };
};

const AdminResources = () => {
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [uploadChapter, setUploadChapter] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");

  const currentStd = allStandards.find(s => s.id === selectedStandard);
  const subjectData = selectedStandard && selectedSubject
    ? mockResources[selectedStandard]?.[selectedSubject]
    : null;

  const effectiveSubject = selectedSubject || (currentStd?.subjects[0] ?? null);
  const effectiveData = selectedStandard
    ? mockResources[selectedStandard]?.[effectiveSubject || ""]
    : null;

  const totalNotes = effectiveData?.chapters.reduce((a, ch) => a + ch.notes.length, 0) || 0;
  const totalVideos = effectiveData?.chapters.reduce((a, ch) => a + ch.videos.length, 0) || 0;
  const totalTests = effectiveData?.chapters.reduce((a, ch) => a + ch.tests.length, 0) || 0;

  const handleSelectStandard = (stdId: string) => {
    setSelectedStandard(stdId);
    setSelectedSubject(null);
    setActiveTab("notes");
    setSearchQuery("");
  };

  const handleBack = () => {
    setSelectedStandard(null);
    setSelectedSubject(null);
    setSearchQuery("");
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

  // Group standards by section
  const sections = ["Primary", "Middle", "Secondary"];
  const groupedStandards = sections.map(sec => ({
    section: sec,
    standards: allStandards.filter(s => s.section === sec),
  }));

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {selectedStandard && (
                <Button variant="ghost" size="icon" onClick={handleBack} className="mr-1">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  {selectedStandard ? `${currentStd?.label} — Resources` : "Resource Management"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {selectedStandard
                    ? `Manage notes, videos & tests for ${currentStd?.label}`
                    : "Select a standard to manage its resources"}
                </p>
              </div>
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
          {/* ========== VIEW 1: Standards List ========== */}
          {!selectedStandard && (
            <div className="space-y-8">
              {groupedStandards.map(({ section, standards }) => (
                <div key={section}>
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {section} Section
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {standards.map(std => {
                      const counts = getResourceCounts(std.id);
                      const hasResources = counts.notes + counts.videos + counts.tests > 0;
                      return (
                        <Card
                          key={std.id}
                          className="cursor-pointer hover:shadow-md hover:border-primary/40 transition-all group"
                          onClick={() => handleSelectStandard(std.id)}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                {std.label}
                              </h3>
                              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <Badge variant="outline" className="text-xs">{std.section}</Badge>
                              <span>{std.subjects.length} subjects</span>
                            </div>
                            {hasResources ? (
                              <div className="flex gap-3 text-xs">
                                <span className="flex items-center gap-1 text-primary">
                                  <FileText className="h-3.5 w-3.5" /> {counts.notes}
                                </span>
                                <span className="flex items-center gap-1 text-primary">
                                  <Video className="h-3.5 w-3.5" /> {counts.videos}
                                </span>
                                <span className="flex items-center gap-1 text-primary">
                                  <ClipboardList className="h-3.5 w-3.5" /> {counts.tests}
                                </span>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No resources yet</p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========== VIEW 2: Standard Detail ========== */}
          {selectedStandard && currentStd && (
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="flex flex-wrap gap-3 items-center justify-between">
                {/* Subject pills */}
                <div className="flex flex-wrap gap-2">
                  {currentStd.subjects.map(subj => (
                    <Button
                      key={subj}
                      variant={(effectiveSubject === subj) ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSubject(subj)}
                    >
                      {subj}
                    </Button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-[220px]"
                    />
                  </div>
                  <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload New Resource</DialogTitle>
                        <DialogDescription>
                          Add resource for {currentStd.label} — {effectiveSubject}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Resource Type</Label>
                          <Select value={uploadType} onValueChange={setUploadType}>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
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
                            <SelectTrigger><SelectValue placeholder="Select chapter" /></SelectTrigger>
                            <SelectContent>
                              {effectiveData?.chapters.map(ch => (
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
                            <Textarea placeholder="Brief description" rows={3} />
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
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{totalNotes}</p>
                      <p className="text-xs text-muted-foreground">Notes</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{totalVideos}</p>
                      <p className="text-xs text-muted-foreground">Videos</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ClipboardList className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{totalTests}</p>
                      <p className="text-xs text-muted-foreground">Tests</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs: Notes | Videos | Tests */}
              {!effectiveData ? (
                <Card className="p-12 text-center">
                  <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Resources Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Click "Upload" to add notes, videos or tests for {effectiveSubject}.
                  </p>
                </Card>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="notes" className="gap-2">
                      <FileText className="h-4 w-4" /> Notes ({totalNotes})
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="gap-2">
                      <Video className="h-4 w-4" /> Video Lectures ({totalVideos})
                    </TabsTrigger>
                    <TabsTrigger value="tests" className="gap-2">
                      <ClipboardList className="h-4 w-4" /> Tests ({totalTests})
                    </TabsTrigger>
                  </TabsList>

                  {/* Notes */}
                  <TabsContent value="notes" className="space-y-4">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {effectiveData.chapters.map((chapter) => {
                        const filtered = chapter.notes.filter(n =>
                          n.title.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        if (searchQuery && filtered.length === 0) return null;
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
                                {(searchQuery ? filtered : chapter.notes).map((note) => (
                                  <Card key={note.id} className="bg-accent/10">
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                          <FileText className="h-5 w-5 text-primary" />
                                          <div>
                                            <p className="font-medium">{note.title}</p>
                                            <p className="text-xs text-muted-foreground">{note.file} • {new Date(note.uploadedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          <Button variant="outline" size="sm" title="View"><Eye className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Edit"><Edit className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Download"><Download className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Delete" className="text-destructive hover:text-destructive" onClick={() => handleDelete("note", note.title)}>
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

                  {/* Videos */}
                  <TabsContent value="videos" className="space-y-4">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {effectiveData.chapters.map((chapter) => {
                        const filtered = chapter.videos.filter(v =>
                          v.title.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        if (searchQuery && filtered.length === 0) return null;
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
                                {(searchQuery ? filtered : chapter.videos).map((video) => (
                                  <Card key={video.id} className="bg-accent/10">
                                    <CardContent className="p-4">
                                      <div className="flex items-start gap-4">
                                        <div className="w-28 h-18 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                                          <Play className="h-7 w-7 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="font-medium">{video.title}</h4>
                                          <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                                            <span>{video.duration}</span>
                                            <span>{new Date(video.uploadedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          <Button variant="outline" size="sm" title="View"><Eye className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Edit"><Edit className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Delete" className="text-destructive hover:text-destructive" onClick={() => handleDelete("video", video.title)}>
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

                  {/* Tests */}
                  <TabsContent value="tests" className="space-y-4">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {effectiveData.chapters.map((chapter) => {
                        const filtered = chapter.tests.filter(t =>
                          t.title.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        if (searchQuery && filtered.length === 0) return null;
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
                                {(searchQuery ? filtered : chapter.tests).map((test) => (
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
                                              {test.file} • {new Date(test.uploadedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          <Button variant="outline" size="sm" title="View"><Eye className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Edit"><Edit className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Download"><Download className="h-4 w-4" /></Button>
                                          <Button variant="outline" size="sm" title="Delete" className="text-destructive hover:text-destructive" onClick={() => handleDelete("test", test.title)}>
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminResources;
