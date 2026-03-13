import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import StudentSidebar from "@/components/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Home, 
  LogOut, 
  Calendar, 
  BookOpen, 
  Bell, 
  Trophy, 
  DollarSign, 
  FileText, 
  ClipboardList,
  Calculator,
  Beaker,
  Globe,
  Languages,
  Users
} from "lucide-react";

const StudentSubjectNoticeDetail = () => {
  const { noticeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const notice = location.state?.notice;
  
  if (!notice) {
    navigate("/student/notices");
    return null;
  }

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Mathematics":
        return Calculator;
      case "Science":
        return Beaker;
      case "English":
        return BookOpen;
      case "Social Studies":
        return Globe;
      case "Marathi":
      case "Hindi":
        return Languages;
      default:
        return BookOpen;
    }
  };

  const SubjectIcon = getSubjectIcon(notice.subject);

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Subject Notice</h1>
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
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/student/notices")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notices
          </Button>

          {/* Notice Detail Card */}
          <Card className="max-w-4xl">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <SubjectIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <CardTitle className="text-2xl">{notice.title}</CardTitle>
                    <Badge variant={notice.badgeColor as any}>
                      {notice.badge}
                    </Badge>
                  </div>
                  <CardDescription className="flex flex-wrap items-center gap-4 text-base">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {notice.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-primary">
                      <BookOpen className="h-4 w-4" />
                      {notice.subject}
                    </span>
                    <span className="text-muted-foreground">
                      {notice.type}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Notice Message */}
              <div className="bg-muted/30 p-6 rounded-lg border">
                <h3 className="font-semibold mb-3 text-lg">Notice Details</h3>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {notice.message}
                </p>
              </div>

              {/* Additional Info based on type */}
              {notice.type === "Test Announcement" && (
                <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/30">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                    <Bell className="h-5 w-5" />
                    Test Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Subject</p>
                      <p className="font-medium">{notice.subject}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{notice.date}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Make sure to prepare thoroughly and revise all related topics before the test.
                  </p>
                </div>
              )}

              {notice.type === "Test Results" && (
                <div className="bg-success/10 p-6 rounded-lg border border-success/30">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-success">
                    <Trophy className="h-5 w-5" />
                    Results Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your test results have been published. Check the Report section to view your detailed performance.
                  </p>
                  <Button 
                    className="mt-4" 
                    variant="outline"
                    onClick={() => navigate("/student/report")}
                  >
                    View My Report
                  </Button>
                </div>
              )}

              {notice.type === "Resource Uploaded" && (
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                    <BookOpen className="h-5 w-5" />
                    New Resource Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    A new learning resource has been uploaded for this subject. Access it from the subject page.
                  </p>
                  <Button 
                    className="mt-4" 
                    variant="outline"
                    onClick={() => navigate(`/student/subject/${notice.subject.toLowerCase().replace(' ', '-')}`)}
                  >
                    Go to {notice.subject}
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/student/notices")}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Notices
                </Button>
                {notice.subject && (
                  <Button 
                    onClick={() => navigate(`/student/subject/${notice.subject.toLowerCase().replace(' ', '-')}`)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Go to {notice.subject}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StudentSubjectNoticeDetail;