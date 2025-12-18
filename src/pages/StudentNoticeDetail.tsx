import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  BookOpen, 
  FileText, 
  Download,
  Home,
  LogOut,
  Bell,
  ClipboardList,
  Trophy,
  DollarSign
} from "lucide-react";

const StudentNoticeDetail = () => {
  const { noticeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { notice, type } = location.state || {};

  // If no notice data is passed, redirect back
  if (!notice) {
    navigate("/student/notices");
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getBadgeVariant = (badgeColor: string) => {
    return badgeColor as "default" | "secondary" | "destructive" | "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col fixed left-0 top-0 h-screen overflow-y-auto z-40">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Student Portal</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <Link to="/student/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <BookOpen className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            
            <Link to="/student/report" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <ClipboardList className="h-5 w-5" />
              <span>My Report</span>
            </Link>
            
            <Link to="/student/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
            
            <Link to="/student/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </Link>
            
            <Link to="/student/fees" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <DollarSign className="h-5 w-5" />
              <span>Fees</span>
            </Link>
            
            <Link to="/student/notices" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Bell className="h-5 w-5" />
              <span>Notices</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Notice Details</h1>
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
            className="mb-6 hover:bg-accent"
            onClick={() => navigate("/student/notices")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notices
          </Button>

          {/* Notice Detail Card */}
          <Card className="max-w-4xl animate-fade-in">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {type === "subject" && notice.icon && (
                      <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                        <notice.icon className="h-7 w-7 text-primary" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-3xl mb-2">{notice.title}</CardTitle>
                      {type === "admin" ? (
                        <Badge variant={getPriorityColor(notice.priority)}>
                          {notice.priority.toUpperCase()} PRIORITY
                        </Badge>
                      ) : (
                        <Badge variant={getBadgeVariant(notice.badgeColor)}>
                          {notice.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{notice.date}</span>
                </div>
                
                {type === "admin" && notice.batch && (
                  <>
                    <Separator orientation="vertical" className="h-5" />
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{notice.batch}</span>
                    </div>
                  </>
                )}

                {type === "subject" && (
                  <>
                    <Separator orientation="vertical" className="h-5" />
                    <div className="flex items-center gap-2 text-primary">
                      <BookOpen className="h-4 w-4" />
                      <span className="font-semibold">{notice.subject}</span>
                    </div>
                    <Separator orientation="vertical" className="h-5" />
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">{notice.type}</span>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Notice Content */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Notice Details</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {notice.message}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                <div className="grid gap-4">
                  {type === "admin" && notice.hasImages && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Attachments Available</p>
                          <p className="text-sm text-muted-foreground">This notice includes attachments and documents</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}

                  {type === "subject" && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Subject Information</p>
                          <p className="text-sm text-muted-foreground">
                            This is a {notice.type.toLowerCase()} for {notice.subject}. 
                            Make sure to check your subject page for more details and resources.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="default"
                  onClick={() => navigate("/student/notices")}
                >
                  Back to All Notices
                </Button>
                {type === "subject" && (
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/student/subject/${notice.subject.toLowerCase()}`)}
                  >
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

export default StudentNoticeDetail;