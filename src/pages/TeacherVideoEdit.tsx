import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Video, Settings, Monitor, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock data for videos
const videosData: Record<string, {
  id: string;
  title: string;
  duration: string;
  chapter: string;
  subject: string;
  description: string;
  uploadedDate: string;
  quality: string;
  defaultSpeed: number;
}> = {
  "v1": {
    id: "v1",
    title: "Module 1.1: Introduction to Linear Equations",
    duration: "12:45",
    chapter: "Chapter 1: Linear Equations in Two Variables",
    subject: "Mathematics",
    description: "In this video, we will learn about linear equations in two variables. We'll understand what constitutes a linear equation, how to identify them, and their graphical representation on a coordinate plane.",
    uploadedDate: "2024-01-10",
    quality: "1080p",
    defaultSpeed: 1.0
  },
  "v2": {
    id: "v2",
    title: "Module 1.2: Solving Equations by Cramer's Rule",
    duration: "15:30",
    chapter: "Chapter 1: Linear Equations in Two Variables",
    subject: "Mathematics",
    description: "Learn how to solve simultaneous linear equations using Cramer's Rule. This powerful method uses determinants to find solutions efficiently.",
    uploadedDate: "2024-01-12",
    quality: "720p",
    defaultSpeed: 1.0
  },
  "v3": {
    id: "v3",
    title: "Module 2.1: Nature of Roots",
    duration: "14:15",
    chapter: "Chapter 2: Quadratic Equations",
    subject: "Mathematics",
    description: "Understanding the nature of roots of quadratic equations using discriminant. Learn how to determine whether roots are real, equal, or imaginary.",
    uploadedDate: "2024-01-20",
    quality: "1080p",
    defaultSpeed: 1.0
  },
};

export default function TeacherVideoEdit() {
  const { classId, videoId } = useParams();
  const navigate = useNavigate();
  const video = videosData[videoId || "v1"];

  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const [quality, setQuality] = useState(video?.quality || "1080p");
  const [defaultSpeed, setDefaultSpeed] = useState([video?.defaultSpeed || 1.0]);

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

  const handleSave = () => {
    toast.success("Video settings saved successfully!");
    navigate(`/teacher/class/${classId}/video/${videoId}`);
  };

  const speedLabels: Record<number, string> = {
    0.25: "0.25x",
    0.5: "0.5x",
    0.75: "0.75x",
    1.0: "1.0x",
    1.25: "1.25x",
    1.5: "1.5x",
    1.75: "1.75x",
    2.0: "2.0x"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/teacher/class/${classId}/video/${videoId}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">Edit Video Settings</h1>
                <p className="text-sm text-muted-foreground">{video.chapter}</p>
              </div>
            </div>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Preview
              </CardTitle>
              <CardDescription>Preview how the video will appear to students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-foreground aspect-video rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                  <div className="text-center text-primary-foreground">
                    <Video className="h-16 w-16 mx-auto mb-2" />
                    <p className="text-lg font-medium">Video Preview</p>
                    <p className="text-sm opacity-80">Quality: {quality} • Speed: {defaultSpeed[0]}x</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{video.duration} • {video.chapter}</p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Video Title</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter video description"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quality Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Quality Settings
                </CardTitle>
                <CardDescription>Set the default video quality for students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Quality</Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="360p">360p (Low)</SelectItem>
                      <SelectItem value="480p">480p (Standard)</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Students can still manually change quality based on their internet speed
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Playback Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Playback Settings
                </CardTitle>
                <CardDescription>Configure default playback speed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Default Playback Speed</Label>
                    <span className="text-lg font-bold text-primary">{defaultSpeed[0]}x</span>
                  </div>
                  <Slider 
                    value={defaultSpeed}
                    onValueChange={setDefaultSpeed}
                    min={0.25}
                    max={2}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.25x</span>
                    <span>1.0x</span>
                    <span>2.0x</span>
                  </div>
                </div>
                <div className="bg-accent/20 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Tip:</strong> Set speed to 1.0x for normal lectures. 
                    Use slower speeds for complex topics or faster for quick reviews.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
