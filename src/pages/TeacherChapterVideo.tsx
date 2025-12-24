import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings, Clock, BookOpen, Video, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

// Mock data for videos
const videosData: Record<string, {
  id: string;
  title: string;
  duration: string;
  chapter: string;
  subject: string;
  description: string;
  uploadedDate: string;
  views: number;
  uploadedBy: string;
}> = {
  "v1": {
    id: "v1",
    title: "Module 1.1: Introduction to Linear Equations",
    duration: "12:45",
    chapter: "Chapter 1: Linear Equations in Two Variables",
    subject: "Mathematics",
    description: "In this video, we will learn about linear equations in two variables. We'll understand what constitutes a linear equation, how to identify them, and their graphical representation on a coordinate plane.",
    uploadedDate: "2024-01-10",
    views: 42,
    uploadedBy: "You"
  },
  "v2": {
    id: "v2",
    title: "Module 1.2: Solving Equations by Cramer's Rule",
    duration: "15:30",
    chapter: "Chapter 1: Linear Equations in Two Variables",
    subject: "Mathematics",
    description: "Learn how to solve simultaneous linear equations using Cramer's Rule. This powerful method uses determinants to find solutions efficiently.",
    uploadedDate: "2024-01-12",
    views: 35,
    uploadedBy: "You"
  },
  "v3": {
    id: "v3",
    title: "Module 2.1: Nature of Roots",
    duration: "14:15",
    chapter: "Chapter 2: Quadratic Equations",
    subject: "Mathematics",
    description: "Understanding the nature of roots of quadratic equations using discriminant. Learn how to determine whether roots are real, equal, or imaginary.",
    uploadedDate: "2024-01-20",
    views: 28,
    uploadedBy: "You"
  },
};

export default function TeacherChapterVideo() {
  const { classId, videoId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const video = videosData[videoId || "v1"];
  
  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Video not found</h2>
            <p className="text-muted-foreground mb-4">The requested video could not be found.</p>
            <Link to={`/teacher/class/${classId}`}>
              <Button>Back to Class</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parse duration to seconds
  const durationParts = video.duration.split(':');
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/teacher/class/${classId}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">{video.title}</h1>
                <p className="text-sm text-muted-foreground">{video.chapter}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Eye className="h-3 w-3" />
                {video.views} views
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {video.duration}
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg">
              {/* Video Container */}
              <div 
                className="relative bg-foreground aspect-video cursor-pointer group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => !isPlaying && setShowControls(true)}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {/* Video placeholder/thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  {!isPlaying && (
                    <div className="h-20 w-20 rounded-full bg-primary/90 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="h-10 w-10 text-primary-foreground ml-1" />
                    </div>
                  )}
                  {isPlaying && (
                    <div className="text-primary-foreground text-center">
                      <Video className="h-16 w-16 mx-auto mb-2 animate-pulse" />
                      <p className="text-lg font-medium">Video Playing...</p>
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <Progress value={(currentTime / totalSeconds) * 100} className="h-1 bg-white/30" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <span className="text-white text-sm ml-2">
                        {formatTime(currentTime)} / {video.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Settings className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">{video.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>Uploaded by {video.uploadedBy}</span>
                  <span>•</span>
                  <span>{new Date(video.uploadedDate).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</span>
                  <span>•</span>
                  <span>{video.views} student views</span>
                </div>
                <p className="text-muted-foreground">{video.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Videos in this Chapter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.values(videosData)
                  .filter(v => v.chapter === video.chapter)
                  .map((relatedVideo) => (
                    <Link 
                      key={relatedVideo.id} 
                      to={`/teacher/class/${classId}/video/${relatedVideo.id}`}
                    >
                      <Card className={`cursor-pointer transition-all hover:shadow-md ${relatedVideo.id === video.id ? 'border-primary bg-primary/5' : ''}`}>
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div className="w-24 h-14 bg-muted rounded flex items-center justify-center flex-shrink-0 relative">
                              <Play className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2">{relatedVideo.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{relatedVideo.duration} • {relatedVideo.views} views</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </CardContent>
            </Card>

            {/* Other Chapters */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Other Chapter Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.values(videosData)
                  .filter(v => v.chapter !== video.chapter)
                  .slice(0, 3)
                  .map((otherVideo) => (
                    <Link 
                      key={otherVideo.id} 
                      to={`/teacher/class/${classId}/video/${otherVideo.id}`}
                    >
                      <Card className="cursor-pointer transition-all hover:shadow-md">
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div className="w-20 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                              <Play className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2">{otherVideo.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{otherVideo.chapter}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
