import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Home, LogOut, Camera, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "@/components/AdminSidebar";

const AdminAddStudent = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    age: "",
    aadharNo: "",
    
    // Academic Info
    studentId: "",
    class: "",
    rollNo: "",
    admissionDate: "",
    academicYear: "",
    schoolName: "",
    
    // Guardian Info
    fatherName: "",
    motherName: "",
    guardianContact1: "",
    guardianContact2: "",
    fatherOccupation: "",
    motherOccupation: "",
    
    // Fee Section
    academicFee: "",
    plan: "",
    dueAmount: "",
    paidAmount: "",
    
    // Contact Info
    email: "",
    mobileNo: "",
    whatsappNo: "",
    
    // Address
    country: "",
    state: "",
    city: "",
    postalCode: "",
    addressLine1: "",
    addressLine2: ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile image uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.studentId) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Student added successfully!");
    navigate("/admin/students");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/students">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Add New Student</h1>
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

        <main className="flex-1 p-8 overflow-auto">
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center pb-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback className="text-2xl">
                      {formData.firstName?.[0] || "S"}{formData.lastName?.[0] || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <CardTitle className="text-2xl">New Student Registration</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                      placeholder="Enter middle name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadharNo">Aadhar Card No</Label>
                    <Input
                      id="aadharNo"
                      value={formData.aadharNo}
                      onChange={(e) => handleInputChange("aadharNo", e.target.value)}
                      placeholder="XXXX-XXXX-XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Academic Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="studentId">Student ID *</Label>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange("studentId", e.target.value)}
                      placeholder="e.g., STU2024001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      value={formData.rollNo}
                      onChange={(e) => handleInputChange("rollNo", e.target.value)}
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admissionDate">Admission Date</Label>
                    <Input
                      id="admissionDate"
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="academicYear">Current Academic Year</Label>
                    <Select value={formData.academicYear} onValueChange={(value) => handleInputChange("academicYear", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
                        <SelectItem value="2026-2027">2026-2027</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input
                      id="schoolName"
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange("schoolName", e.target.value)}
                      placeholder="Enter school name"
                    />
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Guardian Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Enter father's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      placeholder="Enter mother's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianContact1">Guardian Contact 1</Label>
                    <Input
                      id="guardianContact1"
                      value={formData.guardianContact1}
                      onChange={(e) => handleInputChange("guardianContact1", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianContact2">Guardian Contact 2</Label>
                    <Input
                      id="guardianContact2"
                      value={formData.guardianContact2}
                      onChange={(e) => handleInputChange("guardianContact2", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                    <Input
                      id="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={(e) => handleInputChange("fatherOccupation", e.target.value)}
                      placeholder="Enter occupation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                    <Input
                      id="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={(e) => handleInputChange("motherOccupation", e.target.value)}
                      placeholder="Enter occupation"
                    />
                  </div>
                </div>
              </div>

              {/* Fee Section */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Fee Section</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="academicFee">Academic Fee</Label>
                    <Input
                      id="academicFee"
                      value={formData.academicFee}
                      onChange={(e) => handleInputChange("academicFee", e.target.value)}
                      placeholder="e.g., ₹85,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="plan">Chosen Plan</Label>
                    <Select value={formData.plan} onValueChange={(value) => handleInputChange("plan", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="3-month">3 Month</SelectItem>
                        <SelectItem value="6-month">6 Month</SelectItem>
                        <SelectItem value="one-time">One-Time</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dueAmount">Due Fees</Label>
                    <Input
                      id="dueAmount"
                      value={formData.dueAmount}
                      onChange={(e) => handleInputChange("dueAmount", e.target.value)}
                      placeholder="e.g., ₹0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paidAmount">Fees Paid</Label>
                    <Input
                      id="paidAmount"
                      value={formData.paidAmount}
                      onChange={(e) => handleInputChange("paidAmount", e.target.value)}
                      placeholder="e.g., ₹85,000"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Contact Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobileNo">Mobile No</Label>
                    <Input
                      id="mobileNo"
                      value={formData.mobileNo}
                      onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsappNo">WhatsApp No</Label>
                    <Input
                      id="whatsappNo"
                      value={formData.whatsappNo}
                      onChange={(e) => handleInputChange("whatsappNo", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Address</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      placeholder="Enter country"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="Enter postal code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" onClick={() => navigate("/admin/students")}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Add Student
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminAddStudent;
