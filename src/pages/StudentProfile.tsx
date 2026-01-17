import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  User, 
  LogOut, 
  ClipboardList, 
  FileText, 
  Trophy, 
  DollarSign, 
  Bell,
  Camera,
  Lock
} from "lucide-react";

const StudentProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    profileImage: "",
    firstName: "Rahul",
    middleName: "Suresh",
    lastName: "Sharma",
    dateOfBirth: "2012-05-15",
    gender: "Male",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    // Academic Information (Restricted - Student cannot edit)
    studentId: "EDU2024001",
    class: "8th Standard",
    rollNo: "15",
    admissionDate: "2020-06-15",
    academicYear: "2024-25",
    schoolName: "St. Mary's High School",
    // Guardian Information
    fatherName: "Suresh Sharma",
    motherName: "Priya Sharma",
    guardianContact1: "9876543211",
    guardianContact2: "9876543212",
    guardianEmail: "suresh.sharma@example.com",
    guardianOccupation: "Business",
    // Fee Information (Restricted - Student cannot edit)
    totalFee: "25000",
    paidAmount: "15000",
    dueAmount: "10000",
    paymentStatus: "Partial",
    lastPaymentDate: "2024-01-15",
    // Contact Information
    address: "123, Green Valley Apartments",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    // Address Information
    permanentAddress: "456, Rose Garden, Pune",
    correspondenceAddress: "123, Green Valley Apartments, Mumbai"
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  // Fields that students CANNOT edit (always disabled)
  const restrictedFields = [
    'studentId', 'class', 'rollNo', 'admissionDate', 'academicYear', 'schoolName',
    'totalFee', 'paidAmount', 'dueAmount', 'paymentStatus', 'lastPaymentDate'
  ];

  const isFieldRestricted = (field: string) => restrictedFields.includes(field);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f2c4a] text-white flex flex-col fixed left-0 top-0 h-screen overflow-y-auto z-40">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">Student Portal</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link to="/student/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <Link to="/student/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            
            <Link to="/student/report" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <ClipboardList className="h-5 w-5" />
              <span>My Report</span>
            </Link>
            
            <Link to="/student/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Attendance</span>
            </Link>
            
            <Link to="/student/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </Link>
            
            <Link to="/student/fees" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <DollarSign className="h-5 w-5" />
              <span>Fees</span>
            </Link>
            
            <Link to="/student/notices" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span>Notices</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">My Profile</h1>
            <div className="flex gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="destructive" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <Card className="max-w-5xl mx-auto">
            <CardContent className="p-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-primary">
                    <AvatarImage src={formData.profileImage} />
                    <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                      {formData.firstName[0]}{formData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="h-5 w-5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground">
                    {formData.firstName} {formData.middleName} {formData.lastName}
                  </h2>
                  <p className="text-muted-foreground">Student ID: {formData.studentId}</p>
                  <p className="text-muted-foreground">{formData.class} | Roll No: {formData.rollNo}</p>
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Academic Information - RESTRICTED */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                  <h3 className="text-xl font-semibold text-primary">Academic Information</h3>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">(View Only)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Input
                      id="class"
                      value={formData.class}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      value={formData.rollNo}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionDate">Admission Date</Label>
                    <Input
                      id="admissionDate"
                      type="date"
                      value={formData.admissionDate}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Current Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={formData.academicYear}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input
                      id="schoolName"
                      value={formData.schoolName}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Guardian Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianContact1">Guardian Contact No 1</Label>
                    <Input
                      id="guardianContact1"
                      value={formData.guardianContact1}
                      onChange={(e) => handleInputChange("guardianContact1", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianContact2">Guardian Contact No 2</Label>
                    <Input
                      id="guardianContact2"
                      value={formData.guardianContact2}
                      onChange={(e) => handleInputChange("guardianContact2", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianEmail">Guardian Email</Label>
                    <Input
                      id="guardianEmail"
                      type="email"
                      value={formData.guardianEmail}
                      onChange={(e) => handleInputChange("guardianEmail", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianOccupation">Guardian Occupation</Label>
                    <Input
                      id="guardianOccupation"
                      value={formData.guardianOccupation}
                      onChange={(e) => handleInputChange("guardianOccupation", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Fee Information - RESTRICTED */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                  <h3 className="text-xl font-semibold text-primary">Fee Information</h3>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">(View Only)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalFee">Total Fee (₹)</Label>
                    <Input
                      id="totalFee"
                      value={formData.totalFee}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paidAmount">Paid Amount (₹)</Label>
                    <Input
                      id="paidAmount"
                      value={formData.paidAmount}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueAmount">Due Amount (₹)</Label>
                    <Input
                      id="dueAmount"
                      value={formData.dueAmount}
                      disabled
                      className="bg-muted text-destructive font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentStatus">Payment Status</Label>
                    <Input
                      id="paymentStatus"
                      value={formData.paymentStatus}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastPaymentDate">Last Payment Date</Label>
                    <Input
                      id="lastPaymentDate"
                      type="date"
                      value={formData.lastPaymentDate}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Address Information */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Address Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="permanentAddress">Permanent Address</Label>
                    <Input
                      id="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correspondenceAddress">Correspondence Address</Label>
                    <Input
                      id="correspondenceAddress"
                      value={formData.correspondenceAddress}
                      onChange={(e) => handleInputChange("correspondenceAddress", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
