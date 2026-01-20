import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, Video, ClipboardList, Download, Play, ArrowLeft, Upload, Trash2, Eye, Lock, Unlock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const initialChapters = [
  {
    id: "ch1",
    title: "Chapter 1: Linear Equations in Two Variables",
    notes: [
      { id: "n1", title: "Practice Set 1.1 Solutions", file: "ch1-ps1.pdf", uploadedBy: "You", isLocked: false },
      { id: "n2", title: "Practice Set 1.2 Solutions", file: "ch1-ps2.pdf", uploadedBy: "You", isLocked: false },
    ],
    videos: [
      { id: "v1", title: "Module 1.1: Introduction to Linear Equations", duration: "12:45", isLocked: false },
      { id: "v2", title: "Module 1.2: Solving Equations by Cramer's Rule", duration: "15:30", isLocked: true },
    ],
    tests: [
      { id: "t1", title: "Chapter 1 Concept Test", file: "ch1-test.pdf", isLocked: false },
    ],
  },
  {
    id: "ch2",
    title: "Chapter 2: Quadratic Equations",
    notes: [
      { id: "n3", title: "Practice Set 2.1 Solutions", file: "ch2-ps1.pdf", uploadedBy: "You", isLocked: true },
    ],
    videos: [
      { id: "v3", title: "Module 2.1: Nature of Roots", duration: "14:15", isLocked: true },
    ],
    tests: [
      { id: "t2", title: "Chapter 2 Concept Test", file: "ch2-test.pdf", isLocked: true },
    ],
  },
];

