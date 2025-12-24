import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, Video, ClipboardList, Download, Play, CheckCircle, ArrowLeft, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const chapters = [
  {
    id: "ch1",
    title: "Chapter 1: Linear Equations in Two Variables",
    completed: true,
    notes: [
      { id: "n1", title: "Practice Set 1.1 Solutions", file: "ch1-ps1.pdf" },
      { id: "n2", title: "Practice Set 1.2 Solutions", file: "ch1-ps2.pdf" },
      { id: "n3", title: "Chapter 1 Summary Notes", file: "ch1-summary.pdf" },
    ],
    videos: [
      { id: "v1", title: "Module 1.1: Introduction to Linear Equations", duration: "12:45", watched: true },
      { id: "v2", title: "Module 1.2: Solving Equations by Cramer's Rule", duration: "15:30", watched: true },
      { id: "v3", title: "Module 1.3: Word Problems", duration: "18:20", watched: false },
    ],
    tests: [
      { id: "t1", title: "Chapter 1 Concept Test", questions: 15, duration: 20 },
      { id: "t2", title: "Chapter 1 Final Test", questions: 25, duration: 30 },
    ],
  },
  {
    id: "ch2",
    title: "Chapter 2: Quadratic Equations",
    completed: false,
    notes: [
      { id: "n4", title: "Practice Set 2.1 Solutions", file: "ch2-ps1.pdf" },
      { id: "n5", title: "Practice Set 2.2 Solutions", file: "ch2-ps2.pdf" },
      { id: "n6", title: "Quadratic Formula Derivation", file: "ch2-formula.pdf" },
    ],
    videos: [
      { id: "v4", title: "Module 2.1: Nature of Roots", duration: "14:15", watched: false },
      { id: "v5", title: "Module 2.2: Quadratic Formula Method", duration: "16:40", watched: false },
      { id: "v6", title: "Module 2.3: Applications", duration: "20:10", watched: false },
    ],
    tests: [
      { id: "t3", title: "Chapter 2 Concept Test", questions: 20, duration: 25 },
      { id: "t4", title: "Chapter 2 Final Test", questions: 30, duration: 35 },
    ],
  },
  {
    id: "ch3",
    title: "Chapter 3: Arithmetic Progression",
    completed: false,
    notes: [
      { id: "n7", title: "Practice Set 3.1 Solutions", file: "ch3-ps1.pdf" },
      { id: "n8", title: "AP Formulas Quick Reference", file: "ch3-formulas.pdf" },
    ],
    videos: [
      { id: "v7", title: "Module 3.1: Introduction to AP", duration: "13:25", watched: false },
      { id: "v8", title: "Module 3.2: nth Term Formula", duration: "17:55", watched: false },
    ],
    tests: [
      { id: "t5", title: "Chapter 3 Concept Test", questions: 18, duration: 22 },
    ],
  },
];

