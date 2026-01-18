import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Users, Award, BookOpen, Target, GraduationCap, Calendar, MapPin, Phone, Mail, Camera, User, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import educoach2011 from "@/assets/educoach-2011.jpg";

const About = () => {
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      standard: ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.parentName || !formData.childName || !formData.section || !formData.standard || !formData.contactNo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

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

    setTimeout(() => {
      toast({
        title: "Enquiry Submitted Successfully! 🎉",
        description: "Our team will contact you within 24 hours.",
      });
      setIsSubmitting(false);
      
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

  const milestones = [
    { year: "2011", title: "Foundation", description: "EduCoach was established with a vision to provide quality education" },
    { year: "2014", title: "First Batch Success", description: "100% of our first batch cleared competitive exams" },
    { year: "2017", title: "Expansion", description: "Opened new branches and introduced digital learning" },
    { year: "2020", title: "Online Platform", description: "Launched comprehensive online learning platform" },
    { year: "2024", title: "1000+ Students", description: "Crossed milestone of educating 1000+ students" },
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & Director",
      subject: "Mathematics",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Prof. Anita Sharma",
      role: "Academic Head",
      subject: "Physics",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Mr. Vikram Singh",
      role: "Senior Faculty",
      subject: "Chemistry",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Ms. Priya Patel",
      role: "Senior Faculty",
      subject: "Biology",
      experience: "8+ years",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Mr. Arjun Reddy",
      role: "Faculty",
      subject: "English",
      experience: "7+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Ms. Kavitha Nair",
      role: "Faculty",
      subject: "Social Science",
      experience: "6+ years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
  ];

  const achievements = [
    { number: "1000+", label: "Students Educated" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Top Rankers" },
    { number: "13+", label: "Years Experience" },
  ];

  const galleryImages = [
    { 
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
      title: "Classroom Learning",
      category: "Classes"
    },
    { 
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
      title: "Annual Day Celebration",
      category: "Events"
    },
    { 
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
      title: "Science Exhibition",
      category: "Activities"
    },
    { 
      src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop",
      title: "Library",
      category: "Facilities"
    },
    { 
      src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop",
      title: "Sports Day",
      category: "Events"
    },
    { 
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
      title: "Study Materials",
      category: "Resources"
    },
    { 
      src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&h=400&fit=crop",
      title: "Interactive Sessions",
      category: "Classes"
    },
    { 
      src: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?w=600&h=400&fit=crop",
      title: "Prize Distribution",
      category: "Events"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">Est. 2011</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About EduCoach
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering students with quality education and guidance for over a decade. 
            Our journey of transforming lives through education continues.
          </p>
        </div>
      </section>

      {/* Our Story / History Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                EduCoach was founded in <span className="font-semibold text-primary">2011</span> with a simple yet powerful vision: 
                to provide quality education that transforms lives. What started as a small coaching center 
                with just 15 students has now grown into one of the most trusted educational institutions.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founder, Dr. Rajesh Kumar, believed that every student deserves access to excellent 
                education regardless of their background. This belief has been the cornerstone of our 
                teaching philosophy for over 13 years.
              </p>
              <p className="text-muted-foreground">
                Today, we take pride in our legacy of producing top performers and helping thousands 
                of students achieve their academic dreams.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={educoach2011} 
                  alt="EduCoach classroom in 2011"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
                <p className="font-bold text-lg">Since 2011</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year} 
                  className={`flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card className="inline-block">
                      <CardContent className="p-6">
                        <Badge className="mb-2">{milestone.year}</Badge>
                        <h3 className="font-bold text-lg text-foreground">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold mb-2">{achievement.number}</p>
                <p className="text-primary-foreground/80">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground">
                  To provide accessible, high-quality education that empowers every student 
                  to achieve their full potential. We strive to create an environment where 
                  learning is engaging, concepts are clear, and success is within reach for all.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-8 w-8 text-secondary" />
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground">
                  To be the leading educational institution that shapes future leaders and 
                  innovators. We envision a world where quality education breaks barriers 
                  and creates opportunities for students from all walks of life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Expert Faculty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced educators is dedicated to nurturing young minds 
              and helping students achieve academic excellence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-xl text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Badge variant="secondary">{member.subject}</Badge>
                    <Badge variant="outline">{member.experience}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose EduCoach?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Expert Faculty</h3>
              <p className="text-muted-foreground text-sm">
                Highly qualified teachers with years of experience
              </p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Comprehensive Curriculum</h3>
              <p className="text-muted-foreground text-sm">
                Well-structured study materials and resources
              </p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Proven Results</h3>
              <p className="text-muted-foreground text-sm">
                Consistent track record of top performers
              </p>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Regular Assessments</h3>
              <p className="text-muted-foreground text-sm">
                Continuous evaluation and feedback
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Life at EduCoach - Photo Gallery */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/20 via-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Camera className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Campus Life</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Life at EduCoach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses of our vibrant learning environment, events, and activities
            </p>
          </div>
          
          {/* Modern Masonry-style Gallery */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            {/* Large featured image */}
            <div 
              onClick={() => setSelectedImage(galleryImages[0].src)}
              className="col-span-12 md:col-span-8 row-span-2 relative overflow-hidden rounded-3xl cursor-pointer group shadow-xl"
            >
              <img 
                src={galleryImages[0].src}
                alt={galleryImages[0].title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-3 bg-white/20 backdrop-blur-sm text-white border-0">{galleryImages[0].category}</Badge>
                <h3 className="text-2xl font-bold text-white">{galleryImages[0].title}</h3>
              </div>
            </div>

            {/* Two stacked images on right */}
            {galleryImages.slice(1, 3).map((image, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(image.src)}
                className="col-span-6 md:col-span-4 row-span-1 relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg"
              >
                <img 
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-1 bg-primary/90 text-xs">{image.category}</Badge>
                  <p className="text-white font-medium text-sm">{image.title}</p>
                </div>
              </div>
            ))}

            {/* Four images in a row */}
            {galleryImages.slice(3, 7).map((image, index) => (
              <div 
                key={index + 3}
                onClick={() => setSelectedImage(image.src)}
                className="col-span-6 md:col-span-3 row-span-1 relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-1 bg-primary/90 text-xs">{image.category}</Badge>
                  <p className="text-white font-medium text-sm">{image.title}</p>
                </div>
              </div>
            ))}

            {/* Last image spanning full width on mobile, partial on desktop */}
            {galleryImages[7] && (
              <div 
                onClick={() => setSelectedImage(galleryImages[7].src)}
                className="col-span-12 md:col-span-6 row-span-1 relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={galleryImages[7].src}
                  alt={galleryImages[7].title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-1 bg-primary/90 text-xs">{galleryImages[7].category}</Badge>
                  <p className="text-white font-medium text-sm">{galleryImages[7].title}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage.replace('w=600&h=400', 'w=1200&h=800')}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
          />
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Visit Us & Enquiry Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-muted/30 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us or submit an enquiry. We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Address Card */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MapPin className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2">Our Location</h3>
                      <p className="text-muted-foreground">
                        123 Education Street<br />
                        Knowledge City, State 400001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Phone className="h-10 w-10 text-secondary-foreground" />
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2">Call Us</h3>
                      <p className="text-muted-foreground">
                        +91 98765 43210<br />
                        +91 12345 67890
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Mail className="h-10 w-10 text-accent-foreground" />
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2">Email Us</h3>
                      <p className="text-muted-foreground">
                        info@educoach.com<br />
                        admissions@educoach.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timing Card */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 bg-gradient-to-br from-primary/70 to-secondary/70 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Calendar className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 p-6">
                      <h3 className="font-bold text-lg text-foreground mb-2">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Mon - Sat: 8:00 AM - 8:00 PM<br />
                        Sunday: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enquiry Form */}
            <Card className="shadow-2xl border-primary/10 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Admission Enquiry
                </CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName" className="flex items-center gap-2 text-sm">
                        <Users className="h-3 w-3 text-primary" />
                        Parent's Name *
                      </Label>
                      <Input
                        id="parentName"
                        placeholder="Parent's full name"
                        value={formData.parentName}
                        onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="childName" className="flex items-center gap-2 text-sm">
                        <User className="h-3 w-3 text-primary" />
                        Child's Name *
                      </Label>
                      <Input
                        id="childName"
                        placeholder="Child's full name"
                        value={formData.childName}
                        onChange={(e) => setFormData(prev => ({ ...prev, childName: e.target.value }))}
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="section" className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-3 w-3 text-primary" />
                        Section *
                      </Label>
                      <Select value={formData.section} onValueChange={handleSectionChange}>
                        <SelectTrigger className="h-10">
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
                    <div className="space-y-2">
                      <Label htmlFor="standard" className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-3 w-3 text-primary" />
                        Standard *
                      </Label>
                      <Select 
                        value={formData.standard} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, standard: value }))}
                        disabled={!formData.section}
                      >
                        <SelectTrigger className="h-10">
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

                  <div className="space-y-2">
                    <Label htmlFor="contactNo" className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-primary" />
                      Contact Number *
                    </Label>
                    <Input
                      id="contactNo"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.contactNo}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactNo: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      className="h-10"
                      maxLength={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-3 w-3 text-primary" />
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Any questions or requirements..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-12 font-semibold bg-primary hover:bg-primary/90 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