export default function TeacherBatchView() {
  const { batchId } = useParams();
  const [activeTab, setActiveTab] = useState("notes");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [chapters, setChapters] = useState(initialChapters);
  const [viewTestDialog, setViewTestDialog] = useState<{ open: boolean; test: { id: string; title: string; file: string } | null }>({ open: false, test: null });

  const toggleNoteLock = (chapterId: string, noteId: string) => {
    setChapters(prev => prev.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          notes: chapter.notes.map(note => {
            if (note.id === noteId) {
              const newState = !note.isLocked;
              toast.success(`Note ${newState ? 'locked' : 'unlocked'} for students`);
              return { ...note, isLocked: newState };
            }
            return note;
          })
        };
      }
      return chapter;
    }));
  };

  const toggleVideoLock = (chapterId: string, videoId: string) => {
    setChapters(prev => prev.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          videos: chapter.videos.map(video => {
            if (video.id === videoId) {
              const newState = !video.isLocked;
              toast.success(`Video ${newState ? 'locked' : 'unlocked'} for students`);
              return { ...video, isLocked: newState };
            }
            return video;
          })
        };
      }
      return chapter;
    }));
  };

  const toggleTestLock = (chapterId: string, testId: string) => {
    setChapters(prev => prev.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          tests: chapter.tests.map(test => {
            if (test.id === testId) {
              const newState = !test.isLocked;
              toast.success(`Test ${newState ? 'locked' : 'unlocked'} for students`);
              return { ...test, isLocked: newState };
            }
            return test;
          })
        };
      }
      return chapter;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/teacher/classes">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Class 10 - Mathematics</h1>
                <p className="text-sm text-muted-foreground">Batch A • 45 Students</p>
              </div>
            </div>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Resource</DialogTitle>
                  <DialogDescription>Add videos, notes, or test papers for this batch</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Resource Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Lecture</SelectItem>
                        <SelectItem value="notes">Notes/Document</SelectItem>
                        <SelectItem value="test">Test Paper (PDF)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Chapter</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select chapter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ch1">Chapter 1: Linear Equations</SelectItem>
                        <SelectItem value="ch2">Chapter 2: Quadratic Equations</SelectItem>
                        <SelectItem value="new">+ Create New Chapter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Enter resource title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload File</Label>
                    <Input type="file" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-secondary text-secondary-foreground">Upload</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="notes" className="gap-2">
              <FileText className="h-4 w-4" />
              Chapter Notes
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="h-4 w-4" />
              Video Lectures
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              Test Papers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {chapters.map((chapter) => (
                <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-lg font-medium">{chapter.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3 mt-2">
                      {chapter.notes.map((note) => (
                        <Card key={note.id} className={`${note.isLocked ? 'bg-muted/50 border-dashed' : 'bg-accent/10'}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <FileText className={`h-5 w-5 ${note.isLocked ? 'text-muted-foreground' : 'text-primary'}`} />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">{note.title}</p>
                                    {note.isLocked && (
                                      <Badge variant="secondary" className="text-xs bg-destructive/10 text-destructive">
                                        <Lock className="h-3 w-3 mr-1" />
                                        Locked
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant={note.isLocked ? "default" : "outline"} 
                                  size="sm"
                                  onClick={() => toggleNoteLock(chapter.id, note.id)}
                                  className={note.isLocked ? "bg-primary" : ""}
                                >
                                  {note.isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                                </Button>
                                <Link to={`/teacher/class/${batchId}/notes/${note.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
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
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {chapters.map((chapter) => (
                <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-lg font-medium">{chapter.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3 mt-2">
                      {chapter.videos.map((video) => (
                        <Card key={video.id} className={`${video.isLocked ? 'bg-muted/50 border-dashed' : 'bg-accent/10'}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className={`w-32 h-20 rounded-md flex items-center justify-center flex-shrink-0 ${video.isLocked ? 'bg-muted' : 'bg-muted'}`}>
                                <Play className={`h-8 w-8 ${video.isLocked ? 'text-muted-foreground' : 'text-primary'}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{video.title}</h4>
                                  {video.isLocked && (
                                    <Badge variant="secondary" className="text-xs bg-destructive/10 text-destructive">
                                      <Lock className="h-3 w-3 mr-1" />
                                      Locked
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                                  <span>{video.duration}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant={video.isLocked ? "default" : "outline"} 
                                  size="sm"
                                  onClick={() => toggleVideoLock(chapter.id, video.id)}
                                  className={video.isLocked ? "bg-primary" : ""}
                                >
                                  {video.isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                                </Button>
                                <Link to={`/teacher/class/${batchId}/video/${video.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Link to={`/teacher/class/${batchId}/video/${video.id}/edit`}>
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm">
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
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {chapters.map((chapter) => (
                <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="text-lg font-medium">{chapter.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3 mt-2">
                      {chapter.tests.map((test) => (
                        <Card key={test.id} className={`${test.isLocked ? 'bg-muted/50 border-dashed' : 'bg-accent/10'}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${test.isLocked ? 'bg-muted' : 'bg-primary/10'}`}>
                                  <ClipboardList className={`h-6 w-6 ${test.isLocked ? 'text-muted-foreground' : 'text-primary'}`} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium">{test.title}</h4>
                                    {test.isLocked && (
                                      <Badge variant="secondary" className="text-xs bg-destructive/10 text-destructive">
                                        <Lock className="h-3 w-3 mr-1" />
                                        Locked
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Offline Test • {test.file}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant={test.isLocked ? "default" : "outline"} 
                                  size="sm"
                                  onClick={() => toggleTestLock(chapter.id, test.id)}
                                  className={test.isLocked ? "bg-primary" : ""}
                                >
                                  {test.isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setViewTestDialog({ open: true, test })}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
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
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>

      {/* View Test Dialog */}
      <Dialog open={viewTestDialog.open} onOpenChange={(open) => setViewTestDialog({ open, test: null })}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{viewTestDialog.test?.title}</DialogTitle>
            <DialogDescription>Question paper for offline test</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-muted rounded-lg h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">{viewTestDialog.test?.file}</p>
                <p className="text-sm text-muted-foreground mt-2">PDF Preview would be displayed here</p>
                <Button className="mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
