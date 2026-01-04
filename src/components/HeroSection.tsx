import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Users, Trophy, BookOpen, Clock, Star, Zap } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24">
      {/* Multi-layer Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,86%,12%)] via-[hsl(210,86%,16%)] to-[hsl(200,70%,20%)]" />
        
        {/* Animated color waves */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="absolute -top-1/2 -left-1/4 w-[120%] h-[120%] bg-gradient-to-br from-secondary/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse"
            style={{ 
              transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px) rotate(${mousePosition.x}deg)`,
              transition: 'transform 1.5s ease-out'
            }}
          />
          <div 
            className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[100%] bg-gradient-to-tl from-accent/50 via-accent/20 to-transparent rounded-full blur-3xl"
            style={{ 
              transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`,
              transition: 'transform 1.5s ease-out',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-1/4 right-1/4 w-[60%] h-[60%] bg-gradient-to-bl from-success/30 via-secondary/20 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '5s' }}
          />
        </div>

        {/* Aurora effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-secondary/40 via-transparent to-transparent blur-3xl" 
               style={{ animation: 'aurora 8s ease-in-out infinite' }} />
          <div className="absolute top-0 right-1/4 w-1/3 h-full bg-gradient-to-b from-accent/30 via-transparent to-transparent blur-3xl" 
               style={{ animation: 'aurora 6s ease-in-out infinite reverse' }} />
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Floating Geometric Shapes with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large rotating rings */}
        <div className="absolute top-10 -right-32 w-[500px] h-[500px] border-2 border-secondary/20 rounded-full" 
             style={{ animation: 'spin 30s linear infinite' }} />
        <div className="absolute top-10 -right-32 w-[450px] h-[450px] border border-accent/10 rounded-full" 
             style={{ animation: 'spin 25s linear infinite reverse' }} />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] border border-secondary/10 rounded-full" 
             style={{ animation: 'spin 20s linear infinite' }} />
        
        {/* Floating icons with glow */}
        <div className="absolute top-32 left-[8%] animate-float">
          <div className="relative">
            <Star className="w-8 h-8 text-accent/60" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl" />
          </div>
        </div>
        <div className="absolute top-48 left-[18%] animate-float" style={{ animationDelay: '1s' }}>
          <div className="relative">
            <Zap className="w-6 h-6 text-secondary/50" />
            <div className="absolute inset-0 bg-secondary/20 rounded-full blur-lg" />
          </div>
        </div>
        <div className="absolute top-60 right-[12%] animate-float" style={{ animationDelay: '2s' }}>
          <div className="relative">
            <Sparkles className="w-7 h-7 text-accent/50" />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg" />
          </div>
        </div>
        <div className="absolute bottom-48 left-[12%] animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="relative">
            <BookOpen className="w-6 h-6 text-success/50" />
            <div className="absolute inset-0 bg-success/20 rounded-full blur-lg" />
          </div>
        </div>
        <div className="absolute bottom-36 right-[20%] animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="relative">
            <Trophy className="w-7 h-7 text-accent/40" />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg" />
          </div>
        </div>

        {/* Glowing orbs with movement */}
        <div className="absolute top-1/4 left-[3%] w-40 h-40 bg-gradient-to-br from-secondary/30 to-transparent rounded-full blur-3xl"
             style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-[3%] w-48 h-48 bg-gradient-to-tl from-accent/25 to-transparent rounded-full blur-3xl"
             style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-secondary/10 via-transparent to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in hover:bg-white/15 transition-colors cursor-default group">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-medium group-hover:text-accent transition-colors">Admissions Open for 2024-25</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block animate-fade-in bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">Shape Your</span>
                <span className="block mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <span className="relative inline-block">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent/80 animate-pulse" style={{ animationDuration: '3s' }}>
                      Future
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-6 bg-gradient-to-r from-accent/40 via-accent/20 to-transparent blur-xl"></span>
                  </span>
                  <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">{" "}Today</span>
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
                  className="group relative px-8 py-7 text-lg bg-gradient-to-r from-accent via-accent to-accent/90 hover:from-accent/90 hover:to-accent text-primary font-semibold rounded-2xl shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-secondary via-secondary/80 to-accent border-2 border-primary/50 flex items-center justify-center text-xs font-bold text-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {i === 4 ? "99+" : ""}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/70">
                <span className="text-accent font-semibold">500+ students</span> already enrolled
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
                  className="group relative p-6 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:bg-white/[0.08] hover:border-accent/30 transition-all duration-500 hover:scale-105 animate-fade-in overflow-hidden"
                  style={{ animationDelay: stat.delay }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 via-secondary/10 to-transparent flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/10">
                      <stat.icon className="w-7 h-7 text-accent group-hover:text-accent transition-colors" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-success via-success to-success/80 text-white text-sm font-semibold shadow-xl shadow-success/20 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                #1 in Results
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Custom keyframes style */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes aurora {
          0%, 100% { transform: translateX(-20%) skewX(-5deg); opacity: 0.2; }
          50% { transform: translateX(20%) skewX(5deg); opacity: 0.4; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
