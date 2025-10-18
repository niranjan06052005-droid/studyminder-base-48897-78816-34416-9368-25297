import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, Video, ClipboardList, Download, Play, CheckCircle, ArrowLeft, Upload, Trash2, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chapters = [
  {
    id: "ch1",
    title: "Chapter 1: Linear Equations in Two Variables",
    notes: [
      { id: "n1", title: "Practice Set 1.1 Solutions", file: "ch1-ps1.pdf", uploadedBy: "You", views: 45 },
      { id: "n2", title: "Practice Set 1.2 Solutions", file: "ch1-ps2.pdf", uploadedBy: "You", views: 38 },
    ],
    videos: [
      { id: "v1", title: "Module 1.1: Introduction to Linear Equations", duration: "12:45", views: 42 },
      { id: "v2", title: "Module 1.2: Solving Equations by Cramer's Rule", duration: "15:30", views: 35 },
    ],
    tests: [
      { id: "t1", title: "Chapter 1 Concept Test", questions: 15, duration: 20, attempted: 28 },
    ],
  },
  {
    id: "ch2",
    title: "Chapter 2: Quadratic Equations",
    notes: [
      { id: "n3", title: "Practice Set 2.1 Solutions", file: "ch2-ps1.pdf", uploadedBy: "You", views: 32 },
    ],
    videos: [
      { id: "v3", title: "Module 2.1: Nature of Roots", duration: "14:15", views: 28 },
    ],
    tests: [
      { id: "t2", title: "Chapter 2 Concept Test", questions: 20, duration: 25, attempted: 15 },
    ],
  },
];

export default function TeacherBatchView() {
  const { batchId } = useParams();
  const [activeTab, setActiveTab] = useState("notes");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/teacher/dashboard">
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
                  <DialogDescription>Add videos, notes, or tests for this batch</DialogDescription>
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
                        <SelectItem value="test">Test/Assessment</SelectItem>
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
              Practice Tests
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
                        <Card key={note.id} className="bg-accent/10">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <FileText className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium">{note.title}</p>
                                  <p className="text-sm text-muted-foreground">{note.views} views</p>
                                </div>
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
                        <Card key={video.id} className="bg-accent/10">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-32 h-20 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                                <Play className="h-8 w-8 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{video.title}</h4>
                                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                                  <span>{video.duration}</span>
                                  <span>{video.views} views</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
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
                        <Card key={test.id} className="bg-accent/10">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <ClipboardList className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{test.title}</h4>
                                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                                    <span>{test.questions} Questions</span>
                                    <span>{test.duration} Minutes</span>
                                    <span>{test.attempted} Attempted</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
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
    </div>
  );
}
