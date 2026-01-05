import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Calendar, 
  CheckCircle, 
  GraduationCap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LearningJourneyCTA from "@/components/LearningJourneyCTA";
import heroClassroom from "@/assets/hero-classroom.jpg";

const BatchDetails = () => {
  const { standard } = useParams();
  
  // Data for different standards
  const getBatchData = (std: string) => {
    const standardNum = parseInt(std) || 1;
    
    // Define section-specific data
    const primaryData = {
      subjects: [
        { name: "Mathematics", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Science", icon: <BookOpen className="h-5 w-5" /> },
        { name: "English", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Hindi", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Marathi", icon: <BookOpen className="h-5 w-5" /> }
      ],
      timings: "8:00 AM - 10:00 AM",
      classSize: "15-20 Students",
      ratio: "15:1"
    };

    const middleData = {
      subjects: [
        { name: "Mathematics", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Science", icon: <BookOpen className="h-5 w-5" /> },
        { name: "English", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Hindi", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Marathi", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Social Studies", icon: <BookOpen className="h-5 w-5" /> }
      ],
      timings: "4:00 PM - 6:30 PM",
      classSize: "20-25 Students",
      ratio: "12:1"
    };

    const secondaryData = {
      subjects: [
        { name: "Mathematics", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Science", icon: <BookOpen className="h-5 w-5" /> },
        { name: "English", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Hindi", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Marathi", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Social Studies", icon: <BookOpen className="h-5 w-5" /> },
        { name: "Information Technology", icon: <BookOpen className="h-5 w-5" /> }
      ],
      timings: "5:00 PM - 8:00 PM",
      classSize: "20-25 Students",
      ratio: "10:1"
    };

    // Standard-specific titles and descriptions
    const standardInfo: Record<number, { title: string; tagline: string; focus: string }> = {
      1: { title: "Building Strong Foundations", tagline: "Where learning begins with joy", focus: "phonics, basic numeracy, and creative expression" },
      2: { title: "Growing Curious Minds", tagline: "Nurturing curiosity and confidence", focus: "reading fluency, problem-solving, and exploratory learning" },
      3: { title: "Strengthening Core Skills", tagline: "Building blocks for future success", focus: "mathematical reasoning, language skills, and scientific thinking" },
      4: { title: "Preparing for Middle School", tagline: "Ready for the next big step", focus: "advanced concepts, independent learning, and analytical thinking" },
      5: { title: "Transition Excellence", tagline: "Bridging primary to middle school", focus: "deeper conceptual understanding and skill development" },
      6: { title: "Knowledge Expansion", tagline: "Broadening horizons", focus: "comprehensive subject coverage and exam preparation" },
      7: { title: "Academic Advancement", tagline: "Preparing for board foundation", focus: "advanced topics and competitive exam preparation" },
      8: { title: "Foundation Builders", tagline: "Strengthening fundamentals", focus: "board exam foundation and concept clarity" },
      9: { title: "Excellence Path", tagline: "Intensive preparation begins", focus: "pre-board preparation and conceptual mastery" },
      10: { title: "Success Summit", tagline: "Board exam excellence", focus: "comprehensive board exam preparation and result-oriented coaching" }
    };

    const info = standardInfo[standardNum] || standardInfo[1];
    
    // Determine section
    let sectionData = primaryData;
    if (standardNum >= 5 && standardNum <= 7) {
      sectionData = middleData;
    } else if (standardNum >= 8 && standardNum <= 10) {
      sectionData = secondaryData;
    }

    // Generate teachers based on section
    const getTeachers = () => {
      if (standardNum <= 4) {
        return [
          { name: "Mrs. Priya Sharma", qualification: "M.A., B.Ed.", photo: "PS", bio: "With over 10 years of experience in primary education, Mrs. Sharma brings warmth and creativity to the classroom." },
          { name: "Ms. Anjali Desai", qualification: "M.A., B.Ed.", photo: "AD", bio: "A passionate educator who believes in nurturing each child's unique potential through hands-on learning." }
        ];
      } else if (standardNum <= 7) {
        return [
          { name: "Mr. Suresh Patil", qualification: "M.Sc., B.Ed.", photo: "SP", bio: "Expert in making complex concepts simple, with 12 years of experience in middle school education." },
          { name: "Mrs. Kavita Joshi", qualification: "M.A., B.Ed.", photo: "KJ", bio: "Specializes in language education and helps students develop strong communication skills." }
        ];
      } else {
        return [
          { name: "Dr. Ramesh Kulkarni", qualification: "Ph.D., M.Ed.", photo: "RK", bio: "Board exam specialist with 18 years of experience and numerous state toppers to his credit." },
          { name: "Mrs. Sunita Deshpande", qualification: "M.Sc., B.Ed.", photo: "SD", bio: "Science expert who has trained multiple Olympiad winners and NTSE qualifiers." }
        ];
      }
    };

    // Calculate fees based on standard
    const getFees = () => {
      const baseFee = standardNum <= 4 ? 12000 : standardNum <= 7 ? 15000 : 18000;
      const admission = standardNum <= 4 ? 5000 : standardNum <= 7 ? 6000 : 8000;
      const annual = standardNum <= 4 ? 3000 : standardNum <= 7 ? 4000 : 5000;
      const total = admission + (baseFee * 4) + annual;
      return {
        admission: `₹${admission.toLocaleString()}`,
        tuitionPerQuarter: `₹${baseFee.toLocaleString()}`,
        annualCharges: `₹${annual.toLocaleString()}`,
        totalFirstYear: `₹${total.toLocaleString()}`
      };
    };

    return {
      title: `Standard ${standardNum}: ${info.title}`,
      welcomeText: `Welcome to Standard ${standardNum} coaching program, ${info.tagline}. Our expert teaching methodology focuses on ${info.focus}. With personalized attention and comprehensive curriculum, we ensure your child excels academically.`,
      subjects: sectionData.subjects,
      weeklySchedule: [
        { day: "Monday", subject: "Mathematics", time: sectionData.timings },
        { day: "Tuesday", subject: "Science", time: sectionData.timings },
        { day: "Wednesday", subject: "Languages", time: sectionData.timings },
        { day: "Thursday", subject: "Social Studies", time: sectionData.timings },
        { day: "Friday", subject: "English", time: sectionData.timings },
        { day: "Saturday", subject: "Revision & Practice", time: sectionData.timings }
      ],
      demoVideos: [
        { subject: "Mathematics", duration: "15:30", thumbnail: "📐" },
        { subject: "Science", duration: "12:45", thumbnail: "🔬" },
        { subject: "English", duration: "10:20", thumbnail: "📚" }
      ],
      teachers: getTeachers(),
      batchInfo: {
        classSize: sectionData.classSize,
        ratio: sectionData.ratio,
        timings: sectionData.timings,
        academicYear: "June 2026 - April 2027"
      },
      fees: getFees()
    };
  };

  // Get current batch data
  const currentBatch = getBatchData(standard || "1");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(0, 51, 102, 0.85), rgba(23, 131, 145, 0.75)), url(${heroClassroom})`,
          }}
        />
        <div className="relative max-w-6xl mx-auto text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-6xl mb-6 font-bold">
            {currentBatch.title}
          </h1>
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <p className="text-xl md:text-2xl leading-relaxed">
              {currentBatch.welcomeText}
            </p>
          </div>
        </div>
      </section>

      {/* Subjects Taught */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary font-bold">Subjects We Cover</h2>
          </div>

          <Card className="shadow-lg max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2 justify-center">
                <GraduationCap className="h-6 w-6" />
                Comprehensive Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentBatch.subjects.map((subject, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all hover:shadow-md"
                  >
                    <div className="text-primary">{subject.icon}</div>
                    <span className="font-medium">{subject.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Video Lectures */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary font-bold">Experience Our Teaching</h2>
            <p className="text-lg text-muted-foreground">Watch demo lectures to see our engaging teaching methodology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentBatch.demoVideos.map((video, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center rounded-t-lg overflow-hidden">
                    <div className="text-6xl group-hover:scale-110 transition-transform">{video.thumbnail}</div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[20px] border-l-primary border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{video.subject}</h3>
                    <p className="text-sm text-muted-foreground">Duration: {video.duration} mins</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary font-bold">Weekly Class Schedule</h2>
            <p className="text-lg text-muted-foreground">Structured 2-hour sessions for focused learning</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentBatch.weeklySchedule.map((slot, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl hover:shadow-md transition-all border border-primary/10"
                  >
                    <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full flex-shrink-0">
                      <Calendar className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-primary mb-1">{slot.day}</div>
                      <div className="font-semibold text-foreground">{slot.subject}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {slot.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Meet Your Child's Teachers */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary font-bold">Our Dedicated Educators</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentBatch.teachers.map((teacher, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-32 h-32 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                    {teacher.photo}
                  </div>
                  <CardTitle className="text-2xl text-primary">{teacher.name}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {teacher.qualification}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {teacher.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Information */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary font-bold">Standard {standard} At a Glance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="font-semibold text-lg mb-2">Class Size</div>
                <div className="text-2xl font-bold text-primary">{currentBatch.batchInfo.classSize}</div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="mx-auto mb-4 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-secondary" />
                </div>
                <div className="font-semibold text-lg mb-2">Student-Teacher Ratio</div>
                <div className="text-2xl font-bold text-secondary">{currentBatch.batchInfo.ratio}</div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <div className="font-semibold text-lg mb-2">Batch Timings</div>
                <div className="text-xl font-bold text-foreground">{currentBatch.batchInfo.timings}</div>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="font-semibold text-lg mb-2">Academic Year</div>
                <div className="text-sm font-bold text-foreground">{currentBatch.batchInfo.academicYear}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment & Parent Partnership */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary font-bold">Tracking Your Child's Progress</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Regular Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Weekly tests and monthly evaluations to track progress effectively.
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-3xl">
                    📝
                  </div>
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center text-3xl">
                    📊
                  </div>
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center text-3xl">
                    ✅
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Parent-Teacher Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Monthly meetings to discuss progress and address concerns.
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-3xl">
                    👨‍🏫
                  </div>
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center text-3xl">
                    👪
                  </div>
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center text-3xl">
                    💬
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Regular Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Daily updates via WhatsApp and detailed monthly reports.
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-3xl">
                    📱
                  </div>
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center text-3xl">
                    📧
                  </div>
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center text-3xl">
                    📄
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary font-bold">Transparent Fee Details</h2>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary/20">
                      <th className="text-left py-4 px-4 text-lg font-semibold text-primary">Fee Head</th>
                      <th className="text-right py-4 px-4 text-lg font-semibold text-primary">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4">Admission Fee (One-time)</td>
                      <td className="text-right py-4 px-4 font-semibold">{currentBatch.fees.admission}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4">Tuition Fee (Per Quarter)</td>
                      <td className="text-right py-4 px-4 font-semibold">{currentBatch.fees.tuitionPerQuarter}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4">Annual Charges</td>
                      <td className="text-right py-4 px-4 font-semibold">{currentBatch.fees.annualCharges}</td>
                    </tr>
                    <tr className="border-t-2 border-primary/30 bg-primary/5">
                      <td className="py-4 px-4 font-bold text-lg">Total (First Year)</td>
                      <td className="text-right py-4 px-4 font-bold text-xl text-primary">{currentBatch.fees.totalFirstYear}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-accent" />
                  Fees can be paid annually or quarterly.
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-accent" />
                  Annual charges include the cost of the student diary, exam fees, and library access.
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-accent" />
                  Uniform, books, and transport fees are not included.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Learning Journey CTA */}
      <LearningJourneyCTA />

      <Footer />
    </div>
  );
};

export default BatchDetails;
