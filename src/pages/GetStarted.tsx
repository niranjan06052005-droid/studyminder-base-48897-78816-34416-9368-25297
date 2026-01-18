import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Sparkles, ArrowRight, Phone, User, Users, BookOpen, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GetStarted = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    section: "",
    standard: "",
    contactNo: "",
    description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = [
    { value: "primary", label: "Primary (Std. 1-4)" },
    { value: "middle", label: "Middle (Std. 5-7)" },
    { value: "secondary", label: "Secondary (Std. 8-10)" }
  ];

  const standardsBySection: Record<string, { value: string; label: string }[]> = {
    primary: [
      { value: "1", label: "Standard 1" },
      { value: "2", label: "Standard 2" },
      { value: "3", label: "Standard 3" },
      { value: "4", label: "Standard 4" }
    ],
    middle: [
      { value: "5", label: "Standard 5" },
      { value: "6", label: "Standard 6" },
      { value: "7", label: "Standard 7" }
    ],
    secondary: [
      { value: "8", label: "Standard 8" },
      { value: "9", label: "Standard 9" },
      { value: "10", label: "Standard 10" }
    ]
  };

  const handleSectionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      section: value,
      standard: "" // Reset standard when section changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.parentName || !formData.childName || !formData.section || !formData.standard || !formData.contactNo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.contactNo)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Enquiry Submitted Successfully! 🎉",
        description: "Our team will contact you within 24 hours.",
      });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        parentName: "",
        childName: "",
        section: "",
        standard: "",
        contactNo: "",
        description: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden mt-16">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-accent/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
          <Sparkles className="absolute top-20 right-1/4 h-8 w-8 text-accent/60 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Begin Your Child's Success Story
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Fill out the form below and our admissions team will get in touch with you to discuss the best learning path for your child.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 -mt-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-primary/10 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent" />
                Admission Enquiry Form
              </CardTitle>
              <CardDescription>
                All fields marked with * are required
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Parent's Name */}
                <div className="space-y-2">
                  <Label htmlFor="parentName" className="flex items-center gap-2 text-base">
                    <Users className="h-4 w-4 text-primary" />
                    Parent's Name *
                  </Label>
                  <Input
                    id="parentName"
                    placeholder="Enter parent's full name"
                    value={formData.parentName}
                    onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                    className="h-12"
                  />
                </div>

                {/* Child's Name */}
                <div className="space-y-2">
                  <Label htmlFor="childName" className="flex items-center gap-2 text-base">
                    <User className="h-4 w-4 text-primary" />
                    Child's Name *
                  </Label>
                  <Input
                    id="childName"
                    placeholder="Enter child's full name"
                    value={formData.childName}
                    onChange={(e) => setFormData(prev => ({ ...prev, childName: e.target.value }))}
                    className="h-12"
                  />
                </div>

                {/* Section and Standard Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Choose Section */}
                  <div className="space-y-2">
                    <Label htmlFor="section" className="flex items-center gap-2 text-base">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Choose Section *
                    </Label>
                    <Select value={formData.section} onValueChange={handleSectionChange}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {sections.map((section) => (
                          <SelectItem key={section.value} value={section.value}>
                            {section.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Choose Standard */}
                  <div className="space-y-2">
                    <Label htmlFor="standard" className="flex items-center gap-2 text-base">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Choose Standard *
                    </Label>
                    <Select 
                      value={formData.standard} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, standard: value }))}
                      disabled={!formData.section}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={formData.section ? "Select standard" : "Select section first"} />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {formData.section && standardsBySection[formData.section]?.map((std) => (
                          <SelectItem key={std.value} value={std.value}>
                            {std.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="contactNo" className="flex items-center gap-2 text-base">
                    <Phone className="h-4 w-4 text-primary" />
                    Contact Number *
                  </Label>
                  <Input
                    id="contactNo"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.contactNo}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNo: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    className="h-12"
                    maxLength={10}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2 text-base">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Additional Information (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Any specific requirements, questions, or information you'd like to share..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-muted-foreground">
            <p className="mb-2">Need immediate assistance?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="flex items-center gap-2">
                📞 +91 98765 43210
              </span>
              <span className="hidden sm:block">|</span>
              <span className="flex items-center gap-2">
                📧 admissions@educoach.com
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
