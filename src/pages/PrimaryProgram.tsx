import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Download, Mail, Phone, Star, Play, Award, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrimaryProgram = () => {
  const classes = [
    {
      title: "Standard 1: The First Step",
      description: "Building strong foundations in reading, writing, and basic mathematics",
      standard: "1"
    },
    {
      title: "Standard 2: Growing Minds",
      description: "Developing critical thinking and problem-solving skills",
      standard: "2"
    },
    {
      title: "Standard 3: Creative Learners",
      description: "Encouraging creativity and independent learning",
      standard: "3"
    },
    {
      title: "Standard 4: Young Achievers",
      description: "Preparing for middle school with advanced concepts",
      standard: "4"
    }
  ];

  const teachers = [
    {
      name: "Mrs. Priya Sharma",
      qualification: "M.A., B.Ed.",
      subjects: "English & Hindi",
      photo: "PS"
    },
    {
      name: "Mr. Rajesh Kumar",
      qualification: "M.Sc., B.Ed.",
      subjects: "Mathematics & Science",
      photo: "RK"
    },
    {
      name: "Ms. Anjali Desai",
      qualification: "M.A., B.Ed.",
      subjects: "Social Studies",
      photo: "AD"
    },
    {
      name: "Mrs. Kavita Patel",
      qualification: "B.A., B.Ed.",
      subjects: "Art & Craft",
      photo: "KP"
    }
  ];

  const topAchievers = {
    "Standard 1": [
      { name: "Aarav Mehta", achievement: "100% in Mathematics" },
      { name: "Diya Kapoor", achievement: "Outstanding in All Subjects" },
      { name: "Arjun Singh", achievement: "Best Reader Award" }
    ],
    "Standard 2": [
      { name: "Ishaan Verma", achievement: "Perfect Score in Science" },
      { name: "Ananya Reddy", achievement: "Excellence in English" },
      { name: "Rohan Joshi", achievement: "Top in Mathematics" }
    ],
    "Standard 3": [
      { name: "Saanvi Gupta", achievement: "All-Rounder of the Year" },
      { name: "Vivaan Sharma", achievement: "Mathematics Champion" },
      { name: "Aanya Nair", achievement: "Creative Writing Star" }
    ],
    "Standard 4": [
      { name: "Kabir Malhotra", achievement: "Science Excellence Award" },
      { name: "Myra Patel", achievement: "100% in All Subjects" },
      { name: "Advait Kumar", achievement: "Outstanding Performance" }
    ]
  };

  const activities = [
    { title: "Annual Sports Day", description: "Building teamwork and physical fitness" },
    { title: "Science Fair", description: "Encouraging curiosity and innovation" },
    { title: "Art Competition", description: "Nurturing creativity and expression" },
    { title: "Cultural Program", description: "Celebrating diversity and talent" }
  ];

  const testimonials = [
    {
      quote: "My child has shown remarkable improvement in both academics and confidence. The teachers are truly dedicated!",
      parent: "Mrs. Sunita Agarwal",
      child: "Standard 3"
    },
    {
      quote: "The personalized attention and caring environment have made a huge difference in my son's learning journey.",
      parent: "Mr. Vikram Jain",
      child: "Standard 2"
    },
    {
      quote: "Excellent faculty and well-structured curriculum. My daughter loves going to school every day!",
      parent: "Mrs. Neha Chopra",
      child: "Standard 4"
    }
  ];

  const faqs = [
    {
      question: "What is the class size?",
      answer: "We maintain small class sizes of 15-20 students to ensure personalized attention for each child."
    },
    {
      question: "What are the school timings?",
      answer: "School timings are from 8:00 AM to 2:00 PM, Monday to Friday. We also offer after-school care until 4:00 PM."
    },
    {
      question: "What subjects are covered?",
      answer: "We cover English, Mathematics, Science, Hindi, Social Studies, Art & Craft, and Physical Education as per the Maharashtra Board syllabus."
    },
    {
      question: "Are there regular assessments?",
      answer: "Yes, we conduct continuous assessments, unit tests, and terminal examinations along with regular parent-teacher meetings."
    },
    {
      question: "What extracurricular activities are offered?",
      answer: "We offer sports, arts, music, dance, drama, and various clubs to help develop well-rounded personalities."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header & Welcome Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white mt-16">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl mb-6">
            Welcome to Our Primary School
          </h1>
          <h2 className="text-3xl mb-4">(Std. 1-4)</h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Building strong foundations for young learners through personalized attention, 
            expert guidance, and a nurturing environment that inspires curiosity and excellence.
          </p>
        </div>
      </section>

      {/* Explore Our Classes Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Explore Our Classes</h2>
            <p className="text-lg text-muted-foreground">
              Choose the right batch for your child's learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((classInfo, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20"
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    {classInfo.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {classInfo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/programs/primary/batch/${classInfo.standard}`}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      View Batch Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Educators Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Meet Our Educators</h2>
            <p className="text-lg text-muted-foreground">
              Experienced and dedicated teachers committed to your child's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                    {teacher.photo}
                  </div>
                  <CardTitle className="text-xl text-primary">{teacher.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {teacher.qualification}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    {teacher.subjects}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Shining Stars Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Our Shining Stars</h2>
            <p className="text-lg text-muted-foreground">
              Celebrating our top achievers across all standards
            </p>
          </div>

          <Tabs defaultValue="Standard 1" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="Standard 1">Standard 1</TabsTrigger>
              <TabsTrigger value="Standard 2">Standard 2</TabsTrigger>
              <TabsTrigger value="Standard 3">Standard 3</TabsTrigger>
              <TabsTrigger value="Standard 4">Standard 4</TabsTrigger>
            </TabsList>

            {Object.entries(topAchievers).map(([standard, achievers]) => (
              <TabsContent key={standard} value={standard}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Top Achievers - {standard}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {achievers.map((achiever, idx) => (
                        <li key={idx} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <Star className="h-5 w-5 text-accent fill-accent" />
                              {achiever.name}
                            </h3>
                            <p className="text-muted-foreground">{achiever.achievement}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Fun & Learning Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Fun & Learning</h2>
            <p className="text-lg text-muted-foreground">
              Engaging activities that make learning enjoyable and memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary text-center">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {activity.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Parent Testimonials</h2>
            <p className="text-lg text-muted-foreground">
              What parents say about our primary school program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center text-2xl font-bold">
                    {testimonial.parent.split(' ')[1][0]}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-primary">{testimonial.parent}</p>
                  <p className="text-sm text-muted-foreground">Parent of {testimonial.child} Student</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our primary program
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Next Steps (CTA) Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">Ready to Join Our Family?</h2>
          <p className="text-xl mb-8 text-white/90">
            Give your child the best start in their educational journey
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
            <Link to="/login">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Apply Now
              </Button>
            </Link>
          </div>

          <div className="space-y-2 text-white/90">
            <p className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              +91 98765 43210
            </p>
            <p className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              admissions@educoach.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrimaryProgram;