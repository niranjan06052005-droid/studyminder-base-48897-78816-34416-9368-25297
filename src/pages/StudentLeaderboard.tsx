import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, LogOut, Trophy, Medal, Award, TrendingUp, Crown, Star } from "lucide-react";

// Mock leaderboard data
const mockLeaderboardData = {
  mathematics: {
    unitTest1: [
      { rank: 1, name: "Priya Desai", rollNo: "10A06", score: 48, maxScore: 50, percentage: 96, grade: "A+" },
      { rank: 2, name: "Aarav Sharma", rollNo: "10A01", score: 45, maxScore: 50, percentage: 90, grade: "A+" },
      { rank: 3, name: "Arjun Mehta", rollNo: "10A05", score: 44, maxScore: 50, percentage: 88, grade: "A" },
      { rank: 4, name: "Ananya Singh", rollNo: "10A04", score: 42, maxScore: 50, percentage: 84, grade: "A" },
      { rank: 5, name: "Rohan Kumar", rollNo: "10A03", score: 40, maxScore: 50, percentage: 80, grade: "A" },
      { rank: 6, name: "Isha Reddy", rollNo: "10A08", score: 38, maxScore: 50, percentage: 76, grade: "B" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 35, maxScore: 50, percentage: 70, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 32, maxScore: 50, percentage: 64, grade: "C" },
    ],
    semester1: [
      { rank: 1, name: "Aarav Sharma", rollNo: "10A01", score: 92, maxScore: 100, percentage: 92, grade: "A+" },
      { rank: 2, name: "Priya Desai", rollNo: "10A06", score: 90, maxScore: 100, percentage: 90, grade: "A+" },
      { rank: 3, name: "Ananya Singh", rollNo: "10A04", score: 88, maxScore: 100, percentage: 88, grade: "A" },
      { rank: 4, name: "Arjun Mehta", rollNo: "10A05", score: 85, maxScore: 100, percentage: 85, grade: "A" },
      { rank: 5, name: "Rohan Kumar", rollNo: "10A03", score: 82, maxScore: 100, percentage: 82, grade: "A" },
      { rank: 6, name: "Isha Reddy", rollNo: "10A08", score: 78, maxScore: 100, percentage: 78, grade: "B" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 72, maxScore: 100, percentage: 72, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 68, maxScore: 100, percentage: 68, grade: "C" },
    ],
    unitTest2: [
      { rank: 1, name: "Arjun Mehta", rollNo: "10A05", score: 47, maxScore: 50, percentage: 94, grade: "A+" },
      { rank: 2, name: "Aarav Sharma", rollNo: "10A01", score: 46, maxScore: 50, percentage: 92, grade: "A+" },
      { rank: 3, name: "Priya Desai", rollNo: "10A06", score: 45, maxScore: 50, percentage: 90, grade: "A+" },
      { rank: 4, name: "Ananya Singh", rollNo: "10A04", score: 43, maxScore: 50, percentage: 86, grade: "A" },
      { rank: 5, name: "Isha Reddy", rollNo: "10A08", score: 41, maxScore: 50, percentage: 82, grade: "A" },
      { rank: 6, name: "Rohan Kumar", rollNo: "10A03", score: 39, maxScore: 50, percentage: 78, grade: "B" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 36, maxScore: 50, percentage: 72, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 33, maxScore: 50, percentage: 66, grade: "C" },
    ],
    finalSemester: [
      { rank: 1, name: "Aarav Sharma", rollNo: "10A01", score: 95, maxScore: 100, percentage: 95, grade: "A+" },
      { rank: 2, name: "Priya Desai", rollNo: "10A06", score: 93, maxScore: 100, percentage: 93, grade: "A+" },
      { rank: 3, name: "Arjun Mehta", rollNo: "10A05", score: 91, maxScore: 100, percentage: 91, grade: "A+" },
      { rank: 4, name: "Ananya Singh", rollNo: "10A04", score: 87, maxScore: 100, percentage: 87, grade: "A" },
      { rank: 5, name: "Isha Reddy", rollNo: "10A08", score: 84, maxScore: 100, percentage: 84, grade: "A" },
      { rank: 6, name: "Rohan Kumar", rollNo: "10A03", score: 80, maxScore: 100, percentage: 80, grade: "A" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 75, maxScore: 100, percentage: 75, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 70, maxScore: 100, percentage: 70, grade: "B" },
    ],
  },
  science: {
    unitTest1: [
      { rank: 1, name: "Ananya Singh", rollNo: "10A04", score: 49, maxScore: 50, percentage: 98, grade: "A+" },
      { rank: 2, name: "Aarav Sharma", rollNo: "10A01", score: 47, maxScore: 50, percentage: 94, grade: "A+" },
      { rank: 3, name: "Isha Reddy", rollNo: "10A08", score: 46, maxScore: 50, percentage: 92, grade: "A+" },
      { rank: 4, name: "Priya Desai", rollNo: "10A06", score: 44, maxScore: 50, percentage: 88, grade: "A" },
      { rank: 5, name: "Arjun Mehta", rollNo: "10A05", score: 42, maxScore: 50, percentage: 84, grade: "A" },
      { rank: 6, name: "Rohan Kumar", rollNo: "10A03", score: 39, maxScore: 50, percentage: 78, grade: "B" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 36, maxScore: 50, percentage: 72, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 34, maxScore: 50, percentage: 68, grade: "C" },
    ],
    semester1: [
      { rank: 1, name: "Ananya Singh", rollNo: "10A04", score: 96, maxScore: 100, percentage: 96, grade: "A+" },
      { rank: 2, name: "Isha Reddy", rollNo: "10A08", score: 93, maxScore: 100, percentage: 93, grade: "A+" },
      { rank: 3, name: "Aarav Sharma", rollNo: "10A01", score: 91, maxScore: 100, percentage: 91, grade: "A+" },
      { rank: 4, name: "Priya Desai", rollNo: "10A06", score: 88, maxScore: 100, percentage: 88, grade: "A" },
      { rank: 5, name: "Arjun Mehta", rollNo: "10A05", score: 85, maxScore: 100, percentage: 85, grade: "A" },
      { rank: 6, name: "Rohan Kumar", rollNo: "10A03", score: 80, maxScore: 100, percentage: 80, grade: "A" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 75, maxScore: 100, percentage: 75, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 71, maxScore: 100, percentage: 71, grade: "B" },
    ],
    unitTest2: [
      { rank: 1, name: "Isha Reddy", rollNo: "10A08", score: 48, maxScore: 50, percentage: 96, grade: "A+" },
      { rank: 2, name: "Ananya Singh", rollNo: "10A04", score: 47, maxScore: 50, percentage: 94, grade: "A+" },
      { rank: 3, name: "Aarav Sharma", rollNo: "10A01", score: 45, maxScore: 50, percentage: 90, grade: "A+" },
      { rank: 4, name: "Priya Desai", rollNo: "10A06", score: 43, maxScore: 50, percentage: 86, grade: "A" },
      { rank: 5, name: "Arjun Mehta", rollNo: "10A05", score: 41, maxScore: 50, percentage: 82, grade: "A" },
      { rank: 6, name: "Rohan Kumar", rollNo: "10A03", score: 38, maxScore: 50, percentage: 76, grade: "B" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 35, maxScore: 50, percentage: 70, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 32, maxScore: 50, percentage: 64, grade: "C" },
    ],
    finalSemester: [
      { rank: 1, name: "Ananya Singh", rollNo: "10A04", score: 97, maxScore: 100, percentage: 97, grade: "A+" },
      { rank: 2, name: "Isha Reddy", rollNo: "10A08", score: 95, maxScore: 100, percentage: 95, grade: "A+" },
      { rank: 3, name: "Aarav Sharma", rollNo: "10A01", score: 92, maxScore: 100, percentage: 92, grade: "A+" },
      { rank: 4, name: "Priya Desai", rollNo: "10A06", score: 89, maxScore: 100, percentage: 89, grade: "A" },
      { rank: 5, name: "Arjun Mehta", rollNo: "10A05", score: 86, maxScore: 100, percentage: 86, grade: "A" },
      { rank: 6, name: "Rohan Kumar", rollNo: "10A03", score: 82, maxScore: 100, percentage: 82, grade: "A" },
      { rank: 7, name: "Vihaan Joshi", rollNo: "10A07", score: 77, maxScore: 100, percentage: 77, grade: "B" },
      { rank: 8, name: "Diya Patel", rollNo: "10A02", score: 73, maxScore: 100, percentage: 73, grade: "B" },
    ],
  },
};

