import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Star, Users, Quote, Sparkles, GraduationCap, Trophy, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LearningJourneyCTA from "@/components/LearningJourneyCTA";

const MiddleProgram = () => {
  const classes = [
    {
      title: "Standard 5: Bridge Builders",
      description: "Transitioning from primary to advanced learning with critical thinking",
      standard: "5",
      icon: "🌟"
    },
    {
      title: "Standard 6: Knowledge Explorers",
      description: "Expanding horizons with in-depth subject exploration",
      standard: "6",
      icon: "🚀"
    },
    {
      title: "Standard 7: Future Ready",
      description: "Building strong academic foundations for secondary education",
      standard: "7",
      icon: "🎯"
    }
  ];

  const teachers = [
    {
      name: "Dr. Anil Sharma",
      qualification: "Ph.D., M.Ed.",
      subjects: "Mathematics",
      experience: "15 years",
      photo: "AS"
    },
    {
      name: "Mrs. Meera Iyer",
      qualification: "M.Sc., B.Ed.",
      subjects: "Science",
      experience: "12 years",
      photo: "MI"
    },
    {
      name: "Mr. Suresh Patil",
      qualification: "M.A., B.Ed.",
      subjects: "English & Hindi",
      experience: "10 years",
      photo: "SP"
    },
    {
      name: "Mrs. Priya Deshmukh",
      qualification: "M.A., B.Ed.",
      subjects: "Social Studies",
      experience: "8 years",
      photo: "PD"
    }
  ];

  const topAchievers = {
    "Standard 5": [
      { name: "Aditya Kulkarni", achievement: "State Level Science Olympiad Winner", rank: 1 },
      { name: "Sneha Rao", achievement: "Perfect Score in Mathematics", rank: 2 },
      { name: "Rahul Menon", achievement: "English Essay Competition Winner", rank: 3 }
    ],
    "Standard 6": [
      { name: "Prachi Joshi", achievement: "National Math Olympiad Qualifier", rank: 1 },
      { name: "Vikrant Singh", achievement: "All India Science Quiz Champion", rank: 2 },
      { name: "Ananya Sharma", achievement: "Best All-Rounder Award", rank: 3 }
    ],
    "Standard 7": [
      { name: "Rohan Deshpande", achievement: "District Topper in Board Prep", rank: 1 },
      { name: "Ishita Patel", achievement: "100% in All Subjects", rank: 2 },
      { name: "Karan Malhotra", achievement: "Science Fair Grand Prize", rank: 3 }
    ]
  };

  const testimonials = [
    {
      quote: "The transition from primary to middle school was seamless. My child has developed remarkable analytical skills and loves attending classes!",
      parent: "Mrs. Archana Kulkarni",
      child: "Standard 6"
    },
    {
      quote: "Excellent focus on conceptual learning. The teachers go beyond textbooks to ensure students truly understand the subjects.",
      parent: "Mr. Sandeep Verma",
      child: "Standard 7"
    },
    {
      quote: "The personal attention and regular feedback have helped my daughter improve tremendously in mathematics.",
      parent: "Mrs. Rekha Nair",
      child: "Standard 5"
    }
  ];

  const faqs = [
    {
      question: "What curriculum is followed for middle school?",
      answer: "We follow the Maharashtra State Board curriculum with additional enrichment activities aligned with NCERT guidelines for comprehensive learning."
    },
    {
      question: "How are students prepared for competitive exams?",
      answer: "We offer special coaching for Olympiads, NTSE preparation, and various competitive exams alongside regular classes."
    },
    {
      question: "What is the student-teacher ratio?",
      answer: "We maintain a 20:1 student-teacher ratio to ensure personalized attention and effective learning."
    },
    {
      question: "Are there regular parent-teacher meetings?",
      answer: "Yes, we conduct monthly PTMs and provide regular progress reports through our digital platform."
    },
    {
      question: "What extracurricular activities are available?",
      answer: "We offer sports, music, art, robotics, coding, debate, and various clubs to develop well-rounded personalities."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 mt-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-accent" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>📚</div>
          <div className="absolute top-1/3 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>🎓</div>
          <div className="absolute bottom-1/4 left-1/4 text-4xl opacity-20 animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }}>✨</div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8 animate-fade-in">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Growth Phase Education</span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 text-white font-bold animate-fade-in">
            Middle School Program
          </h1>
          <h2 className="text-3xl md:text-4xl mb-6 text-white/90 font-medium">(Std. 5-7)</h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Bridging foundations to excellence with comprehensive learning, 
            competitive exam preparation, and holistic development.
          </p>
        </div>
      </section>

      {/* Explore Classes Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <BookOpen className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Choose Your Class</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Explore Our Classes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the right batch for your child's learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classes.map((classInfo, index) => (
              <Card
                key={index}
                className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-secondary/20 hover:border-secondary overflow-hidden rounded-3xl animate-fade-in flex flex-col h-full"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Top Gradient */}
                <div className="h-2 bg-gradient-to-r from-secondary to-accent" />
                
                {/* Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="pt-8 flex-1">
                  <div className="text-5xl mb-4">{classInfo.icon}</div>
                  <CardTitle className="text-2xl text-primary group-hover:text-secondary transition-colors min-h-[64px]">
                    {classInfo.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 min-h-[48px]">
                    {classInfo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-8 mt-auto">
                  <Link to={`/programs/middle/batch/${classInfo.standard}`}>
                    <Button className="w-full py-6 bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 rounded-xl text-base font-semibold shadow-lg group-hover:scale-[1.02] transition-all">
                      View Batch Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Educators */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Expert Faculty</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Meet Our Educators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced and passionate teachers dedicated to your child's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, index) => (
              <Card
                key={index}
                className="group text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardHeader className="pt-8">
                  <div className="mx-auto mb-4 w-28 h-28 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {teacher.photo}
                  </div>
                  <CardTitle className="text-xl text-primary">{teacher.name}</CardTitle>
                  <CardDescription className="text-sm font-medium text-secondary">
                    {teacher.qualification}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <Users className="h-4 w-4" />
                    <span>{teacher.subjects}</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    {teacher.experience}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Shining Stars */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Top Performers</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Our Shining Stars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating excellence and achievements across all standards
            </p>
          </div>

          <Tabs defaultValue="Standard 5" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14 rounded-2xl bg-muted/50 p-1">
              <TabsTrigger value="Standard 5" className="rounded-xl text-base">Standard 5</TabsTrigger>
              <TabsTrigger value="Standard 6" className="rounded-xl text-base">Standard 6</TabsTrigger>
              <TabsTrigger value="Standard 7" className="rounded-xl text-base">Standard 7</TabsTrigger>
            </TabsList>

            {Object.entries(topAchievers).map(([standard, achievers]) => (
              <TabsContent key={standard} value={standard}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievers.map((achiever, idx) => (
                    <Card key={idx} className="relative overflow-hidden rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Rank Badge */}
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                        idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                        idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        'bg-gradient-to-br from-amber-600 to-amber-700'
                      }`}>
                        #{achiever.rank}
                      </div>
                      
                      <CardHeader className="pt-8">
                        <div className="flex items-center gap-3">
                          <Star className="h-6 w-6 text-accent fill-accent" />
                          <CardTitle className="text-xl text-primary">{achiever.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{achiever.achievement}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-muted/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
              <Quote className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Parent Voices</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Parent Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What parents say about our middle school program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-6xl text-secondary/10">"</div>
                
                <CardHeader className="pt-8">
                  <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center text-2xl font-bold text-success">
                    {testimonial.parent.split(' ')[1][0]}
                  </div>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className="text-muted-foreground italic mb-6 relative z-10">"{testimonial.quote}"</p>
                  <p className="font-semibold text-primary text-lg">{testimonial.parent}</p>
                  <p className="text-sm text-muted-foreground">Parent of {testimonial.child} Student</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Got Questions?</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our middle school program
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg hover:text-secondary py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <LearningJourneyCTA />

      <Footer />
    </div>
  );
};

export default MiddleProgram;