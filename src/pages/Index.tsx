import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Award, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Star, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LearningJourneyCTA from "@/components/LearningJourneyCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

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
