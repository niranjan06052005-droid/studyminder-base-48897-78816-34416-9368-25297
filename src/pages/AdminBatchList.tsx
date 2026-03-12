import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Home, Plus, Users, UserCheck, TrendingUp, ChevronDown, ChevronRight, Calendar, GraduationCap } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface Batch {
  id: string;
  standard: string;
  section: string;
  students: number;
  teachers: number;
  attendance: number;
}

interface ProgramSection {
  name: string;
  label: string;
  icon: string;
  batches: Batch[];
}

interface AcademicYear {
  year: string;
  isActive: boolean;
  programs: ProgramSection[];
}

const buildPrograms = (yearPrefix: string, offset: number): ProgramSection[] => [
  {
    name: "primary",
    label: "Primary",
    icon: "🟢",
    batches: [
      { id: `${yearPrefix}-1a`, standard: "1st Standard", section: "A", students: 35 - offset, teachers: 3, attendance: 94 - offset },
      { id: `${yearPrefix}-2a`, standard: "2nd Standard", section: "A", students: 38 - offset, teachers: 3, attendance: 92 - offset },
      { id: `${yearPrefix}-3a`, standard: "3rd Standard", section: "A", students: 40 - offset, teachers: 4, attendance: 91 - offset },
      { id: `${yearPrefix}-4a`, standard: "4th Standard", section: "A", students: 36 - offset, teachers: 4, attendance: 93 - offset },
    ],
  },
  {
    name: "middle",
    label: "Middle",
    icon: "🔵",
    batches: [
      { id: `${yearPrefix}-5a`, standard: "5th Standard", section: "A", students: 42 - offset, teachers: 4, attendance: 90 - offset },
      { id: `${yearPrefix}-6a`, standard: "6th Standard", section: "A", students: 39 - offset, teachers: 5, attendance: 89 - offset },
      { id: `${yearPrefix}-7a`, standard: "7th Standard", section: "A", students: 41 - offset, teachers: 5, attendance: 91 - offset },
    ],
  },
  {
    name: "secondary",
    label: "Secondary",
    icon: "🟠",
    batches: [
      { id: `${yearPrefix}-8a`, standard: "8th Standard", section: "A", students: 37 - offset, teachers: 5, attendance: 88 - offset },
      { id: `${yearPrefix}-9a`, standard: "9th Standard", section: "A", students: 44 - offset, teachers: 6, attendance: 92 - offset },
      { id: `${yearPrefix}-10a`, standard: "10th Standard", section: "A", students: 46 - offset, teachers: 6, attendance: 95 - offset },
    ],
  },
];

const AdminBatchList = () => {
  const academicYears: AcademicYear[] = [
    { year: "2025-2026", isActive: true, programs: buildPrograms("25", 0) },
    { year: "2024-2025", isActive: false, programs: buildPrograms("24", 2) },
    { year: "2023-2024", isActive: false, programs: buildPrograms("23", 5) },
  ];

  const [expandedYears, setExpandedYears] = useState<string[]>(["2025-2026"]);

  const toggleYear = (year: string) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const getTotalStudents = (batches: Batch[]) => batches.reduce((sum, b) => sum + b.students, 0);
  const getTotalTeachers = (batches: Batch[]) => {
    const unique = new Set(batches.flatMap((b) => Array.from({ length: b.teachers }, (_, i) => `${b.id}-${i}`)));
    return batches.reduce((sum, b) => sum + b.teachers, 0);
  };
  const getAvgAttendance = (batches: Batch[]) =>
    Math.round(batches.reduce((sum, b) => sum + b.attendance, 0) / batches.length);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
          <div className="px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Batch Management</h1>
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
          {/* Page Header */}
          <div className="mb-8 flex justify-between items-center animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">All Batches</h2>
              <p className="text-muted-foreground">Manage and monitor batches grouped by academic year & program</p>
            </div>
            <Link to="/admin/batches/create">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New Batch
              </Button>
            </Link>
          </div>

          {/* Academic Year Groups */}
          <div className="space-y-6">
            {academicYears.map((academicYear) => {
              const isExpanded = expandedYears.includes(academicYear.year);
              const allBatches = academicYear.programs.flatMap((p) => p.batches);
              const totalStudents = getTotalStudents(allBatches);
              const avgAttendance = getAvgAttendance(allBatches);

              return (
                <div key={academicYear.year} className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                  {/* Year Header */}
                  <button
                    onClick={() => toggleYear(academicYear.year)}
                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-foreground">
                            Academic Year {academicYear.year}
                          </h3>
                          {academicYear.isActive && (
                            <Badge className="bg-success/15 text-success border-success/30 text-xs font-medium">
                              Current Year
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {allBatches.length} batches · {totalStudents} students · {avgAttendance}% avg attendance
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex items-center gap-5 mr-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">{totalStudents}</span>
                          <span>Students</span>
                        </div>
                        <div className="h-4 w-px bg-border" />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendingUp className="h-4 w-4 text-success" />
                          <span className="font-semibold text-foreground">{avgAttendance}%</span>
                          <span>Attendance</span>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded: Program Sections */}
                  {isExpanded && (
                    <div className="border-t border-border/50 bg-muted/10">
                      {academicYear.programs.map((program) => {
                        const programStudents = getTotalStudents(program.batches);
                        const programAttendance = getAvgAttendance(program.batches);

                        return (
                          <div key={program.name} className="border-b border-border/30 last:border-b-0">
                            {/* Program Header */}
                            <div className="px-6 py-3 flex items-center gap-3 bg-muted/30">
                              <span className="text-lg">{program.icon}</span>
                              <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                                {program.label} Section
                              </h4>
                              <Badge variant="outline" className="text-[10px] ml-1">
                                {program.batches.length} batches · {programStudents} students · {programAttendance}% att.
                              </Badge>
                            </div>

                            {/* Batch Cards Grid */}
                            <div className="px-6 pb-5 pt-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {program.batches.map((batch) => (
                                  <Card
                                    key={batch.id}
                                    className="group hover:shadow-md hover:border-primary/30 transition-all duration-200 bg-card"
                                  >
                                    <CardHeader className="pb-2 pt-4 px-4">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                          <GraduationCap className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <CardTitle className="text-sm font-bold truncate">{batch.standard}</CardTitle>
                                          <CardDescription className="text-[11px]">Section {batch.section}</CardDescription>
                                        </div>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-4 space-y-3">
                                      <div className="grid grid-cols-3 gap-1.5">
                                        <div className="text-center p-1.5 bg-primary/5 rounded-md">
                                          <div className="text-base font-bold text-primary">{batch.students}</div>
                                          <div className="text-[9px] text-muted-foreground">Students</div>
                                        </div>
                                        <div className="text-center p-1.5 bg-secondary/10 rounded-md">
                                          <div className="text-base font-bold text-secondary">{batch.teachers}</div>
                                          <div className="text-[9px] text-muted-foreground">Teachers</div>
                                        </div>
                                        <div className="text-center p-1.5 bg-success/10 rounded-md">
                                          <div className="text-base font-bold text-success">{batch.attendance}%</div>
                                          <div className="text-[9px] text-muted-foreground">Attend.</div>
                                        </div>
                                      </div>
                                      <Link to={`/admin/batches/${batch.id}`} className="block">
                                        <Button
                                          className="w-full text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                          variant="outline"
                                          size="sm"
                                        >
                                          View Details
                                        </Button>
                                      </Link>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBatchList;
