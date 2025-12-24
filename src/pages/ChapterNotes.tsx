import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, BookOpen, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock page content for multi-page notes
const pageContents: Record<string, string[][]> = {
  "n1": [
    [
      "1. Solve the following simultaneous equations using graphical method:",
      "   a) x + y = 7, x - y = 3",
      "   Solution: Adding both equations: 2x = 10, x = 5, y = 2",
      "",
      "2. Using substitution method, solve:",
      "   a) 2x + 3y = 12, x - y = 1",
      "   Solution: From equation 2, x = y + 1",
      "   Substituting: 2(y+1) + 3y = 12",
      "   5y + 2 = 12, y = 2, x = 3",
    ],
    [
      "3. Apply Cramer's rule to solve:",
      "   a) 3x + 2y = 12, 2x + 3y = 13",
      "   D = |3 2| = 9 - 4 = 5",
      "       |2 3|",
      "   Dx = |12 2| = 36 - 26 = 10",
      "        |13 3|",
      "   x = Dx/D = 10/5 = 2",
      "",
      "4. Solve by elimination method:",
      "   a) 5x + 2y = 16, 3x + 4y = 22",
    ],
    [
      "5. Word Problem:",
      "   The cost of 3 pens and 5 pencils is Rs. 35.",
      "   The cost of 5 pens and 3 pencils is Rs. 37.",
      "   Find the cost of each pen and pencil.",
      "",
      "   Let cost of pen = x, pencil = y",
      "   3x + 5y = 35 ... (i)",
      "   5x + 3y = 37 ... (ii)",
      "   Solving: x = 5, y = 4",
    ],
  ],
  "n2": [
    [
      "Word Problems on Linear Equations",
      "",
      "1. The sum of two numbers is 15. If twice the first number is added to thrice the second, the sum is 35. Find the numbers.",
      "",
      "   Let first number = x, second number = y",
      "   x + y = 15 ... (i)",
      "   2x + 3y = 35 ... (ii)",
    ],
    [
      "   Multiplying (i) by 2: 2x + 2y = 30",
      "   Subtracting from (ii): y = 5",
      "   Therefore, x = 10",
      "   The numbers are 10 and 5.",
      "",
      "2. A fraction becomes 4/5 if 1 is added to both numerator and denominator.",
    ],
  ],
  "n3": [
    [
      "SUMMARY: Linear Equations in Two Variables",
      "",
      "Key Concepts:",
      "• Linear equation: ax + by + c = 0 where a, b, c are real numbers",
      "• Simultaneous equations: Two linear equations with same variables",
    ],
    [
      "Methods of Solving:",
      "1. Graphical Method - Plot both lines, intersection point is solution",
      "2. Substitution Method - Express one variable in terms of other",
      "3. Elimination Method - Add/subtract to eliminate one variable",
      "4. Cramer's Rule - Using determinants",
    ],
    [
      "Important Formulas:",
      "• Cramer's Rule: x = Dx/D, y = Dy/D",
      "• Consistency conditions: D ≠ 0 for unique solution",
      "",
      "Practice Problems Summary:",
      "• Always identify the method suitable for the problem",
      "• Check your answer by substituting back",
    ],
  ],
};

// Mock data for notes
const notesData: Record<string, {
  id: string;
  title: string;
  file: string;
  chapter: string;
  subject: string;
  pages: number;
  uploadedDate: string;
  content: string[];
}> = {
  "n1": {
    id: "n1",
    title: "Practice Set 1.1 Solutions",
    file: "ch1-ps1.pdf",
    chapter: "Chapter 1: Linear Equations in Two Variables",
    subject: "Mathematics",
    pages: 8,
    uploadedDate: "2024-01-15",
    content: [
      "1. Solve the following simultaneous equations using graphical method:",
      "   a) x + y = 7, x - y = 3",
      "   Solution: Adding both equations: 2x = 10, x = 5, y = 2",
      "",
      "2. Using substitution method, solve:",
      "   a) 2x + 3y = 12, x - y = 1",
      "   Solution: From equation 2, x = y + 1",
      "   Substituting: 2(y+1) + 3y = 12",
      "   5y + 2 = 12, y = 2, x = 3",
      "",
      "3. Apply Cramer's rule to solve:",
      "   a) 3x + 2y = 12, 2x + 3y = 13",
      "   D = |3 2| = 9 - 4 = 5",
      "       |2 3|",
      "   Dx = |12 2| = 36 - 26 = 10",
      "        |13 3|",
      "   x = Dx/D = 10/5 = 2",
    ]
  },
  "n2": {
    id: "n2",
    title: "Practice Set 1.2 Solutions",
    file: "ch1-ps2.pdf",
    chapter: "Chapter 1: Linear Equations in Two Variables",
    subject: "Mathematics",
    pages: 10,
    uploadedDate: "2024-01-18",
    content: [
      "Word Problems on Linear Equations",
      "",
      "1. The sum of two numbers is 15. If twice the first number is added to thrice the second, the sum is 35. Find the numbers.",
      "",
      "   Let first number = x, second number = y",
      "   x + y = 15 ... (i)",
      "   2x + 3y = 35 ... (ii)",
      "",
      "   Multiplying (i) by 2: 2x + 2y = 30",
      "   Subtracting from (ii): y = 5",
      "   Therefore, x = 10",
      "   The numbers are 10 and 5.",
    ]
  },
  "n3": {
    id: "n3",
    title: "Chapter 1 Summary Notes",
    file: "ch1-summary.pdf",
    chapter: "Chapter 1: Linear Equations in Two Variables",
    subject: "Mathematics",
    pages: 5,
    uploadedDate: "2024-01-20",
    content: [
      "SUMMARY: Linear Equations in Two Variables",
      "",
      "Key Concepts:",
      "• Linear equation: ax + by + c = 0 where a, b, c are real numbers",
      "• Simultaneous equations: Two linear equations with same variables",
      "",
      "Methods of Solving:",
      "1. Graphical Method - Plot both lines, intersection point is solution",
      "2. Substitution Method - Express one variable in terms of other",
      "3. Elimination Method - Add/subtract to eliminate one variable",
      "4. Cramer's Rule - Using determinants",
      "",
      "Important Formulas:",
      "• Cramer's Rule: x = Dx/D, y = Dy/D",
      "• Consistency conditions: D ≠ 0 for unique solution",
    ]
  },
};

export default function ChapterNotes() {
  const { subject, noteId } = useParams();
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  
  const notePages = pageContents[noteId || "n1"] || pageContents["n1"];
  const totalPages = notePages.length;
  
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  
  const note = notesData[noteId || "n1"];
  
  if (!note) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Note not found</h2>
            <p className="text-muted-foreground mb-4">The requested note could not be found.</p>
            <Link to={`/student/subject/${subject}`}>
              <Button>Back to Subject</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/student/subject/${subject}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">{note.title}</h1>
                <p className="text-sm text-muted-foreground">{note.chapter}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <FileText className="h-3 w-3" />
                {note.pages} pages
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleResetZoom}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Uploaded: {new Date(note.uploadedDate).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Notes Viewer */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* PDF Viewer Placeholder */}
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{note.subject} - {note.chapter}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Document Preview Area */}
              <div 
                className="bg-card min-h-[600px] p-8 overflow-auto"
                style={{ fontSize: `${zoom}%` }}
              >
                <div className="max-w-3xl mx-auto bg-background border rounded-lg shadow-inner p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-4">
                    {note.title}
                  </h2>
                  <div className="space-y-2 font-mono text-sm leading-relaxed min-h-[300px]">
                    {notePages[currentPage - 1]?.map((line, index) => (
                      <p key={index} className={line === "" ? "h-4" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                  
                  {/* Page Navigation */}
                  <div className="mt-8 pt-4 border-t flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <span className="text-muted-foreground text-sm font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Notes */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Other Notes in this Chapter</h3>
            <div className="grid gap-3">
              {Object.values(notesData)
                .filter(n => n.chapter === note.chapter && n.id !== note.id)
                .map((relatedNote) => (
                  <Link key={relatedNote.id} to={`/student/subject/${subject}/notes/${relatedNote.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <span className="font-medium">{relatedNote.title}</span>
                            <p className="text-sm text-muted-foreground">{relatedNote.pages} pages</p>
                          </div>
                        </div>
                        <Badge variant="outline">View</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
