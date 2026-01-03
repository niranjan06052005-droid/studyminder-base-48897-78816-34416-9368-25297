import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Award, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Star, Zap, Target, GraduationCap, Medal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroAnimation3D from "@/components/HeroAnimation3D";
import LearningJourneyCTA from "@/components/LearningJourneyCTA";
import heroBackgroundImage from "@/assets/hero-background.png";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-secondary/30 to-accent/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/10 to-success/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Sparkles className="absolute top-32 left-[15%] w-8 h-8 text-accent animate-bounce" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-48 right-[20%] w-6 h-6 text-accent/80 animate-bounce" style={{ animationDelay: '1s' }} />
          <GraduationCap className="absolute bottom-40 left-[25%] w-10 h-10 text-secondary/60 animate-bounce" style={{ animationDelay: '1.5s' }} />
          <Medal className="absolute bottom-32 right-[30%] w-8 h-8 text-accent/70 animate-bounce" style={{ animationDelay: '0.8s' }} />
          <Zap className="absolute top-60 left-[8%] w-6 h-6 text-secondary/70 animate-bounce" style={{ animationDelay: '1.2s' }} />
          <Target className="absolute top-72 right-[12%] w-7 h-7 text-success/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
        
        {/* 3D Animation Overlay */}
        <HeroAnimation3D />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="text-white max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Trusted by 10,000+ Students</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-2xl">
              <span className="inline-block animate-[scale-in_0.5s_ease-out] bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">Unlock</span>{" "}
              <span className="inline-block animate-[scale-in_0.5s_ease-out_0.1s] bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Your</span>{" "}
              <span className="inline-block animate-[scale-in_0.5s_ease-out_0.2s] bg-gradient-to-r from-white via-white to-white/80 bg-clip-text">Potential</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 drop-shadow-lg animate-[fade-in_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards] font-medium">
              Quality Coaching from Std. 1st to 10th
            </p>
            <p className="text-lg md:text-xl text-white/80 drop-shadow-lg animate-[fade-in_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards] max-w-2xl mx-auto">
              Expert teachers, personalized attention, and a proven track record of success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-in_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards] pt-4">
              <Link to="/login">
                <Button size="lg" className="group relative px-8 py-6 text-lg bg-gradient-to-r from-accent to-accent/80 text-primary-foreground hover:from-accent/90 hover:to-accent/70 shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-105 rounded-xl border-0">
                  <span className="relative z-10 flex items-center font-semibold">
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent/80 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-md transition-all duration-300 hover:scale-105 rounded-xl">
                  Explore Courses
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 animate-[fade-in_0.6s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
              {[
                { value: "500+", label: "Students" },
                { value: "95%", label: "Success Rate" },
                { value: "10+", label: "Expert Teachers" },
                { value: "15+", label: "Years Experience" }
              ].map((stat, index) => (
                <div key={index} className="text-center px-4">
                  <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Why Parents Trust Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-primary font-bold">
              Why Choose <span className="text-secondary">EduCoach?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive education with a personal touch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Faculty",
                description: "Highly qualified teachers with years of experience",
                gradient: "from-primary to-primary/70",
                bgGlow: "bg-primary/20"
              },
              {
                icon: BookOpen,
                title: "Comprehensive Material",
                description: "Well-structured notes, test papers, and resources",
                gradient: "from-secondary to-secondary/70",
                bgGlow: "bg-secondary/20"
              },
              {
                icon: Award,
                title: "Regular Assessments",
                description: "Continuous evaluation and personalized feedback",
                gradient: "from-accent to-accent/70",
                bgGlow: "bg-accent/20"
              },
              {
                icon: TrendingUp,
                title: "Digital Platform",
                description: "Access resources anytime, anywhere online",
                gradient: "from-success to-success/70",
                bgGlow: "bg-success/20"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 overflow-hidden animate-fade-in rounded-3xl"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                
                {/* Decorative Corner */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full group-hover:scale-150 transition-transform duration-500" />
                
                <CardHeader className="relative z-10 pt-8">
                  <div className={`mx-auto mb-6 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-xl text-primary group-hover:text-secondary transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pb-8">
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-success/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Academic Programs</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-primary font-bold">
              Our <span className="text-accent">Programs</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Tailored curriculum for every grade level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Primary (Std. 1-4)",
                subjects: ["English", "Mathematics", "Science", "Hindi"],
                color: "from-success to-success/70",
                borderColor: "border-success/30 hover:border-success",
                bgColor: "bg-success/5",
                iconBg: "bg-success",
                link: "/programs/primary",
                badge: "Foundation"
              },
              {
                title: "Middle (Std. 5-8)",
                subjects: ["English", "Maths", "Science", "Social Studies"],
                color: "from-secondary to-secondary/70",
                borderColor: "border-secondary/30 hover:border-secondary",
                bgColor: "bg-secondary/5",
                iconBg: "bg-secondary",
                link: "/courses",
                badge: "Growth"
              },
              {
                title: "Secondary (Std. 9-10)",
                subjects: ["English", "Maths", "Science", "Social Studies"],
                color: "from-accent to-accent/70",
                borderColor: "border-accent/30 hover:border-accent",
                bgColor: "bg-accent/5",
                iconBg: "bg-accent",
                link: "/courses",
                badge: "Excellence"
              }
            ].map((program, index) => (
              <Card
                key={index}
                className={`group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${program.bgColor} ${program.borderColor} border-2 overflow-hidden rounded-3xl animate-fade-in`}
                style={{ animationDelay: `${0.15 * index}s` }}
              >
                {/* Top Gradient Bar */}
                <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="relative z-10 pt-8">
                  {/* Badge */}
                  <div className={`inline-flex self-start items-center gap-1 px-3 py-1 rounded-full ${program.iconBg}/10 mb-4`}>
                    <Sparkles className={`w-3 h-3 text-${program.iconBg}`} />
                    <span className="text-xs font-semibold">{program.badge}</span>
                  </div>
                  <CardTitle className="text-2xl text-primary group-hover:text-secondary transition-colors duration-300">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pb-8">
                  <ul className="space-y-3 mb-8">
                    {program.subjects.map((subject, idx) => (
                      <li key={idx} className="flex items-center gap-3 group/item">
                        <div className={`w-6 h-6 rounded-full ${program.iconBg}/20 flex items-center justify-center group-hover/item:scale-110 transition-transform`}>
                          <CheckCircle2 className={`h-4 w-4 text-${program.iconBg}`} />
                        </div>
                        <span className="text-foreground font-medium">{subject}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={program.link}>
                    <Button className={`w-full py-6 bg-gradient-to-r ${program.color} text-white hover:opacity-90 transition-all duration-300 group-hover:scale-[1.02] rounded-xl text-base font-semibold shadow-lg`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <LearningJourneyCTA />

      <Footer />
    </div>
  );
};

export default Index;
