import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, GraduationCap, Star, Rocket } from "lucide-react";

const LearningJourneyCTA = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-accent/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-secondary/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Sparkle icons */}
        <Sparkles className="absolute top-16 left-1/4 h-6 w-6 text-accent/60 animate-pulse" />
        <Star className="absolute top-24 right-1/3 h-5 w-5 text-white/40 animate-bounce" style={{ animationDuration: '2s' }} />
        <Sparkles className="absolute bottom-24 right-1/4 h-8 w-8 text-accent/40 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Decorative Top Element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-white/30" />
          <GraduationCap className="h-8 w-8 text-accent animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="h-px w-12 bg-white/30" />
        </div>

        {/* Main Heading with Sparkle */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3 flex-wrap">
          <Sparkles className="h-8 w-8 text-accent hidden sm:block" />
          Ready to Start Your Learning Journey?
          <Rocket className="h-8 w-8 text-accent hidden sm:block" />
        </h2>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-2xl mx-auto">
          Join hundreds of successful students who have achieved their academic goals with us
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">500+</div>
            <div className="text-sm text-white/70">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">98%</div>
            <div className="text-sm text-white/70">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">15+</div>
            <div className="text-sm text-white/70">Expert Teachers</div>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/get-started">
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow px-8 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        {/* Contact Info */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 text-sm">
          <span className="flex items-center gap-2">
            📞 +91 98765 43210
          </span>
          <span className="hidden sm:block">|</span>
          <span className="flex items-center gap-2">
            📧 admissions@educoach.com
          </span>
        </div>
      </div>
    </section>
  );
};

export default LearningJourneyCTA;
