import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  UtensilsCrossed, 
  Palette, 
  Music, 
  Mic2, 
  Trophy,
  Brain,
  Calendar,
  Users,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Activities = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const activities = [
    {
      id: 1,
      title: "Food Festival",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "A celebration of diverse cuisines where students showcase their culinary creativity and cultural heritage through delicious homemade dishes.",
      highlights: ["Cultural Food Stalls", "Best Dish Awards", "Recipe Sharing", "Food Games"],
      images: [
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      ],
      participants: "200+",
      lastEvent: "December 2024"
    },
    {
      id: 2,
      title: "Drawing & Handwriting Competition",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Nurturing artistic expression and penmanship excellence. Students showcase their creative talents through beautiful artwork and elegant handwriting.",
      highlights: ["Age-wise Categories", "Expert Judging", "Art Exhibition", "Certificate Awards"],
      images: [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&h=400&fit=crop",
      ],
      participants: "150+",
      lastEvent: "November 2024"
    },
    {
      id: 3,
      title: "Annual Function",
      icon: Music,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Our grandest celebration of the year featuring cultural performances, dance, drama, and recognition of outstanding achievers.",
      highlights: ["Cultural Performances", "Prize Distribution", "Dance & Drama", "Parent Participation"],
      images: [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
      ],
      participants: "500+",
      lastEvent: "January 2025"
    },
    {
      id: 4,
      title: "Speech Competition",
      icon: Mic2,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Building confidence and communication skills through public speaking. Students express their thoughts on various topics with conviction.",
      highlights: ["Multiple Topics", "Expert Mentoring", "Confidence Building", "Language Skills"],
      images: [
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&h=400&fit=crop",
      ],
      participants: "100+",
      lastEvent: "October 2024"
    },
    {
      id: 5,
      title: "Chess Competition",
      icon: Trophy,
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      description: "Sharpening strategic thinking and concentration through the royal game of chess. Students compete in thrilling matches.",
      highlights: ["Swiss Format", "All Age Groups", "Expert Coaching", "Ranking Points"],
      images: [
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&h=400&fit=crop",
      ],
      participants: "80+",
      lastEvent: "September 2024"
    },
    {
      id: 6,
      title: "Quiz Game",
      icon: Brain,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      description: "Testing knowledge across various subjects in an exciting quiz format. Teams compete in rapid-fire rounds of intellectual challenge.",
      highlights: ["Team Competition", "Multiple Rounds", "GK & Current Affairs", "Exciting Prizes"],
      images: [
        "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      ],
      participants: "120+",
      lastEvent: "August 2024"
    },
  ];

  const stats = [
    { icon: Calendar, value: "15+", label: "Events Per Year" },
    { icon: Users, value: "1000+", label: "Student Participants" },
    { icon: Trophy, value: "50+", label: "Awards Given" },
    { icon: Star, value: "100%", label: "Parent Appreciation" },
  ];

  const selectedActivityData = selectedActivity !== null ? activities.find(a => a.id === selectedActivity) : null;

  const handlePrevImage = () => {
    if (selectedActivityData) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedActivityData.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedActivityData) {
      setSelectedImageIndex((prev) => 
        prev === selectedActivityData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Beyond Academics</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
              Our Activities & Events
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Learning extends beyond textbooks! Explore our vibrant activities that nurture 
              creativity, build confidence, and create unforgettable memories.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 animate-fade-in flex flex-col h-full"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Header Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={activity.images[0]}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activity.color} opacity-60`} />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{activity.title}</h3>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {activity.participants}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {activity.lastEvent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {activity.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activity.highlights.map((highlight) => (
                      <span 
                        key={highlight}
                        className={`text-xs px-3 py-1 rounded-full ${activity.bgColor} ${activity.borderColor} border`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Mini Gallery */}
                  <div className="flex gap-2 mb-4 mt-auto">
                    {activity.images.slice(1, 4).map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                        onClick={() => {
                          setSelectedActivity(activity.id);
                          setSelectedImageIndex(imgIndex + 1);
                        }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {imgIndex === 2 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-medium">
                            +{activity.images.length - 3}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => {
                      setSelectedActivity(activity.id);
                      setSelectedImageIndex(0);
                    }}
                    className={`w-full bg-gradient-to-r ${activity.color} hover:opacity-90 text-white`}
                  >
                    View Gallery
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Be Part of the Fun?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join EduCoach and experience a learning environment where academics meet 
              creativity, competition, and celebration!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/get-started">Enroll Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/30 backdrop-blur-sm">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedActivityData && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedActivity(null)}
        >
          <button
            onClick={() => setSelectedActivity(null)}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
            className="absolute left-4 text-white hover:text-primary transition-colors z-50 bg-black/50 rounded-full p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
            className="absolute right-4 text-white hover:text-primary transition-colors z-50 bg-black/50 rounded-full p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div 
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedActivityData.images[selectedImageIndex]}
                alt={selectedActivityData.title}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-white">{selectedActivityData.title}</h3>
                <p className="text-white/80 text-sm">{selectedActivityData.description}</p>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2 mt-4">
              {selectedActivityData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    selectedImageIndex === index 
                      ? "ring-2 ring-primary scale-110" 
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Activities;
