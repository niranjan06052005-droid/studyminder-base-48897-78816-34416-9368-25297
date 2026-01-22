import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LogOut, Home, Bell, Upload, X, Send, Calendar, Users, Eye } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "@/hooks/use-toast";

const AdminNoticeManagement = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Mock batches data - 1st to 10th standard
  const batches = [
    { id: "1a", name: "1st Standard - Section A" },
    { id: "1b", name: "1st Standard - Section B" },
    { id: "2a", name: "2nd Standard - Section A" },
    { id: "2b", name: "2nd Standard - Section B" },
    { id: "3a", name: "3rd Standard - Section A" },
    { id: "3b", name: "3rd Standard - Section B" },
    { id: "4a", name: "4th Standard - Section A" },
    { id: "4b", name: "4th Standard - Section B" },
    { id: "5a", name: "5th Standard - Section A" },
    { id: "5b", name: "5th Standard - Section B" },
    { id: "6a", name: "6th Standard - Section A" },
    { id: "6b", name: "6th Standard - Section B" },
    { id: "7a", name: "7th Standard - Section A" },
    { id: "7b", name: "7th Standard - Section B" },
    { id: "8a", name: "8th Standard - Section A" },
    { id: "8b", name: "8th Standard - Section B" },
    { id: "9a", name: "9th Standard - Section A" },
    { id: "9b", name: "9th Standard - Section B" },
    { id: "10a", name: "10th Standard - Section A" },
    { id: "10b", name: "10th Standard - Section B" },
  ];

  // Mock sent notices
  const sentNotices = [
    {
      id: 1,
      date: "Oct 15, 2025",
      title: "Mid-term Exam Schedule",
      message: "The mid-term examinations will be conducted from Oct 25 to Nov 5...",
      batches: ["9th Standard - Section A", "9th Standard - Section B"],
      audience: "Students, Parents",
      hasImages: true,
    },
    {
      id: 2,
      date: "Oct 12, 2025",
      title: "Parent-Teacher Meeting",
      message: "We are organizing a parent-teacher meeting on Oct 20...",
      batches: ["All Batches"],
      audience: "Parents",
      hasImages: false,
    },
    {
      id: 3,
      date: "Oct 8, 2025",
      title: "Holiday Notice - Diwali",
      message: "The institute will remain closed from Oct 28 to Nov 2...",
      batches: ["All Batches"],
      audience: "Students, Parents, Teachers",
      hasImages: true,
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive",
      });
      return;
    }

    setSelectedImages([...selectedImages, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleBatchToggle = (batchId: string) => {
    setSelectedBatches((prev) =>
      prev.includes(batchId) ? prev.filter((id) => id !== batchId) : [...prev, batchId]
    );
  };

  const handleSelectAllBatches = () => {
    if (selectedBatches.length === batches.length) {
      setSelectedBatches([]);
    } else {
      setSelectedBatches(batches.map((b) => b.id));
    }
  };

  const handleSendNotice = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in title and message",
        variant: "destructive",
      });
      return;
    }

    if (selectedBatches.length === 0) {
      toast({
        title: "No batch selected",
        description: "Please select at least one batch",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notice sent successfully!",
      description: `Sent to ${selectedBatches.length} batch(es)`,
    });

    // Reset form
    setTitle("");
    setMessage("");
    setSelectedBatches([]);
    setSelectedImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Notice Management</h1>
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Send Notice / Announcement
            </h2>
            <p className="text-muted-foreground">Create and send notices with photos to specific batches</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notice Compose Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Notice</CardTitle>
                  <CardDescription>Fill in the details to send a notice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Notice Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Mid-term Exam Schedule"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your notice message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Attach Images (Max 5)</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        disabled={selectedImages.length >= 5}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Images
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {selectedImages.length}/5 images selected
                      </span>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Send Button */}
                  <Button className="w-full" size="lg" onClick={handleSendNotice}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Notice
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Batch Selection Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Select Batches *
                  </CardTitle>
                  <CardDescription>Choose which batches to send this notice to</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 pb-3 border-b">
                    <Checkbox
                      id="select-all"
                      checked={selectedBatches.length === batches.length}
                      onCheckedChange={handleSelectAllBatches}
                    />
                    <label
                      htmlFor="select-all"
                      className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Select All Batches
                    </label>
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {batches.map((batch) => (
                      <div key={batch.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={batch.id}
                          checked={selectedBatches.includes(batch.id)}
                          onCheckedChange={() => handleBatchToggle(batch.id)}
                        />
                        <label
                          htmlFor={batch.id}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {batch.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  {selectedBatches.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground">
                        {selectedBatches.length} batch{selectedBatches.length > 1 ? "es" : ""} selected
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Notice History */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Notice History
                </CardTitle>
                <CardDescription>Previously sent notices and announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sentNotices.map((notice) => (
                    <div key={notice.id} className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{notice.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{notice.message}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {notice.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {notice.batches.join(", ")}
                            </span>
                            <span>•</span>
                            <span>To: {notice.audience}</span>
                            {notice.hasImages && (
                              <>
                                <span>•</span>
                                <span className="text-primary">📷 Has images</span>
                              </>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin/notices/${notice.id}`, { state: { notice } })}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminNoticeManagement;
