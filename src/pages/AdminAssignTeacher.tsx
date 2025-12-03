import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Home, ArrowLeft, User, BookOpen } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "sonner";

const AdminAssignTeacher = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    teacher: ""
  });

  // Mock data - subjects available for assignment
  const subjects = [
    { id: "math", name: "Mathematics" },
    { id: "science", name: "Science" },
    { id: "english", name: "English" },
    { id: "hindi", name: "Hindi" },
    { id: "social", name: "Social Studies" },
    { id: "computer", name: "Computer Science" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" }
  ];

  // Mock data - teachers list
  const teachers = [
    { id: "T001", name: "Mr. Sharma", qualification: "M.Sc Mathematics", subjects: ["Mathematics"] },
    { id: "T002", name: "Dr. Verma", qualification: "Ph.D Science", subjects: ["Science", "Physics"] },
    { id: "T003", name: "Ms. Patel", qualification: "M.A English", subjects: ["English"] },
    { id: "T004", name: "Mrs. Gupta", qualification: "M.A Hindi", subjects: ["Hindi"] },
    { id: "T005", name: "Mr. Kumar", qualification: "M.A History", subjects: ["Social Studies"] },
    { id: "T006", name: "Mr. Singh", qualification: "M.Sc Chemistry", subjects: ["Chemistry", "Science"] },
    { id: "T007", name: "Ms. Reddy", qualification: "M.Sc Biology", subjects: ["Biology", "Science"] },
    { id: "T008", name: "Mr. Joshi", qualification: "MCA", subjects: ["Computer Science"] }
  ];

  const selectedTeacher = teachers.find(t => t.id === formData.teacher);
  const selectedSubject = subjects.find(s => s.id === formData.subject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.teacher) {
      toast.error("Please select both subject and teacher");
      return;
    }

    toast.success(`${selectedTeacher?.name} has been assigned to ${selectedSubject?.name} for this batch!`);
    navigate(`/admin/batches/${batchId}`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to={`/admin/batches/${batchId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Assign Subject/Teacher</h1>
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
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Assign Teacher to Subject</CardTitle>
              <CardDescription>
                Select a subject and assign a teacher from the available staff for this batch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Subject Selection */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Select Subject *
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Choose a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Teacher Selection */}
                <div className="space-y-2">
                  <Label htmlFor="teacher" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Select Teacher *
                  </Label>
                  <Select
                    value={formData.teacher}
                    onValueChange={(value) => setFormData({ ...formData, teacher: value })}
                  >
                    <SelectTrigger id="teacher">
                      <SelectValue placeholder="Choose a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          <div className="flex flex-col">
                            <span>{teacher.name}</span>
                            <span className="text-xs text-muted-foreground">{teacher.qualification}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preview Card */}
                {selectedTeacher && selectedSubject && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <Label className="text-sm text-muted-foreground">Assignment Preview</Label>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subject:</span>
                          <span className="font-medium">{selectedSubject.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Teacher:</span>
                          <span className="font-medium">{selectedTeacher.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Qualification:</span>
                          <span className="font-medium">{selectedTeacher.qualification}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Available Teachers List */}
                <div className="space-y-3">
                  <Label className="text-sm text-muted-foreground">Available Teachers</Label>
                  <div className="grid gap-2 max-h-48 overflow-y-auto">
                    {teachers.map((teacher) => (
                      <div
                        key={teacher.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.teacher === teacher.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setFormData({ ...formData, teacher: teacher.id })}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-xs text-muted-foreground">{teacher.qualification}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {teacher.subjects.join(", ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Assign Teacher
                  </Button>
                  <Link to={`/admin/batches/${batchId}`} className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminAssignTeacher;
