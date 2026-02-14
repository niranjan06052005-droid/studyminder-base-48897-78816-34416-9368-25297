import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Determine navbar style based on current route
  const getNavbarStyle = () => {
    const path = location.pathname;
    
    // Secondary program pages - use deep teal/green theme
    if (path.includes('/programs/secondary') || path === '/secondary-program') {
      return {
        bg: "bg-[hsl(180,45%,25%)]/80",
        text: "text-white",
        textMuted: "text-white/90",
        buttonBg: "bg-white text-[hsl(180,45%,25%)]",
        buttonHover: "hover:bg-white/90"
      };
    }
    
    // Middle program pages - match hero gradient (secondary teal to accent amber)
    if (path.includes('/programs/middle') || path === '/middle-program') {
      return {
        bg: "bg-gradient-to-r from-[hsl(184,65%,35%)] via-[hsl(160,50%,38%)] to-[hsl(38,80%,50%)]/85",
        text: "text-white",
        textMuted: "text-white/90",
        buttonBg: "bg-white text-[hsl(184,65%,35%)]",
        buttonHover: "hover:bg-white/90"
      };
    }
    
    // Primary program pages - match hero gradient (primary navy to secondary teal)
    if (path.includes('/programs/primary') || path === '/primary-program') {
      return {
        bg: "bg-gradient-to-r from-[hsl(210,70%,30%)] via-[hsl(200,60%,32%)] to-[hsl(184,65%,35%)]/85",
        text: "text-white",
        textMuted: "text-white/90",
        buttonBg: "bg-white text-[hsl(210,70%,30%)]",
        buttonHover: "hover:bg-white/90"
      };
    }
    
    // About page - deep blue/teal theme
    if (path === '/about') {
      return {
        bg: "bg-[hsl(210,55%,35%)]/80",
        text: "text-white",
        textMuted: "text-white/90",
        buttonBg: "bg-white text-[hsl(210,60%,20%)]",
        buttonHover: "hover:bg-white/90"
      };
    }

    // Activities page - purple/pink gradient theme
    if (path === '/activities') {
      return {
        bg: "bg-gradient-to-r from-[hsl(270,45%,50%)] via-[hsl(280,40%,55%)] to-[hsl(320,45%,55%)]/85",
        text: "text-white",
        textMuted: "text-white/90",
        buttonBg: "bg-white text-[hsl(270,50%,35%)]",
        buttonHover: "hover:bg-white/90"
      };
    }

    // Results page - golden amber theme
    if (path === '/results') {
      return {
        bg: "bg-gradient-to-r from-[hsl(40,80%,55%)] via-[hsl(35,75%,58%)] to-[hsl(25,80%,55%)]/85",
        text: "text-white",
        textMuted: "text-white/90",
        buttonBg: "bg-white text-[hsl(35,80%,40%)]",
        buttonHover: "hover:bg-white/90"
      };
    }
    
    // Default - primary blue
    return {
      bg: "bg-primary/80",
      text: "text-primary-foreground",
      textMuted: "text-primary-foreground/90",
      buttonBg: "bg-primary-foreground text-primary",
      buttonHover: "hover:bg-primary-foreground/90"
    };
  };

  const style = getNavbarStyle();

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 ${style.bg} backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className={`flex items-center gap-2 ${style.text} hover:opacity-80 transition-opacity`}>
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">EduCoach</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}>
              Home
            </Link>
            <Link to="/about" className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}>
              About
            </Link>
            <Link to="/activities" className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}>
              Activities
            </Link>
            <Link to="/results" className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}>
              Results
            </Link>
            <Link to="/login">
              <Button className={`${style.buttonBg} ${style.buttonHover} shadow-lg`}>
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${style.text}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/activities"
                className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}
                onClick={() => setIsOpen(false)}
              >
                Activities
              </Link>
              <Link
                to="/results"
                className={`${style.textMuted} hover:${style.text} transition-colors font-medium`}
                onClick={() => setIsOpen(false)}
              >
                Results
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className={`w-full ${style.buttonBg} ${style.buttonHover} shadow-lg`}>
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
