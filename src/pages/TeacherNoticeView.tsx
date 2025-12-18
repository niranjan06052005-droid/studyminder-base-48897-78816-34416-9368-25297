import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Home,
  LogOut,
  Bell
} from "lucide-react";
import TeacherSidebar from "@/components/TeacherSidebar";

const TeacherNoticeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notice } = location.state || {};

  if (!notice) {
    navigate("/teacher/notices");
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
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
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-accent"
            onClick={() => navigate("/teacher/notices")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notices
          </Button>

          <Card className="max-w-4xl animate-fade-in">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                      <Bell className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl mb-2">{notice.title}</CardTitle>
                      <Badge className={getPriorityColor(notice.priority)}>
                        {notice.priority?.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{new Date(notice.date).toLocaleDateString()}</span>
                </div>
                
                <Separator orientation="vertical" className="h-5" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{notice.batch}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Notice Content</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {notice.content}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="default"
                  onClick={() => navigate("/teacher/notices")}
                >
                  Back to All Notices
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TeacherNoticeView;