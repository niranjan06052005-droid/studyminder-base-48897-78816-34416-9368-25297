import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, BookOpen, Target, GraduationCap, Calendar, MapPin, Phone, Mail } from "lucide-react";

const About = () => {
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
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop" 
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

      {/* Contact Info */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Visit Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground">
                123 Education Street<br />
                Knowledge City, State 400001
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground">
                +91 98765 43210<br />
                +91 12345 67890
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">
                info@educoach.com<br />
                admissions@educoach.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
