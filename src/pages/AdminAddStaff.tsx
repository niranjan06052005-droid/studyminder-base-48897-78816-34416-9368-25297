import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, LogOut, ArrowLeft, UserPlus, Save, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AdminSidebar from "@/components/AdminSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const AdminAddStaff = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg");
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    gender: "",
    dob: "",
    aadharNo: "",
    
    // Professional Info
    qualification: "",
    department: "",
    designation: "",
    experience: "",
    
    // Bank Details
    bankName: "",
    branchName: "",
    accountNo: "",
    ifscCode: "",
    upiId: "",
    bankMobileNo: "",
    
    // Salary Information
    package: "",
    
    // Contact
    email: "",
    whatsappNo: "",
    optionalNo: "",
    
    // Address
    country: "India",
    state: "",
    city: "",
    postalCode: "",
    addressLine1: "",
    addressLine2: ""
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.whatsappNo || !formData.designation) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Staff Member Added",
      description: `${formData.fullName} has been successfully added to the system.`,
    });
    
    navigate("/admin/staff");
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
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/staff")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Staff List
          </Button>

          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
              <UserPlus className="h-8 w-8" />
              Add New Staff Member
            </h2>
            <p className="text-muted-foreground">Fill in the details to add a new staff member</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="max-w-6xl mx-auto">
              <CardHeader className="text-center pb-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profileImage} alt="Profile" />
                      <AvatarFallback className="text-2xl">
                        {formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('') : 'ST'}
                      </AvatarFallback>
                    </Avatar>
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
                  </div>
                  <CardTitle className="text-xl">Upload Profile Photo</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadharNo">Aadhar Card No</Label>
                      <Input
                        id="aadharNo"
                        placeholder="Enter Aadhar number"
                        value={formData.aadharNo}
                        onChange={(e) => handleInputChange("aadharNo", e.target.value)}
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
                        placeholder="e.g., M.Sc., B.Ed."
                        value={formData.qualification}
                        onChange={(e) => handleInputChange("qualification", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department/Subject</Label>
                      <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Social Studies">Social Studies</SelectItem>
                          <SelectItem value="Hindi">Hindi</SelectItem>
                          <SelectItem value="Marathi">Marathi</SelectItem>
                          <SelectItem value="Administration">Administration</SelectItem>
                          <SelectItem value="Accounts">Accounts</SelectItem>
                          <SelectItem value="Library">Library</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Select value={formData.designation} onValueChange={(value) => handleInputChange("designation", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="Senior Teacher">Senior Teacher</SelectItem>
                          <SelectItem value="Teacher">Teacher</SelectItem>
                          <SelectItem value="Junior Teacher">Junior Teacher</SelectItem>
                          <SelectItem value="Admin Staff">Admin Staff</SelectItem>
                          <SelectItem value="Accountant">Accountant</SelectItem>
                          <SelectItem value="Librarian">Librarian</SelectItem>
                          <SelectItem value="Lab Assistant">Lab Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Teaching Experience</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 5 years"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
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
                        placeholder="Enter bank name"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchName">Branch Name</Label>
                      <Input
                        id="branchName"
                        placeholder="Enter branch name"
                        value={formData.branchName}
                        onChange={(e) => handleInputChange("branchName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNo">Account No</Label>
                      <Input
                        id="accountNo"
                        placeholder="Enter account number"
                        value={formData.accountNo}
                        onChange={(e) => handleInputChange("accountNo", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        placeholder="Enter IFSC code"
                        value={formData.ifscCode}
                        onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID (PhonePe or GPay)</Label>
                      <Input
                        id="upiId"
                        placeholder="Enter UPI ID"
                        value={formData.upiId}
                        onChange={(e) => handleInputChange("upiId", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankMobileNo">Mobile No (Linked to Bank)</Label>
                      <Input
                        id="bankMobileNo"
                        placeholder="Enter mobile number"
                        value={formData.bankMobileNo}
                        onChange={(e) => handleInputChange("bankMobileNo", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Salary Information */}
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b">Salary Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="package">Package (Monthly Salary ₹)</Label>
                      <Input
                        id="package"
                        type="number"
                        placeholder="Enter monthly salary"
                        value={formData.package}
                        onChange={(e) => handleInputChange("package", e.target.value)}
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
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsappNo">WhatsApp No *</Label>
                      <Input
                        id="whatsappNo"
                        type="tel"
                        placeholder="Enter WhatsApp number"
                        value={formData.whatsappNo}
                        onChange={(e) => handleInputChange("whatsappNo", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="optionalNo">Optional No</Label>
                      <Input
                        id="optionalNo"
                        type="tel"
                        placeholder="Enter alternate number"
                        value={formData.optionalNo}
                        onChange={(e) => handleInputChange("optionalNo", e.target.value)}
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        placeholder="Enter street address"
                        value={formData.addressLine1}
                        onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        placeholder="Enter additional address details"
                        value={formData.addressLine2}
                        onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button type="submit" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Save Staff Member
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/admin/staff")}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminAddStaff;