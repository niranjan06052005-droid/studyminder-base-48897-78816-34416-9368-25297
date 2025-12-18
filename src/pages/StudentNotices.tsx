import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home, Bell, Calendar, Users, BookOpen, Calculator, Beaker, Globe, Languages, FileText, Trophy, Award, Smile, DollarSign, ClipboardList } from "lucide-react";

const StudentNotices = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const navigate = useNavigate();

  // Mock admin notices data
  const adminNotices = [
    {
      id: 1,
      date: "Oct 15, 2025",
      title: "Mid-term Exam Schedule",
      message: "The mid-term examinations will be conducted from Oct 25 to Nov 5. Please prepare accordingly and check the detailed schedule in your dashboard.",
      priority: "high",
      hasImages: true,
      batch: "9th Standard - Section A",
    },
    {
      id: 2,
      date: "Oct 12, 2025",
      title: "Parent-Teacher Meeting",
      message: "We are organizing a parent-teacher meeting on Oct 20 at 4:00 PM. All parents are requested to attend.",
      priority: "medium",
      hasImages: false,
      batch: "All Batches",
    },
    {
      id: 3,
      date: "Oct 8, 2025",
      title: "Holiday Notice - Diwali",
      message: "The institute will remain closed from Oct 28 to Nov 2 for Diwali celebrations. Classes will resume on Nov 3.",
      priority: "medium",
      hasImages: true,
      batch: "All Batches",
    },
    {
      id: 4,
      date: "Oct 5, 2025",
      title: "Sports Day Announcement",
      message: "Annual Sports Day will be held on Nov 10. Students interested in participating should register by Oct 15.",
      priority: "low",
      hasImages: true,
      batch: "All Batches",
    },
  ];

  // Mock subject-wise notices
  const subjectNotices = [
    {
      id: 1,
      subject: "Mathematics",
      icon: Calculator,
      date: "Oct 16, 2025",
      type: "Test Announcement",
      title: "Chapter 5 Test on Oct 22",
      message: "Unit test on Algebra will be conducted on Oct 22. Topics include linear equations and quadratic equations.",
      badge: "Upcoming Test",
      badgeColor: "destructive",
    },
    {
      id: 2,
      subject: "Mathematics",
      icon: Calculator,
      date: "Oct 14, 2025",
      type: "Resource Uploaded",
      title: "Practice Problems for Geometry",
      message: "New practice problems have been uploaded for Chapter 6 - Geometry. Access them from the resources section.",
      badge: "New Resource",
      badgeColor: "default",
    },
    {
      id: 3,
      subject: "Science",
      icon: Beaker,
      date: "Oct 15, 2025",
      type: "Test Results",
      title: "Chapter 3 Test Results Declared",
      message: "Results for the Physics chapter test are now available. Check your scores in the report section.",
      badge: "Results Out",
      badgeColor: "secondary",
    },
    {
      id: 4,
      subject: "Science",
      icon: Beaker,
      date: "Oct 13, 2025",
      type: "Resource Uploaded",
      title: "Chemistry Lab Manual Updated",
      message: "Updated chemistry lab manual with new experiments has been uploaded. Please download before next lab session.",
      badge: "New Resource",
      badgeColor: "default",
    },
    {
      id: 5,
      subject: "English",
      icon: BookOpen,
      date: "Oct 17, 2025",
      type: "Test Announcement",
      title: "Grammar Test - Oct 25",
      message: "Grammar test covering tenses, articles, and prepositions will be held on Oct 25.",
      badge: "Upcoming Test",
      badgeColor: "destructive",
    },
    {
      id: 6,
      subject: "English",
      icon: BookOpen,
      date: "Oct 10, 2025",
      type: "Resource Uploaded",
      title: "Essay Writing Guide",
      message: "Comprehensive guide on essay writing techniques has been shared. Essential for upcoming exams.",
      badge: "New Resource",
      badgeColor: "default",
    },
    {
      id: 7,
      subject: "Social Studies",
      icon: Globe,
      date: "Oct 11, 2025",
      type: "Test Results",
      title: "History Quiz Results",
      message: "Results for the Indian Independence Movement quiz are available now.",
      badge: "Results Out",
      badgeColor: "secondary",
    },
    {
      id: 8,
      subject: "Marathi",
      icon: Languages,
      date: "Oct 9, 2025",
      type: "Test Announcement",
      title: "Kavita Pariksha - Oct 28",
      message: "Marathi poetry test will cover all poems from chapters 1-4. Prepare thoroughly.",
      badge: "Upcoming Test",
      badgeColor: "destructive",
    },
  ];

  const subjects = [
    { name: "All Subjects", value: "all" },
    { name: "Mathematics", value: "Mathematics" },
    { name: "Science", value: "Science" },
    { name: "English", value: "English" },
    { name: "Social Studies", value: "Social Studies" },
    { name: "Marathi", value: "Marathi" },
    { name: "Hindi", value: "Hindi" },
  ];

  const filteredSubjectNotices = selectedSubject === "all" 
    ? subjectNotices 
    : subjectNotices.filter(notice => notice.subject === selectedSubject);

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
              <Users className="h-5 w-5" />
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
            <h1 className="text-2xl font-bold text-primary">Notices & Announcements</h1>
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
          {/* Page Title */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Stay Updated
            </h2>
            <p className="text-muted-foreground">View important announcements and subject-specific updates</p>
          </div>

          {/* Tabs for Admin vs Subject Notices */}
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="admin">
                <Bell className="h-4 w-4 mr-2" />
                Admin Notices
              </TabsTrigger>
              <TabsTrigger value="subjects">
                <BookOpen className="h-4 w-4 mr-2" />
                Subject Notices
              </TabsTrigger>
            </TabsList>

            {/* Admin Notices Tab */}
            <TabsContent value="admin" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    General Announcements
                  </CardTitle>
                  <CardDescription>Important notices from administration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminNotices.map((notice) => (
                      <div key={notice.id} className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{notice.title}</h4>
                              <Badge variant={getPriorityColor(notice.priority) as any}>
                                {notice.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{notice.message}</p>
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {notice.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {notice.batch}
                              </span>
                              {notice.hasImages && (
                                <span className="text-primary font-medium">📷 Has attachments</span>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/student/notice/${notice.id}`, { state: { notice, type: 'admin' } })}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subject Notices Tab */}
            <TabsContent value="subjects" className="mt-6">
              <div className="space-y-6">
                {/* Subject Filter */}
                <Card>
                  <CardHeader>
                    <CardTitle>Filter by Subject</CardTitle>
                    <CardDescription>Select a subject to view specific notices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <Button
                          key={subject.value}
                          variant={selectedSubject === subject.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSubject(subject.value)}
                        >
                          {subject.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Subject Notices List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Subject Updates
                    </CardTitle>
                    <CardDescription>
                      {selectedSubject === "all" 
                        ? "All subject-specific announcements" 
                        : `${selectedSubject} announcements`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredSubjectNotices.length > 0 ? (
                      <div className="space-y-4">
                        {filteredSubjectNotices.map((notice) => (
                          <div 
                            key={notice.id} 
                            className="group p-5 border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer bg-card"
                            onClick={() => navigate(`/student/notice/${notice.id}`, { state: { notice, type: 'subject' } })}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <notice.icon className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                                      {notice.title}
                                    </h4>
                                    <Badge 
                                      variant={notice.badgeColor as any}
                                      className="text-xs font-semibold shadow-sm"
                                    >
                                      {notice.badge}
                                    </Badge>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/student/notice/${notice.id}`, { state: { notice, type: 'subject' } });
                                    }}
                                  >
                                    View
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                                  {notice.message}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-xs">
                                  <span className="flex items-center gap-1.5 text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span className="font-medium">{notice.date}</span>
                                  </span>
                                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                  <span className="flex items-center gap-1.5 font-semibold text-primary">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    {notice.subject}
                                  </span>
                                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                  <span className="text-muted-foreground font-medium">{notice.type}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p>No notices available for {selectedSubject}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StudentNotices;