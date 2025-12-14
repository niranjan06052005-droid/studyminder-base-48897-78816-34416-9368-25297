import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogOut, Home, ArrowLeft, Calendar, Plus, Trash2, Clock, Save } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "sonner";

interface TimeSlot {
  id: string;
  time: string;
  subject: string;
  teacher: string;
}

interface Timetable {
  [day: string]: TimeSlot[];
}

const AdminEditTimetable = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [addSlotOpen, setAddSlotOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Studies",
    "Computer Science",
    "Physical Education",
  ];

  const teachers = [
    { id: "t1", name: "Mr. Sharma", subject: "Mathematics" },
    { id: "t2", name: "Dr. Verma", subject: "Science" },
    { id: "t3", name: "Ms. Patel", subject: "English" },
    { id: "t4", name: "Mrs. Gupta", subject: "Hindi" },
    { id: "t5", name: "Mr. Kumar", subject: "Social Studies" },
    { id: "t6", name: "Mr. Reddy", subject: "Computer Science" },
    { id: "t7", name: "Mr. Singh", subject: "Physical Education" },
  ];

  const [timetable, setTimetable] = useState<Timetable>({
    Monday: [
      { id: "1", time: "9:00 AM - 10:00 AM", subject: "Mathematics", teacher: "Mr. Sharma" },
      { id: "2", time: "10:15 AM - 11:15 AM", subject: "Science", teacher: "Dr. Verma" },
      { id: "3", time: "11:30 AM - 12:30 PM", subject: "English", teacher: "Ms. Patel" },
    ],
    Tuesday: [
      { id: "4", time: "9:00 AM - 10:00 AM", subject: "Hindi", teacher: "Mrs. Gupta" },
      { id: "5", time: "10:15 AM - 11:15 AM", subject: "Social Studies", teacher: "Mr. Kumar" },
      { id: "6", time: "11:30 AM - 12:30 PM", subject: "Mathematics", teacher: "Mr. Sharma" },
    ],
    Wednesday: [
      { id: "7", time: "9:00 AM - 10:00 AM", subject: "Science", teacher: "Dr. Verma" },
      { id: "8", time: "10:15 AM - 11:15 AM", subject: "English", teacher: "Ms. Patel" },
      { id: "9", time: "11:30 AM - 12:30 PM", subject: "Hindi", teacher: "Mrs. Gupta" },
    ],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const [newSlot, setNewSlot] = useState({
    startTime: "",
    endTime: "",
    subject: "",
    teacher: "",
  });

  const handleAddSlot = () => {
    if (!selectedDay || !newSlot.startTime || !newSlot.endTime || !newSlot.subject || !newSlot.teacher) {
      toast.error("Please fill all fields");
      return;
    }

    const timeString = `${newSlot.startTime} - ${newSlot.endTime}`;
    const newId = Date.now().toString();

    setTimetable((prev) => ({
      ...prev,
      [selectedDay]: [
        ...prev[selectedDay],
        {
          id: newId,
          time: timeString,
          subject: newSlot.subject,
          teacher: newSlot.teacher,
        },
      ],
    }));

    toast.success("Time slot added successfully");
    setAddSlotOpen(false);
    setNewSlot({ startTime: "", endTime: "", subject: "", teacher: "" });
    setSelectedDay("");
  };

  const handleDeleteSlot = (day: string, slotId: string) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.id !== slotId),
    }));
    toast.success("Time slot removed");
  };

  const handleSaveTimetable = () => {
    toast.success("Timetable saved successfully!");
    navigate(`/admin/batches/${batchId}`);
  };

  const batchInfo = {
    name: "9th Standard - Section A",
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to={`/admin/batches/${batchId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Edit Timetable: {batchInfo.name}</h1>
            </div>
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
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-6 animate-fade-in">
            <div>
              <p className="text-muted-foreground">Configure weekly schedule for this batch</p>
            </div>
            <div className="flex gap-3">
              <Dialog open={addSlotOpen} onOpenChange={setAddSlotOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Time Slot
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Time Slot</DialogTitle>
                    <DialogDescription>
                      Add a new class slot to the timetable
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Day</Label>
                      <Select value={selectedDay} onValueChange={setSelectedDay}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={newSlot.startTime}
                          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={newSlot.endTime}
                          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select
                        value={newSlot.subject}
                        onValueChange={(value) => setNewSlot({ ...newSlot, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Teacher</Label>
                      <Select
                        value={newSlot.teacher}
                        onValueChange={(value) => setNewSlot({ ...newSlot, teacher: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.name}>
                              {teacher.name} ({teacher.subject})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleAddSlot} className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Slot
                      </Button>
                      <Button variant="outline" onClick={() => setAddSlotOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={handleSaveTimetable}>
                <Save className="h-4 w-4 mr-2" />
                Save Timetable
              </Button>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {days.map((day) => (
              <Card key={day} className="gradient-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    {day}
                  </CardTitle>
                  <CardDescription>
                    {timetable[day]?.length || 0} classes scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {timetable[day]?.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No classes scheduled</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setSelectedDay(day);
                          setAddSlotOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Class
                      </Button>
                    </div>
                  ) : (
                    timetable[day]?.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {slot.time}
                          </p>
                          <p className="font-medium text-primary truncate">{slot.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">{slot.teacher}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteSlot(day, slot.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}

                  {timetable[day]?.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        setSelectedDay(day);
                        setAddSlotOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add More
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEditTimetable;
