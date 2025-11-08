import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Home, LogOut, ArrowLeft, Camera } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "sonner";

const AdminStaffView = () => {
  const { staffId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg");
  
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "Dr. Rajesh Kumar",
    gender: "Male",
    dob: "1985-01-20",
    age: "39",
    aadharNo: "1234-5678-9012",
    
    // Professional Info
    qualification: "M.Sc Mathematics, B.Ed",
    department: "Mathematics",
    designation: "Senior Teacher",
    experience: "12 years",
    
    // Bank Details
    bankName: "State Bank of India",
    branchName: "Mumbai Central",
    accountNo: "9876543210",
    ifscCode: "SBIN0001234",
    upiId: "teacher@paytm",
    bankMobileNo: "+91 98765 43210",
    
    // Salary Information
    package: "₹75,000/month",
    disbursedAmount: "₹72,000",
    dueAmount: "₹3,000",
    
    // Contact
    email: "rajesh.kumar@email.com",
    whatsappNo: "+91 98765 43210",
    optionalNo: "+91 98765 43211",
    
    // Address
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    postalCode: "400001",
    addressLine1: "456 Park Avenue",
    addressLine2: "Near Central Station"
  });

  const classes = [
    { standard: "Class 10", section: "A", subject: "Mathematics" },
    { standard: "Class 10", section: "B", subject: "Mathematics" },
    { standard: "Class 9", section: "A", subject: "Mathematics" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast.success("Profile image updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Admin Portal</h1>
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
          {/* Back Button */}
          <Link to="/admin/staff">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Staff Management
            </Button>
          </Link>

          <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center pb-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileImage} alt={formData.fullName} />
                    <AvatarFallback className="text-2xl">
                      {formData.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <div>
                  <CardTitle className="text-3xl">{formData.fullName}</CardTitle>
                  <p className="text-muted-foreground mt-1">{formData.designation}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="flex justify-end">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
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
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={formData.age}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadharNo">Aadhar Card No</Label>
                    <Input
                      id="aadharNo"
                      value={formData.aadharNo}
                      onChange={(e) => handleInputChange("aadharNo", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Professional Information */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange("qualification", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Teaching Experience</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Bank Details */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange("bankName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branchName">Branch Name</Label>
                    <Input
                      id="branchName"
                      value={formData.branchName}
                      onChange={(e) => handleInputChange("branchName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNo">Account No</Label>
                    <Input
                      id="accountNo"
                      value={formData.accountNo}
                      onChange={(e) => handleInputChange("accountNo", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID (PhonePe or GPay)</Label>
                    <Input
                      id="upiId"
                      value={formData.upiId}
                      onChange={(e) => handleInputChange("upiId", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankMobileNo">Mobile No</Label>
                    <Input
                      id="bankMobileNo"
                      value={formData.bankMobileNo}
                      onChange={(e) => handleInputChange("bankMobileNo", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Classes Assigned */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Classes Assigned</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {classes.map((cls, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{cls.standard} - Section {cls.section}</p>
                        <p className="text-sm text-muted-foreground">{cls.subject}</p>
                      </div>
                      <Badge variant="secondary">{cls.subject}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Salary Information */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Salary Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="package">Package</Label>
                    <Input
                      id="package"
                      value={formData.package}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disbursedAmount">Disbursed Amount</Label>
                    <Input
                      id="disbursedAmount"
                      value={formData.disbursedAmount}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueAmount">Due Amount</Label>
                    <Input
                      id="dueAmount"
                      value={formData.dueAmount}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Label htmlFor="whatsappNo">WhatsApp No</Label>
                    <Input
                      id="whatsappNo"
                      type="tel"
                      value={formData.whatsappNo}
                      onChange={(e) => handleInputChange("whatsappNo", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="optionalNo">Optional No</Label>
                    <Input
                      id="optionalNo"
                      type="tel"
                      value={formData.optionalNo}
                      onChange={(e) => handleInputChange("optionalNo", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
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
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange("addressLine2", e.target.value)}
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

export default AdminStaffView;
