import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Award, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroAnimation3D from "@/components/HeroAnimation3D";
import heroBackgroundImage from "@/assets/hero-background.png";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        />
        
        {/* 3D Animation Overlay */}
        <HeroAnimation3D />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="text-white max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl animate-fade-in">
              <span className="inline-block animate-[scale-in_0.5s_ease-out]">Unlock</span>{" "}
              <span className="inline-block animate-[scale-in_0.5s_ease-out_0.1s]">Your</span>{" "}
              <span className="inline-block animate-[scale-in_0.5s_ease-out_0.2s]">Potential</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg animate-[fade-in_0.6s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
              Quality Coaching from Std. 1st to 10th
            </p>
            <p className="text-lg text-white/90 drop-shadow-lg animate-[fade-in_0.6s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
              Expert teachers, personalized attention, and a proven track record of success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-in_0.6s_ease-out_0.7s] opacity-0 [animation-fill-mode:forwards]">
              <Link to="/login">
                <Button size="lg" className="bg-[#fbbf24] text-white hover:bg-[#f59e0b] shadow-glow hover-scale">
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/50 hover:bg-white/20 backdrop-blur-sm hover-scale">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl mb-4 text-primary">Why Choose EduCoach?</h2>
            <p className="text-lg text-muted-foreground">
              We provide comprehensive education with a personal touch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Expert Faculty",
                description: "Highly qualified teachers with years of experience"
              },
              {
                icon: BookOpen,
                title: "Comprehensive Material",
                description: "Well-structured notes, test papers, and resources"
              },
              {
                icon: Award,
                title: "Regular Assessments",
                description: "Continuous evaluation and personalized feedback"
              },
              {
                icon: TrendingUp,
                title: "Digital Platform",
                description: "Access resources anytime, anywhere online"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 gradient-card border-primary/10"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Our Programs</h2>
            <p className="text-lg text-muted-foreground">
              Tailored curriculum for every grade level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Primary (Std. 1-4)",
                subjects: ["English", "Mathematics", "Science", "Hindi"],
                color: "bg-success/10 border-success/30",
                link: "/programs/primary"
              },
              {
                title: "Middle (Std. 5-8)",
                subjects: ["English", "Maths", "Science", "Social Studies"],
                color: "bg-secondary/10 border-secondary/30",
                link: "/courses"
              },
              {
                title: "Secondary (Std. 9-10)",
                subjects: ["English", "Maths", "Science", "Social Studies"],
                color: "bg-accent/10 border-accent/30",
                link: "/courses"
              }
            ].map((program, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-300 ${program.color}`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.subjects.map((subject, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={program.link}>
                    <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join hundreds of successful students who have achieved their academic goals with us
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
