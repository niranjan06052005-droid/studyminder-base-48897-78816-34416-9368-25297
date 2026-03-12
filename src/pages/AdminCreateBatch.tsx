import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LogOut, Home, ArrowLeft, Calendar, BookOpen, GraduationCap, Plus, Check, ChevronRight } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "sonner";

const EXISTING_YEARS = ["2023-2024", "2024-2025", "2025-2026"];

const SECTIONS = [
  { id: "primary", name: "Primary", icon: "🟢", standards: ["1st", "2nd", "3rd", "4th"] },
  { id: "middle", name: "Middle", icon: "🔵", standards: ["5th", "6th", "7th"] },
  { id: "secondary", name: "Secondary", icon: "🟠", standards: ["8th", "9th", "10th"] },
];

type Step = "year" | "section" | "standard" | "confirm";

const AdminCreateBatch = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("year");
  const [academicYear, setAcademicYear] = useState("");
  const [newYear, setNewYear] = useState("");
  const [isCreatingYear, setIsCreatingYear] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [years, setYears] = useState(EXISTING_YEARS);

  const selectedSection = SECTIONS.find((s) => s.id === sectionId);

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "year", label: "Academic Year", icon: <Calendar className="h-4 w-4" /> },
    { key: "section", label: "Section", icon: <BookOpen className="h-4 w-4" /> },
    { key: "standard", label: "Standard(s)", icon: <GraduationCap className="h-4 w-4" /> },
    { key: "confirm", label: "Confirm", icon: <Check className="h-4 w-4" /> },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  const handleSelectYear = (year: string) => {
    setAcademicYear(year);
    setIsCreatingYear(false);
    setStep("section");
  };

  const handleCreateYear = () => {
    if (!newYear.match(/^\d{4}-\d{4}$/)) {
      toast.error("Enter a valid format like 2026-2027");
      return;
    }
    if (years.includes(newYear)) {
      toast.error("This academic year already exists");
      return;
    }
    setYears((prev) => [...prev, newYear].sort());
    setAcademicYear(newYear);
    setIsCreatingYear(false);
    setNewYear("");
    toast.success(`Academic Year ${newYear} created!`);
    setStep("section");
  };

  const handleSelectSection = (id: string) => {
    setSectionId(id);
    setSelectedStandards([]);
    setStep("standard");
  };

  const toggleStandard = (std: string) => {
    setSelectedStandards((prev) =>
      prev.includes(std) ? prev.filter((s) => s !== std) : [...prev, std]
    );
  };

  const handleSubmit = () => {
    if (selectedStandards.length === 0) return;
    const batchNames = selectedStandards
      .map((s) => `${s} Std - ${selectedSection?.name}`)
      .join(", ");
    toast.success(`Created ${selectedStandards.length} batch(es): ${batchNames} (${academicYear})`);
    navigate("/admin/batches");
  };

  const goBack = () => {
    if (step === "section") { setStep("year"); setSectionId(""); }
    else if (step === "standard") { setStep("section"); setSelectedStandards([]); }
    else if (step === "confirm") setStep("standard");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
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
          <div className="max-w-2xl mx-auto">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      i < stepIndex
                        ? "bg-primary/10 text-primary"
                        : i === stepIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < stepIndex ? <Check className="h-4 w-4" /> : s.icon}
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Academic Year */}
            {step === "year" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Select Academic Year
                  </CardTitle>
                  <CardDescription>Choose an existing year or create a new one</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleSelectYear(year)}
                        className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">{year}</p>
                            {EXISTING_YEARS.includes(year) && (
                              <p className="text-xs text-muted-foreground mt-1">Existing</p>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    {!isCreatingYear ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsCreatingYear(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Academic Year
                      </Button>
                    ) : (
                      <div className="flex gap-3">
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs text-muted-foreground">Format: YYYY-YYYY</Label>
                          <Input
                            placeholder="e.g. 2026-2027"
                            value={newYear}
                            onChange={(e) => setNewYear(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <Button onClick={handleCreateYear} size="sm">Create</Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setIsCreatingYear(false); setNewYear(""); }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Section */}
            {step === "section" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{academicYear}</Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Select Section
                  </CardTitle>
                  <CardDescription>Choose the program section for the batch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSelectSection(section.id)}
                      className="w-full p-5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{section.icon}</span>
                        <div>
                          <p className="font-semibold text-foreground text-lg">{section.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Standards: {section.standards.join(", ")}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                  <Button variant="ghost" onClick={goBack} className="mt-2">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Standards */}
            {step === "standard" && selectedSection && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{academicYear}</Badge>
                    <Badge variant="outline" className="text-xs">{selectedSection.icon} {selectedSection.name}</Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Select Standard(s)
                  </CardTitle>
                  <CardDescription>Select one or more standards to create batches for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSection.standards.map((std) => {
                      const isSelected = selectedStandards.includes(std);
                      return (
                        <button
                          key={std}
                          onClick={() => toggleStandard(std)}
                          className={`p-4 rounded-lg border-2 transition-all text-center ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          <GraduationCap className={`h-6 w-6 mx-auto mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          <p className={`font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {std} Standard
                          </p>
                          {isSelected && (
                            <Badge className="mt-2 bg-primary/20 text-primary text-[10px]">
                              <Check className="h-3 w-3 mr-1" /> Selected
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="ghost" onClick={goBack}>
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={selectedStandards.length === 0}
                      onClick={() => setStep("confirm")}
                    >
                      Continue ({selectedStandards.length} selected)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirm */}
            {step === "confirm" && selectedSection && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Confirm Batch Creation
                  </CardTitle>
                  <CardDescription>Review and confirm the batches to be created</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Academic Year</span>
                      <span className="font-semibold text-foreground">{academicYear}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Section</span>
                      <span className="font-semibold text-foreground">{selectedSection.icon} {selectedSection.name}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground mb-2">Batches to create:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedStandards.map((std) => (
                          <Badge key={std} className="bg-primary/10 text-primary border-primary/30">
                            {std} Standard
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="ghost" onClick={goBack}>
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    <Button className="flex-1" onClick={handleSubmit}>
                      Create {selectedStandards.length} Batch{selectedStandards.length > 1 ? "es" : ""}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminCreateBatch;
