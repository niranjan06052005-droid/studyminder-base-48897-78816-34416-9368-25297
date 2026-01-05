import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Star, Users, Quote, Sparkles, GraduationCap, Trophy, ArrowRight, Target, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LearningJourneyCTA from "@/components/LearningJourneyCTA";

const SecondaryProgram = () => {
  const classes = [
    {
      title: "Standard 8: Foundation Builders",
      description: "Strengthening fundamentals for board exam preparation",
      standard: "8",
      icon: "🎯",
      highlight: "Pre-Board Prep"
    },
    {
      title: "Standard 9: Excellence Path",
      description: "Intensive coaching with focus on conceptual clarity",
      standard: "9",
      icon: "🚀",
      highlight: "Board Ready"
    },
    {
      title: "Standard 10: Success Summit",
      description: "Comprehensive board exam preparation with proven results",
      standard: "10",
      icon: "🏆",
      highlight: "Board Exam Year"
    }
  ];

  const teachers = [
    {
      name: "Dr. Ramesh Kulkarni",
      qualification: "Ph.D. Mathematics, 18 yrs exp.",
      subjects: "Mathematics",
      specialty: "Board Exam Expert",
      photo: "RK"
    },
    {
      name: "Mrs. Sunita Deshpande",
      qualification: "M.Sc. Physics, 15 yrs exp.",
      subjects: "Physics & Chemistry",
      specialty: "Olympiad Coach",
      photo: "SD"
    },
    {
      name: "Mr. Prakash Joshi",
      qualification: "M.Sc. Biology, 12 yrs exp.",
      subjects: "Biology",
      specialty: "NEET Foundation",
      photo: "PJ"
    },
    {
      name: "Mrs. Deepa Menon",
      qualification: "M.A. English, 10 yrs exp.",
      subjects: "English & Hindi",
      specialty: "Language Expert",
      photo: "DM"
    }
  ];

  const topAchievers = {
    "Standard 8": [
      { name: "Arnav Deshmukh", achievement: "State Level Science Talent Winner", rank: 1, score: "98.5%" },
      { name: "Priya Sharma", achievement: "Mathematics Olympiad Gold", rank: 2, score: "97.2%" },
      { name: "Siddharth Patil", achievement: "All Subjects Distinction", rank: 3, score: "96.8%" }
    ],
    "Standard 9": [
      { name: "Meera Kulkarni", achievement: "NTSE Stage 2 Qualifier", rank: 1, score: "99.1%" },
      { name: "Arjun Nair", achievement: "School Topper All Subjects", rank: 2, score: "98.3%" },
      { name: "Kavya Reddy", achievement: "District Level Science Quiz Winner", rank: 3, score: "97.5%" }
    ],
    "Standard 10": [
      { name: "Rohan Deshpande", achievement: "District Topper - 99.6%", rank: 1, score: "99.6%" },
      { name: "Ananya Sharma", achievement: "State Rank 23 - SSC Board", rank: 2, score: "99.2%" },
      { name: "Vivek Joshi", achievement: "Perfect 100 in Mathematics", rank: 3, score: "98.8%" }
    ]
  };

  const testimonials = [
    {
      quote: "My son scored 98% in SSC boards. The systematic preparation and mock tests made all the difference. Forever grateful to EduCoach!",
      parent: "Mr. Suresh Patil",
      child: "Standard 10 (Passed)"
    },
    {
      quote: "The teachers here don't just teach, they mentor. My daughter's confidence has grown tremendously along with her grades.",
      parent: "Mrs. Kavita Menon",
      child: "Standard 9"
    },
    {
      quote: "Excellent coaching for competitive exams alongside board preparation. My son qualified for NTSE thanks to EduCoach.",
      parent: "Mr. Rajendra Kulkarni",
      child: "Standard 10"
    }
  ];

  const faqs = [
    {
      question: "How is board exam preparation structured?",
      answer: "We follow a comprehensive 3-phase approach: Concept building (Apr-Sep), Application & Practice (Oct-Dec), and Intensive Revision with Mock Tests (Jan-Mar). Regular weekly tests and monthly assessments ensure continuous progress."
    },
    {
      question: "What competitive exams do you prepare students for?",
      answer: "We prepare students for NTSE, Olympiads (Math, Science, English), Scholarship exams, and provide foundation courses for JEE/NEET alongside board exam preparation."
    },
    {
      question: "What is the success rate in board exams?",
      answer: "Over the last 5 years, 95% of our students have scored above 80%, with 40% scoring above 90% in SSC board exams. We have produced multiple district and state rankers."
    },
    {
      question: "Are there special batches for struggling students?",
      answer: "Yes, we offer remedial classes and extra support sessions for students who need additional help. Our small batch sizes ensure no student is left behind."
    },
    {
      question: "What study materials are provided?",
      answer: "Students receive comprehensive study materials including chapter-wise notes, solved examples, practice problems, previous year papers, and mock test series. All materials are updated yearly."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 mt-16 overflow-hidden">
        {/* Animated Background - Softer amber/orange tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(35,65%,45%)] via-[hsl(30,60%,40%)] to-primary" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>📖</div>
          <div className="absolute top-1/3 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>🏆</div>
          <div className="absolute bottom-1/4 left-1/4 text-4xl opacity-20 animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }}>🎓</div>
          <div className="absolute bottom-1/3 right-1/4 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }}>⭐</div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8 animate-fade-in">
            <Target className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Board Exam Excellence</span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 text-white font-bold animate-fade-in">
            Secondary School Program
          </h1>
          <h2 className="text-3xl md:text-4xl mb-6 text-white/90 font-medium">(Std. 8-10)</h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Comprehensive board exam preparation with proven track record, 
            expert faculty, and personalized attention for guaranteed success.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-sm text-white/70">Above 80% Score</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-white/70">District Toppers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-white">18+</div>
              <div className="text-sm text-white/70">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Classes Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Board Preparation</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Explore Our Classes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths designed for board exam success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classes.map((classInfo, index) => (
              <Card
                key={index}
                className="group relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-accent/20 hover:border-accent overflow-hidden rounded-3xl animate-fade-in flex flex-col h-full"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Top Gradient */}
                <div className="h-2 bg-gradient-to-r from-accent to-primary" />
                
                {/* Highlight Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    {classInfo.highlight}
                  </span>
                </div>
                
                {/* Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <CardHeader className="pt-8 flex-grow">
                  <div className="text-5xl mb-4">{classInfo.icon}</div>
                  <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">
                    {classInfo.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 min-h-[48px]">
                    {classInfo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-8 mt-auto">
                  <Link to={`/programs/secondary/batch/${classInfo.standard}`}>
                    <Button className="w-full py-6 bg-gradient-to-r from-accent to-primary text-white hover:opacity-90 rounded-xl text-base font-semibold shadow-lg group-hover:scale-[1.02] transition-all">
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
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Expert Faculty</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Meet Our Educators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Highly qualified and experienced teachers with proven board exam results
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
                  <div className="mx-auto mb-4 w-28 h-28 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {teacher.photo}
                  </div>
                  <CardTitle className="text-xl text-primary">{teacher.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {teacher.qualification}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-3">
                    <Users className="h-4 w-4" />
                    <span>{teacher.subjects}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    <Award className="h-3 w-3" />
                    {teacher.specialty}
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
              <span className="text-sm font-medium text-accent">Board Exam Toppers</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Our Shining Stars</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Celebrating academic excellence and outstanding achievements
            </p>
          </div>

          <Tabs defaultValue="Standard 10" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-14 rounded-2xl bg-muted/50 p-1">
              <TabsTrigger value="Standard 8" className="rounded-xl text-base">Standard 8</TabsTrigger>
              <TabsTrigger value="Standard 9" className="rounded-xl text-base">Standard 9</TabsTrigger>
              <TabsTrigger value="Standard 10" className="rounded-xl text-base">Standard 10</TabsTrigger>
            </TabsList>

            {Object.entries(topAchievers).map(([standard, achievers]) => (
              <TabsContent key={standard} value={standard}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievers.map((achiever, idx) => (
                    <Card key={idx} className="relative overflow-hidden rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Rank Badge */}
                      <div className={`absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
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
                        <div className="inline-block mt-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-bold">
                          {achiever.score}
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
              <span className="text-sm font-medium text-success">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Parent Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from parents whose children achieved board exam success with us
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
                <div className="absolute top-6 right-6 text-6xl text-accent/10">"</div>
                
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
              <span className="text-sm font-medium text-primary">Board Exam Queries</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-primary font-bold">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our secondary school program
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg hover:text-accent py-6 hover:no-underline">
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

export default SecondaryProgram;