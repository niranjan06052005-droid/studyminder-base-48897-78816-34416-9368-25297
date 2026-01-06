import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-primary/95 backdrop-blur-md rounded-2xl shadow-lg border border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">EduCoach</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
              About
            </Link>
            <Link to="/activities" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
              Activities
            </Link>
            <Link to="/results" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium">
              Results
            </Link>
            <Link to="/login">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
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
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/activities"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Activities
              </Link>
              <Link
                to="/results"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Results
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
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
