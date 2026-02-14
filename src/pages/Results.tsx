import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown,
  Sparkles,
  TrendingUp,
  Award,
  GraduationCap,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Results = () => {
  const [selectedStandard, setSelectedStandard] = useState<number | null>(null);

  const standards = Array.from({ length: 10 }, (_, i) => i + 1);

  const resultsData = {
    1: {
      year: "2024-25",
      totalStudents: 45,
      passPercentage: 98,
      toppers: [
        { rank: 1, name: "Aarav Sharma", percentage: 98.5, image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Priya Patel", percentage: 97.2, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Arjun Kumar", percentage: 96.8, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    2: {
      year: "2024-25",
      totalStudents: 52,
      passPercentage: 97,
      toppers: [
        { rank: 1, name: "Ananya Singh", percentage: 99.1, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Rohan Gupta", percentage: 98.4, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Kavya Reddy", percentage: 97.9, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    3: {
      year: "2024-25",
      totalStudents: 48,
      passPercentage: 99,
      toppers: [
        { rank: 1, name: "Vihaan Joshi", percentage: 98.8, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Ishita Verma", percentage: 97.5, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Aditya Nair", percentage: 96.3, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    4: {
      year: "2024-25",
      totalStudents: 55,
      passPercentage: 96,
      toppers: [
        { rank: 1, name: "Sanya Kapoor", percentage: 97.9, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Reyansh Mehta", percentage: 96.7, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Diya Sharma", percentage: 95.4, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    5: {
      year: "2024-25",
      totalStudents: 60,
      passPercentage: 98,
      toppers: [
        { rank: 1, name: "Kabir Singh", percentage: 99.3, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Myra Iyer", percentage: 98.1, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Arnav Desai", percentage: 97.6, image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    6: {
      year: "2024-25",
      totalStudents: 58,
      passPercentage: 97,
      toppers: [
        { rank: 1, name: "Aisha Khan", percentage: 98.7, image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Vivaan Rao", percentage: 97.3, image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Zara Saxena", percentage: 96.9, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    7: {
      year: "2024-25",
      totalStudents: 50,
      passPercentage: 95,
      toppers: [
        { rank: 1, name: "Advait Menon", percentage: 97.5, image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Saanvi Pillai", percentage: 96.8, image: "https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Dhruv Agarwal", percentage: 95.2, image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    8: {
      year: "2024-25",
      totalStudents: 47,
      passPercentage: 96,
      toppers: [
        { rank: 1, name: "Kiara Bose", percentage: 98.2, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Shaurya Malhotra", percentage: 97.0, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Nisha Tiwari", percentage: 96.5, image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    9: {
      year: "2024-25",
      totalStudents: 62,
      passPercentage: 94,
      toppers: [
        { rank: 1, name: "Aryan Chatterjee", percentage: 96.9, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Mira Jain", percentage: 95.7, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Yash Pandey", percentage: 94.8, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
      ]
    },
    10: {
      year: "2024-25",
      totalStudents: 65,
      passPercentage: 100,
      toppers: [
        { rank: 1, name: "Riya Banerjee", percentage: 99.6, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face" },
        { rank: 2, name: "Dev Choudhary", percentage: 98.9, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
        { rank: 3, name: "Tara Bhatt", percentage: 98.2, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
      ]
    },
  };

  const stats = [
    { icon: Trophy, value: "500+", label: "Students Passed", color: "text-yellow-500" },
    { icon: Medal, value: "97%", label: "Average Pass Rate", color: "text-blue-500" },
    { icon: Star, value: "150+", label: "Distinction Holders", color: "text-purple-500" },
    { icon: GraduationCap, value: "13+", label: "Years of Excellence", color: "text-green-500" },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "from-yellow-400 via-yellow-500 to-amber-600";
      case 2: return "from-gray-300 via-gray-400 to-slate-500";
      case 3: return "from-amber-600 via-amber-700 to-orange-800";
      default: return "from-primary to-primary";
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return { icon: Crown, bg: "bg-gradient-to-r from-yellow-400 to-amber-500", text: "1st" };
      case 2: return { icon: Medal, bg: "bg-gradient-to-r from-gray-300 to-slate-400", text: "2nd" };
      case 3: return { icon: Award, bg: "bg-gradient-to-r from-amber-600 to-orange-700", text: "3rd" };
      default: return { icon: Star, bg: "bg-primary", text: `${rank}th` };
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return "h-32";
      case 2: return "h-24";
      case 3: return "h-20";
      default: return "h-16";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Floating trophies */}
        <div className="absolute top-32 right-20 animate-bounce" style={{ animationDuration: "3s" }}>
          <Trophy className="w-12 h-12 text-yellow-500/30" />
        </div>
        <div className="absolute top-48 left-20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <Medal className="w-10 h-10 text-amber-500/30" />
        </div>
        <div className="absolute bottom-32 right-40 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
          <Star className="w-8 h-8 text-orange-500/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-4 py-2 rounded-full mb-6 animate-fade-in border border-yellow-500/30">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Pride of EduCoach</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Our <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">Achievers</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Celebrating excellence! Meet the brilliant minds who topped their classes 
              and made us proud with their outstanding performance.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-border/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Selection */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Select Standard</h2>
            <p className="text-muted-foreground">Choose a class to view top performers</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {standards.map((std, index) => (
              <Button
                key={std}
                variant={selectedStandard === std ? "default" : "outline"}
                onClick={() => setSelectedStandard(std)}
                className={`min-w-[80px] transition-all duration-300 animate-fade-in ${
                  selectedStandard === std 
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0 shadow-lg shadow-yellow-500/30 scale-110" 
                    : "hover:border-yellow-500/50 hover:bg-yellow-50"
                }`}
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                {std === 1 ? "1st" : std === 2 ? "2nd" : std === 3 ? "3rd" : `${std}th`} Std
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Display */}
      {selectedStandard && (
        <section className="py-12 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Class Info Header */}
              <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-3xl p-8 mb-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-8 h-8" />
                      <h3 className="text-3xl font-bold">
                        {selectedStandard === 1 ? "1st" : selectedStandard === 2 ? "2nd" : selectedStandard === 3 ? "3rd" : `${selectedStandard}th`} Standard Results
                      </h3>
                    </div>
                    <p className="text-white/80">Academic Year {resultsData[selectedStandard as keyof typeof resultsData].year}</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{resultsData[selectedStandard as keyof typeof resultsData].totalStudents}</div>
                      <div className="text-sm text-white/80">Total Students</div>
                    </div>
                    <div className="w-px bg-white/30" />
                    <div className="text-center">
                      <div className="text-4xl font-bold">{resultsData[selectedStandard as keyof typeof resultsData].passPercentage}%</div>
                      <div className="text-sm text-white/80">Pass Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Podium Display */}
              <div className="flex justify-center items-end gap-4 md:gap-8 mb-12">
                {/* 2nd Place */}
                <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="relative mb-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-400 shadow-xl">
                      <img 
                        src={resultsData[selectedStandard as keyof typeof resultsData].toppers[1].image} 
                        alt={resultsData[selectedStandard as keyof typeof resultsData].toppers[1].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-gray-300 to-slate-400 rounded-full p-2 shadow-lg">
                      <Medal className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className={`w-28 md:w-36 ${getPodiumHeight(2)} bg-gradient-to-b from-gray-300 to-slate-400 rounded-t-xl flex flex-col items-center justify-start pt-4 shadow-xl`}>
                    <span className="text-2xl font-bold text-white">2nd</span>
                    <span className="text-lg font-semibold text-white">{resultsData[selectedStandard as keyof typeof resultsData].toppers[1].percentage}%</span>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-semibold text-foreground text-sm md:text-base">{resultsData[selectedStandard as keyof typeof resultsData].toppers[1].name}</p>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <div className="relative mb-4">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: "2s" }}>
                      <Crown className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl ring-4 ring-yellow-500/30">
                      <img 
                        src={resultsData[selectedStandard as keyof typeof resultsData].toppers[0].image} 
                        alt={resultsData[selectedStandard as keyof typeof resultsData].toppers[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full p-2 shadow-lg animate-pulse">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className={`w-32 md:w-44 ${getPodiumHeight(1)} bg-gradient-to-b from-yellow-400 via-yellow-500 to-amber-600 rounded-t-xl flex flex-col items-center justify-start pt-4 shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                    <span className="text-3xl font-bold text-white relative z-10">1st</span>
                    <span className="text-xl font-semibold text-white relative z-10">{resultsData[selectedStandard as keyof typeof resultsData].toppers[0].percentage}%</span>
                    <Sparkles className="w-4 h-4 text-white/50 absolute top-2 right-2" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-bold text-foreground text-base md:text-lg">{resultsData[selectedStandard as keyof typeof resultsData].toppers[0].name}</p>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="relative mb-4">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-amber-700 shadow-xl">
                      <img 
                        src={resultsData[selectedStandard as keyof typeof resultsData].toppers[2].image} 
                        alt={resultsData[selectedStandard as keyof typeof resultsData].toppers[2].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full p-2 shadow-lg">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className={`w-24 md:w-32 ${getPodiumHeight(3)} bg-gradient-to-b from-amber-600 to-orange-800 rounded-t-xl flex flex-col items-center justify-start pt-3 shadow-xl`}>
                    <span className="text-xl font-bold text-white">3rd</span>
                    <span className="text-base font-semibold text-white">{resultsData[selectedStandard as keyof typeof resultsData].toppers[2].percentage}%</span>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-semibold text-foreground text-xs md:text-sm">{resultsData[selectedStandard as keyof typeof resultsData].toppers[2].name}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {resultsData[selectedStandard as keyof typeof resultsData].toppers.map((topper, index) => {
                  const badge = getRankBadge(topper.rank);
                  return (
                    <div
                      key={topper.rank}
                      className="bg-card rounded-2xl p-6 border border-border/50 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1 animate-fade-in"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${topper.rank === 1 ? 'border-yellow-500' : topper.rank === 2 ? 'border-gray-400' : 'border-amber-700'}`}>
                            <img src={topper.image} alt={topper.name} className="w-full h-full object-cover" />
                          </div>
                          <div className={`absolute -top-1 -right-1 ${badge.bg} rounded-full w-6 h-6 flex items-center justify-center shadow-lg`}>
                            <badge.icon className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground">{topper.name}</h4>
                          <p className="text-sm text-muted-foreground">Rank #{topper.rank}</p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Score</span>
                              <span className="font-bold text-foreground">{topper.percentage}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${getRankColor(topper.rank)} transition-all duration-1000`}
                                style={{ width: `${topper.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Standards Overview */}
      {!selectedStandard && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Class-wise Top Performers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quick overview of rank holders from each class. Click on a standard above to see detailed results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {standards.map((std, index) => {
                const data = resultsData[std as keyof typeof resultsData];
                return (
                  <div
                    key={std}
                    onClick={() => setSelectedStandard(std)}
                    className="bg-card rounded-2xl p-6 border border-border/50 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 cursor-pointer group hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {std === 1 ? "1st" : std === 2 ? "2nd" : std === 3 ? "3rd" : `${std}th`} Std
                      </div>
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="space-y-3">
                      {data.toppers.map((topper) => (
                        <div key={topper.rank} className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                              <img src={topper.image} alt={topper.name} className="w-full h-full object-cover" />
                            </div>
                            {topper.rank === 1 && (
                              <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{topper.name}</p>
                            <p className="text-xs text-muted-foreground">{topper.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-sm">
                      <span className="text-muted-foreground">Pass Rate</span>
                      <span className="font-bold text-green-600">{data.passPercentage}%</span>
                    </div>

                    <div className="mt-3 text-center">
                      <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to view details →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Results;
