import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Users, Trophy, BookOpen, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { icon: Users, value: "500+", label: "Students Enrolled", delay: "0s" },
    { icon: Trophy, value: "95%", label: "Success Rate", delay: "0.1s" },
    { icon: BookOpen, value: "10+", label: "Expert Teachers", delay: "0.2s" },
    { icon: Clock, value: "15+", label: "Years Experience", delay: "0.3s" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
      
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-secondary via-secondary/50 to-transparent rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-accent via-accent/50 to-transparent rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-success/30 to-secondary/30 rounded-full blur-3xl animate-pulse"
        />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large rotating ring */}
        <div className="absolute top-20 -right-20 w-[400px] h-[400px] border-2 border-white/10 rounded-full animate-spin" style={{ animationDuration: '25s' }} />
        <div className="absolute top-20 -right-20 w-[350px] h-[350px] border border-white/5 rounded-full animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
        
        {/* Floating circles */}
        <div className="absolute top-32 left-[10%] w-4 h-4 bg-accent rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-48 left-[20%] w-3 h-3 bg-secondary rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
        <div className="absolute top-60 right-[15%] w-5 h-5 bg-success rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-40 left-[15%] w-3 h-3 bg-accent rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }} />
        <div className="absolute bottom-32 right-[25%] w-4 h-4 bg-secondary rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s', animationDuration: '3.2s' }} />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-[5%] w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-[5%] w-40 h-40 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in hover:bg-white/15 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-medium">Admissions Open for 2024-25</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block animate-fade-in">Shape Your</span>
                <span className="block mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent/70">
                      Future
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-4 bg-accent/20 blur-lg"></span>
                  </span>
                  {" "}Today
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-light animate-fade-in max-w-lg" style={{ animationDelay: '0.2s' }}>
                Quality coaching from Std. 1st to 10th with expert teachers and personalized attention
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/get-started">
                <Button 
                  size="lg" 
                  className="group relative px-8 py-7 text-lg bg-accent hover:bg-accent/90 text-primary font-semibold rounded-2xl shadow-2xl shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="group px-8 py-7 text-lg bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Video
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent border-2 border-primary flex items-center justify-center text-xs font-bold text-white"
                  >
                    {i === 4 ? "99+" : ""}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/70">
                <span className="text-white font-semibold">500+ students</span> already enrolled
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="relative">
            {/* Central Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-secondary/10 to-transparent rounded-3xl blur-3xl" />
            
            {/* Stats Grid */}
            <div className="relative grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 animate-fade-in overflow-hidden"
                  style={{ animationDelay: stat.delay }}
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-success to-success/80 text-white text-sm font-semibold shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                #1 in Results
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-background"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