const StudentLeaderboard = () => {
  const [selectedSubject, setSelectedSubject] = useState<"mathematics" | "science">("mathematics");
  const [selectedTest, setSelectedTest] = useState<"unitTest1" | "semester1" | "unitTest2" | "finalSemester">("unitTest1");
  
  const currentUser = "Aarav Sharma"; // Logged in user
  const leaderboardData = mockLeaderboardData[selectedSubject][selectedTest];
  const userRank = leaderboardData.find(student => student.name === currentUser);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-orange-600" />;
    return <Star className="h-4 w-4 text-muted-foreground" />;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50";
    if (rank === 2) return "bg-gray-400/20 text-gray-700 dark:text-gray-300 border-gray-400/50";
    if (rank === 3) return "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/50";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Student Portal</h1>
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

          {/* Your Performance Card */}
          {userRank && (
            <Card className="mb-6 gradient-card border-2 border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Your Performance</CardTitle>
                    <CardDescription>Current standing in selected test</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your Rank</p>
                    <p className="text-3xl font-bold text-primary">#{userRank.rank}</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                    <p className="text-3xl font-bold text-success">{userRank.score}/{userRank.maxScore}</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Percentage</p>
                    <p className="text-3xl font-bold">{userRank.percentage}%</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Grade</p>
                    <p className="text-3xl font-bold text-accent-foreground">{userRank.grade}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Subject & Test</CardTitle>
              <CardDescription>View rankings for different subjects and tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Select value={selectedSubject} onValueChange={(value: any) => setSelectedSubject(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Test Type</label>
                  <Select value={selectedTest} onValueChange={(value: any) => setSelectedTest(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unitTest1">Unit Test 1</SelectItem>
                      <SelectItem value="semester1">Semester 1</SelectItem>
                      <SelectItem value="unitTest2">Unit Test 2</SelectItem>
                      <SelectItem value="finalSemester">Final Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Table */}
          <Card className="gradient-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Class Rankings
                  </CardTitle>
                  <CardDescription>
                    {selectedSubject === "mathematics" ? "Mathematics" : "Science"} - {
                      selectedTest === "unitTest1" ? "Unit Test 1" :
                      selectedTest === "semester1" ? "Semester 1" :
                      selectedTest === "unitTest2" ? "Unit Test 2" :
                      "Final Semester"
                    }
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">8 Students</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Rank</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((student) => (
                    <TableRow 
                      key={student.rollNo} 
                      className={student.name === currentUser ? "bg-primary/5 border-l-4 border-primary" : ""}
                    >
                      <TableCell>
                        <div className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border ${getRankBadgeColor(student.rank)}`}>
                          {getRankIcon(student.rank)}
                          <span className="font-bold">#{student.rank}</span>
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
                        <span className="text-muted-foreground">/{student.maxScore}</span>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Performance Tips */}
          <Card className="mt-6 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Performance Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">Keep Up the Good Work!</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain consistent study habits and practice regularly to improve your rankings.
                  </p>
                </div>
                <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <h4 className="font-semibold text-accent-foreground mb-2">Learn from Top Rankers</h4>
                  <p className="text-sm text-muted-foreground">
                    Study together with high performers and learn their effective study strategies.
                  </p>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Track Your Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Compare your performance across different tests to identify areas for improvement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StudentLeaderboard;
