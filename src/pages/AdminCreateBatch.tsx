import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Home, ArrowLeft } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "sonner";

const AdminCreateBatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    section: "",
    standard: "",
    academicYear: ""
  });

  const sections = [
    { id: "primary", name: "Primary", standards: ["1st", "2nd", "3rd", "4th"] },
    { id: "middle", name: "Middle", standards: ["5th", "6th", "7th", "8th"] },
    { id: "secondary", name: "Secondary", standards: ["9th", "10th", "11th", "12th"] }
  ];

  const academicYears = [
    "2023-2024",
    "2024-2025",
    "2025-2026",
    "2026-2027"
  ];

  const selectedSection = sections.find(s => s.id === formData.section);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.section || !formData.standard || !formData.academicYear) {
      toast.error("Please fill all required fields");
      return;
    }

    // Generate unique batch ID
    const batchId = `${formData.standard.replace(/[^0-9]/g, '')}-${formData.section}-${formData.academicYear.replace("-", "")}`;
    
    toast.success(`Batch "${formData.standard} Standard - ${selectedSection?.name} (${formData.academicYear})" created successfully!`);
    navigate("/admin/batches");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/batches">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Create New Batch</h1>
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
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Batch Details</CardTitle>
              <CardDescription>
                Create a new batch by selecting section, standard, and academic year. 
                A unique batch will be created from the combination of these fields.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section */}
                <div className="space-y-2">
                  <Label htmlFor="section">Section *</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) => setFormData({ ...formData, section: value, standard: "" })}
                  >
                    <SelectTrigger id="section">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Primary (1st-4th), Middle (5th-8th), Secondary (9th-12th)
                  </p>
                </div>

                {/* Standard */}
                <div className="space-y-2">
                  <Label htmlFor="standard">Standard *</Label>
                  <Select
                    value={formData.standard}
                    onValueChange={(value) => setFormData({ ...formData, standard: value })}
                    disabled={!formData.section}
                  >
                    <SelectTrigger id="standard">
                      <SelectValue placeholder={formData.section ? "Select standard" : "Select section first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSection?.standards.map((standard) => (
                        <SelectItem key={standard} value={standard}>
                          {standard} Standard
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Academic Year */}
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year *</Label>
                  <Select
                    value={formData.academicYear}
                    onValueChange={(value) => setFormData({ ...formData, academicYear: value })}
                  >
                    <SelectTrigger id="academicYear">
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      {academicYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preview */}
                {formData.section && formData.standard && formData.academicYear && (
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <Label className="text-sm text-muted-foreground">Batch Preview</Label>
                    <p className="text-lg font-semibold text-primary mt-1">
                      {formData.standard} Standard - {selectedSection?.name} ({formData.academicYear})
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Batch
                  </Button>
                  <Link to="/admin/batches" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminCreateBatch;