export default function SubjectPage() {
  const { subject } = useParams();
  const [activeTab, setActiveTab] = useState("notes");
  const [completedChapters, setCompletedChapters] = useState<string[]>(["ch1"]);
  const [attemptedTests, setAttemptedTests] = useState<string[]>(["t1", "t2"]); // Track attempted tests

  const isPreviousChaptersCompleted = (chapterIndex: number) => {
    if (chapterIndex === 0) return true;
    return chapters.slice(0, chapterIndex).every(ch => completedChapters.includes(ch.id));
  };

  const areAllTestsAttempted = (chapterId: string) => {
    const chapter = chapters.find(ch => ch.id === chapterId);
    if (!chapter) return false;
    return chapter.tests.every(test => attemptedTests.includes(test.id));
  };

  const handleMarkDone = (chapterId: string) => {
    if (!completedChapters.includes(chapterId)) {
      if (areAllTestsAttempted(chapterId)) {
        setCompletedChapters([...completedChapters, chapterId]);
      }
    }
  };

  const handleStartTest = (testId: string) => {
    if (!attemptedTests.includes(testId)) {
      setAttemptedTests([...attemptedTests, testId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/student/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mathematics</h1>
              <p className="text-sm text-muted-foreground">10th Standard - Maharashtra Board</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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

          {/* Chapter Notes Tab */}
          <TabsContent value="notes" className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {chapters.map((chapter, index) => {
                const isLocked = !isPreviousChaptersCompleted(index);
                const isCompleted = completedChapters.includes(chapter.id);
                
                return (
                  <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                    <AccordionTrigger className="px-6 hover:no-underline" disabled={isLocked}>
                      <div className="flex items-center gap-3">
                        {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-lg font-medium">{chapter.title}</span>
                        {isCompleted && <CheckCircle className="h-4 w-4 text-success" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {isLocked ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Complete all tests from previous chapters to unlock this content</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3 mt-2">
                            {chapter.notes.map((note) => (
                              <Card key={note.id} className="bg-accent/50">
                                <CardContent className="flex items-center justify-between p-4">
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{note.title}</span>
                                  </div>
                                  <Link to={`/student/subject/${subject}/notes/${note.id}`}>
                                    <Button size="sm" className="gap-2">
                                      View Notes
                                    </Button>
                                  </Link>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          {!isCompleted && (
                            <>
                              {!areAllTestsAttempted(chapter.id) && (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-4 text-sm text-yellow-700 dark:text-yellow-400">
                                  ⚠️ You must attempt all tests for this chapter before marking it as complete
                                </div>
                              )}
                              <Button 
                                onClick={() => handleMarkDone(chapter.id)}
                                className="w-full mt-4"
                                variant="outline"
                                disabled={!areAllTestsAttempted(chapter.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Chapter as Done
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabsContent>

          {/* Video Lectures Tab */}
          <TabsContent value="videos" className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {chapters.map((chapter, index) => {
                const isLocked = !isPreviousChaptersCompleted(index);
                const isCompleted = completedChapters.includes(chapter.id);
                
                return (
                  <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                    <AccordionTrigger className="px-6 hover:no-underline" disabled={isLocked}>
                      <div className="flex items-center gap-3">
                        {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-lg font-medium">{chapter.title}</span>
                        {isCompleted && <CheckCircle className="h-4 w-4 text-success" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {isLocked ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Complete all tests from previous chapters to unlock this content</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3 mt-2">
                            {chapter.videos.map((video) => (
                              <Card key={video.id} className="bg-accent/50">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="w-32 h-20 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                                      <Play className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <h4 className="font-medium line-clamp-2">{video.title}</h4>
                                        {video.watched && (
                                          <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 flex-shrink-0">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Watched
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">{video.duration}</p>
                                      <Link to={`/student/subject/${subject}/video/${video.id}`}>
                                        <Button size="sm" className="mt-3">
                                          {video.watched ? "Watch Again" : "Watch Now"}
                                        </Button>
                                      </Link>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          {!isCompleted && (
                            <>
                              {!areAllTestsAttempted(chapter.id) && (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-4 text-sm text-yellow-700 dark:text-yellow-400">
                                  ⚠️ You must attempt all tests for this chapter before marking it as complete
                                </div>
                              )}
                              <Button 
                                onClick={() => handleMarkDone(chapter.id)}
                                className="w-full mt-4"
                                variant="outline"
                                disabled={!areAllTestsAttempted(chapter.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Chapter as Done
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabsContent>

          {/* Practice Tests Tab */}
          <TabsContent value="tests" className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {chapters.map((chapter, index) => {
                const isLocked = !isPreviousChaptersCompleted(index);
                const isCompleted = completedChapters.includes(chapter.id);
                
                return (
                  <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg bg-card">
                    <AccordionTrigger className="px-6 hover:no-underline" disabled={isLocked}>
                      <div className="flex items-center gap-3">
                        {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-lg font-medium">{chapter.title}</span>
                        {isCompleted && <CheckCircle className="h-4 w-4 text-success" />}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {isLocked ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Lock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Complete all tests from previous chapters to unlock this content</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3 mt-2">
                            {chapter.tests.map((test) => {
                              const isAttempted = attemptedTests.includes(test.id);
                              return (
                                <Card key={test.id} className="bg-accent/50">
                                  <CardContent className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <ClipboardList className="h-6 w-6 text-primary" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h4 className="font-medium">{test.title}</h4>
                                          {isAttempted && (
                                            <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">
                                              <CheckCircle className="h-3 w-3 mr-1" />
                                              Attempted
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="flex gap-4 mt-1">
                                          <span className="text-sm text-muted-foreground">
                                            {test.questions} Questions
                                          </span>
                                          <span className="text-sm text-muted-foreground">
                                            {test.duration} Minutes
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <Button onClick={() => handleStartTest(test.id)}>
                                      {isAttempted ? "Retake Test" : "Start Test"}
                                    </Button>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                          {!isCompleted && (
                            <>
                              {!areAllTestsAttempted(chapter.id) && (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-4 text-sm text-yellow-700 dark:text-yellow-400">
                                  ⚠️ You must attempt all tests for this chapter before marking it as complete
                                </div>
                              )}
                              <Button 
                                onClick={() => handleMarkDone(chapter.id)}
                                className="w-full mt-4"
                                variant="outline"
                                disabled={!areAllTestsAttempted(chapter.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Chapter as Done
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
