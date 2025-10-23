import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, LogOut, Trophy, Medal, Award, TrendingUp, Crown, Star, Target } from "lucide-react";

// Mock leaderboard data - matching teacher's test entry structure
const mockTestResults = {
  "class10a-mathematics": {
    "chapter1-unit": {
      testName: "Chapter 1 - Unit Test",
      maxMarks: 50,
      students: [
        { rollNo: "10A06", name: "Priya Desai", score: 48, percentage: 96, grade: "A+" },
        { rollNo: "10A01", name: "Aarav Sharma", score: 45, percentage: 90, grade: "A+" },
        { rollNo: "10A05", name: "Arjun Mehta", score: 44, percentage: 88, grade: "A" },
        { rollNo: "10A04", name: "Ananya Singh", score: 42, percentage: 84, grade: "A" },
        { rollNo: "10A03", name: "Rohan Kumar", score: 40, percentage: 80, grade: "A" },
        { rollNo: "10A08", name: "Isha Reddy", score: 38, percentage: 76, grade: "B" },
        { rollNo: "10A07", name: "Vihaan Joshi", score: 35, percentage: 70, grade: "B" },
        { rollNo: "10A02", name: "Diya Patel", score: 32, percentage: 64, grade: "C" },
      ]
    },
    "chapter2-unit": {
      testName: "Chapter 2 - Unit Test",
      maxMarks: 50,
      students: [
        { rollNo: "10A05", name: "Arjun Mehta", score: 47, percentage: 94, grade: "A+" },
        { rollNo: "10A01", name: "Aarav Sharma", score: 46, percentage: 92, grade: "A+" },
        { rollNo: "10A06", name: "Priya Desai", score: 45, percentage: 90, grade: "A+" },
        { rollNo: "10A04", name: "Ananya Singh", score: 43, percentage: 86, grade: "A" },
        { rollNo: "10A08", name: "Isha Reddy", score: 41, percentage: 82, grade: "A" },
        { rollNo: "10A03", name: "Rohan Kumar", score: 39, percentage: 78, grade: "B" },
        { rollNo: "10A07", name: "Vihaan Joshi", score: 36, percentage: 72, grade: "B" },
        { rollNo: "10A02", name: "Diya Patel", score: 33, percentage: 66, grade: "C" },
      ]
    },
    "midterm": {
      testName: "Mid-Term Examination",
      maxMarks: 100,
      students: [
        { rollNo: "10A01", name: "Aarav Sharma", score: 92, percentage: 92, grade: "A+" },
        { rollNo: "10A06", name: "Priya Desai", score: 90, percentage: 90, grade: "A+" },
        { rollNo: "10A04", name: "Ananya Singh", score: 88, percentage: 88, grade: "A" },
        { rollNo: "10A05", name: "Arjun Mehta", score: 85, percentage: 85, grade: "A" },
        { rollNo: "10A03", name: "Rohan Kumar", score: 82, percentage: 82, grade: "A" },
        { rollNo: "10A08", name: "Isha Reddy", score: 78, percentage: 78, grade: "B" },
        { rollNo: "10A07", name: "Vihaan Joshi", score: 72, percentage: 72, grade: "B" },
        { rollNo: "10A02", name: "Diya Patel", score: 68, percentage: 68, grade: "C" },
      ]
    }
  },
  "class10a-science": {
    "chapter1-unit": {
      testName: "Chapter 1 - Unit Test",
      maxMarks: 50,
      students: [
        { rollNo: "10A04", name: "Ananya Singh", score: 49, percentage: 98, grade: "A+" },
        { rollNo: "10A01", name: "Aarav Sharma", score: 47, percentage: 94, grade: "A+" },
        { rollNo: "10A08", name: "Isha Reddy", score: 46, percentage: 92, grade: "A+" },
        { rollNo: "10A06", name: "Priya Desai", score: 44, percentage: 88, grade: "A" },
        { rollNo: "10A05", name: "Arjun Mehta", score: 42, percentage: 84, grade: "A" },
        { rollNo: "10A03", name: "Rohan Kumar", score: 39, percentage: 78, grade: "B" },
        { rollNo: "10A07", name: "Vihaan Joshi", score: 36, percentage: 72, grade: "B" },
        { rollNo: "10A02", name: "Diya Patel", score: 34, percentage: 68, grade: "C" },
      ]
    },
    "chapter2-unit": {
      testName: "Chapter 2 - Unit Test",
      maxMarks: 50,
      students: [
        { rollNo: "10A08", name: "Isha Reddy", score: 48, percentage: 96, grade: "A+" },
        { rollNo: "10A04", name: "Ananya Singh", score: 47, percentage: 94, grade: "A+" },
        { rollNo: "10A01", name: "Aarav Sharma", score: 45, percentage: 90, grade: "A+" },
        { rollNo: "10A06", name: "Priya Desai", score: 43, percentage: 86, grade: "A" },
        { rollNo: "10A05", name: "Arjun Mehta", score: 41, percentage: 82, grade: "A" },
        { rollNo: "10A03", name: "Rohan Kumar", score: 38, percentage: 76, grade: "B" },
        { rollNo: "10A07", name: "Vihaan Joshi", score: 35, percentage: 70, grade: "B" },
        { rollNo: "10A02", name: "Diya Patel", score: 32, percentage: 64, grade: "C" },
      ]
    },
    "midterm": {
      testName: "Mid-Term Examination",
      maxMarks: 100,
      students: [
        { rollNo: "10A04", name: "Ananya Singh", score: 96, percentage: 96, grade: "A+" },
        { rollNo: "10A08", name: "Isha Reddy", score: 93, percentage: 93, grade: "A+" },
        { rollNo: "10A01", name: "Aarav Sharma", score: 91, percentage: 91, grade: "A+" },
        { rollNo: "10A06", name: "Priya Desai", score: 88, percentage: 88, grade: "A" },
        { rollNo: "10A05", name: "Arjun Mehta", score: 85, percentage: 85, grade: "A" },
        { rollNo: "10A03", name: "Rohan Kumar", score: 80, percentage: 80, grade: "A" },
        { rollNo: "10A07", name: "Vihaan Joshi", score: 75, percentage: 75, grade: "B" },
        { rollNo: "10A02", name: "Diya Patel", score: 71, percentage: 71, grade: "B" },
      ]
    }
  }
};

const StudentLeaderboard = () => {
  const [selectedBatch, setSelectedBatch] = useState("class10a-mathematics");
  const [selectedTest, setSelectedTest] = useState("chapter1-unit");
  
  const currentUser = "Aarav Sharma"; // Logged in user
  
  // Get current test data
  const testData = mockTestResults[selectedBatch]?.[selectedTest];
  const leaderboardData = testData?.students || [];
  const userRank = leaderboardData.findIndex(student => student.name === currentUser) + 1;
  const userDetails = leaderboardData.find(student => student.name === currentUser);
  
  // Calculate class statistics
  const classAverage = leaderboardData.length > 0
    ? (leaderboardData.reduce((sum, s) => sum + s.percentage, 0) / leaderboardData.length).toFixed(1)
    : 0;
  const highestScore = leaderboardData[0]?.score || 0;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-orange-600" />;
    return <Star className="h-4 w-4 text-muted-foreground" />;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50";
    if (rank === 2) return "bg-gray-400/20 text-gray-700 dark:text-gray-300 border-gray-400/50";
    if (rank === 3) return "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/50";
    return "bg-muted text-muted-foreground border-border";
  };
  
  const getBatchLabel = (batchKey: string) => {
    if (batchKey === "class10a-mathematics") return "Class 10 A - Mathematics";
    if (batchKey === "class10a-science") return "Class 10 A - Science";
    return batchKey;
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Student Portal</h1>
          <p className="text-sm text-white/60 mt-1">{currentUser}</p>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home/Dashboard</span>
            </Link>
            
            <Link to="/student/report" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>My Report</span>
            </Link>
            
            <Link to="/student/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
            
            <Link to="/student/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </Link>
            
            <Link to="/student/achievements" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Award className="h-5 w-5" />
              <span>Achievements</span>
            </Link>
            
            <Link to="/student/fun-spot" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Fun Spot</span>
            </Link>
            
            <Link to="/student/fees" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Fees</span>
            </Link>
            
            <Link to="/student/notices" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Notices</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Leaderboard</h1>
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
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">Class Rankings</h2>
            <p className="text-muted-foreground">See where you stand among your classmates</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Subject & Chapter</CardTitle>
              <CardDescription>View rankings for specific test and chapter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Batch (Class - Subject)</label>
                  <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class10a-mathematics">Class 10 A - Mathematics</SelectItem>
                      <SelectItem value="class10a-science">Class 10 A - Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Test / Chapter</label>
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chapter1-unit">Chapter 1 - Unit Test</SelectItem>
                      <SelectItem value="chapter2-unit">Chapter 2 - Unit Test</SelectItem>
                      <SelectItem value="midterm">Mid-Term Examination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Performance Card */}
          {userDetails && userRank > 0 && (
            <Card className="mb-6 gradient-card border-2 border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Your Performance</CardTitle>
                    <CardDescription>Current standing in {testData?.testName}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your Rank</p>
                    <div className="flex items-center gap-2">
                      {getRankIcon(userRank)}
                      <p className="text-3xl font-bold text-primary">#{userRank}</p>
                    </div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                    <p className="text-3xl font-bold text-success">{userDetails.score}/{testData?.maxMarks}</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Percentage</p>
                    <p className="text-3xl font-bold">{userDetails.percentage}%</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Grade</p>
                    <p className="text-3xl font-bold text-accent-foreground">{userDetails.grade}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top 3 Podium */}
          {leaderboardData.length >= 3 && (
            <Card className="mb-6 gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Performers
                </CardTitle>
                <CardDescription>{testData?.testName} - {getBatchLabel(selectedBatch)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-end gap-4">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-32 bg-gray-400/20 border-2 border-gray-400/50 rounded-lg flex flex-col items-center justify-center">
                      <Medal className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-2xl font-bold text-gray-400">2</span>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-bold">{leaderboardData[1].name}</p>
                      <p className="text-sm text-muted-foreground">{leaderboardData[1].rollNo}</p>
                      <p className="text-lg font-bold text-success mt-1">{leaderboardData[1].score}/{testData?.maxMarks}</p>
                      <p className="text-sm text-muted-foreground">{leaderboardData[1].percentage}%</p>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="flex flex-col items-center -mt-6">
                    <div className="w-28 h-40 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-lg flex flex-col items-center justify-center">
                      <Crown className="h-16 w-16 text-yellow-500 mb-2" />
                      <span className="text-3xl font-bold text-yellow-500">1</span>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-bold text-lg">{leaderboardData[0].name}</p>
                      <p className="text-sm text-muted-foreground">{leaderboardData[0].rollNo}</p>
                      <p className="text-xl font-bold text-success mt-1">{leaderboardData[0].score}/{testData?.maxMarks}</p>
                      <p className="text-sm text-muted-foreground">{leaderboardData[0].percentage}%</p>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-32 bg-orange-500/20 border-2 border-orange-500/50 rounded-lg flex flex-col items-center justify-center">
                      <Medal className="h-12 w-12 text-orange-600 mb-2" />
                      <span className="text-2xl font-bold text-orange-600">3</span>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-bold">{leaderboardData[2].name}</p>
                      <p className="text-sm text-muted-foreground">{leaderboardData[2].rollNo}</p>
                      <p className="text-lg font-bold text-success mt-1">{leaderboardData[2].score}/{testData?.maxMarks}</p>
                      <p className="text-sm text-muted-foreground">{leaderboardData[2].percentage}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}


          {/* Complete Leaderboard Table */}
          <Card className="gradient-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Complete Rankings
                  </CardTitle>
                  <CardDescription>
                    {testData?.testName} - {getBatchLabel(selectedBatch)}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">{leaderboardData.length} Students</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Rank</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((student, index) => {
                    const rank = index + 1;
                    return (
                      <TableRow 
                        key={student.rollNo} 
                        className={student.name === currentUser ? "bg-primary/5 border-l-4 border-primary" : ""}
                      >
                        <TableCell>
                          <div className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border ${getRankBadgeColor(rank)}`}>
                            {getRankIcon(rank)}
                            <span className="font-bold">#{rank}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{student.name}</span>
                            {student.name === currentUser && (
                              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">You</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{student.score}</span>
                          <span className="text-muted-foreground">/{testData?.maxMarks}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  student.percentage >= 90 ? "bg-success" :
                                  student.percentage >= 75 ? "bg-accent-foreground" :
                                  "bg-destructive"
                                }`}
                                style={{ width: `${student.percentage}%` }}
                              />
                            </div>
                            <span className="font-medium">{student.percentage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                            student.grade === "A+" || student.grade === "A" 
                              ? "bg-success/20 text-success border border-success/50" :
                            student.grade === "B" 
                              ? "bg-accent/20 text-accent-foreground border border-accent/50" :
                              "bg-destructive/20 text-destructive border border-destructive/50"
                          }`}>
                            {student.grade}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
};

export default StudentLeaderboard;
