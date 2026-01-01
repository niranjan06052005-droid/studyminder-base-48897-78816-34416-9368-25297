import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherClassList from "./pages/TeacherClassList";
import TeacherBatchView from "./pages/TeacherBatchView";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherTestResults from "./pages/TeacherTestResults";
import TeacherNotices from "./pages/TeacherNotices";
import TeacherSchedule from "./pages/TeacherSchedule";
import TeacherProgress from "./pages/TeacherProgress";
import TeacherAnalytics from "./pages/TeacherAnalytics";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudentManagement from "./pages/AdminStudentManagement";
import AdminAddStudent from "./pages/AdminAddStudent";
import AdminStudentView from "./pages/AdminStudentView";
import AdminStaffManagement from "./pages/AdminStaffManagement";
import AdminAddStaff from "./pages/AdminAddStaff";
import AdminStaffView from "./pages/AdminStaffView";
import AdminFeeManagement from "./pages/AdminFeeManagement";
import AdminBatchList from "./pages/AdminBatchList";
import AdminBatchDetails from "./pages/AdminBatchDetails";
import AdminCreateBatch from "./pages/AdminCreateBatch";
import AdminAssignTeacher from "./pages/AdminAssignTeacher";
import AdminNoticeManagement from "./pages/AdminNoticeManagement";
import AdminNoticeView from "./pages/AdminNoticeView";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminEditTimetable from "./pages/AdminEditTimetable";
import TeacherNoticeView from "./pages/TeacherNoticeView";
import TeacherChapterNotes from "./pages/TeacherChapterNotes";
import TeacherChapterVideo from "./pages/TeacherChapterVideo";
import SubjectPage from "./pages/SubjectPage";
import ChapterNotes from "./pages/ChapterNotes";
import ChapterVideo from "./pages/ChapterVideo";
import StudentReport from "./pages/StudentReport";
import StudentAttendance from "./pages/StudentAttendance";
import StudentLeaderboard from "./pages/StudentLeaderboard";
import StudentFees from "./pages/StudentFees";
import StudentNotices from "./pages/StudentNotices";
import StudentNoticeDetail from "./pages/StudentNoticeDetail";
import StudentSubjectNoticeDetail from "./pages/StudentSubjectNoticeDetail";
import PrimaryProgram from "./pages/PrimaryProgram";
import BatchDetails from "./pages/BatchDetails";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/programs/primary" element={<PrimaryProgram />} />
          <Route path="/programs/primary/batch/:standard" element={<BatchDetails />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/report" element={<StudentReport />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/leaderboard" element={<StudentLeaderboard />} />
          <Route path="/student/fees" element={<StudentFees />} />
          <Route path="/student/notices" element={<StudentNotices />} />
          <Route path="/student/notice/:noticeId" element={<StudentNoticeDetail />} />
          <Route path="/student/subject-notice/:noticeId" element={<StudentSubjectNoticeDetail />} />
          <Route path="/student/subject/:subject" element={<SubjectPage />} />
          <Route path="/student/subject/:subject/notes/:noteId" element={<ChapterNotes />} />
          <Route path="/student/subject/:subject/video/:videoId" element={<ChapterVideo />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
          <Route path="/teacher/classes" element={<TeacherClassList />} />
          <Route path="/teacher/class/:classId" element={<TeacherBatchView />} />
          <Route path="/teacher/class/:classId/notes/:noteId" element={<TeacherChapterNotes />} />
          <Route path="/teacher/class/:classId/video/:videoId" element={<TeacherChapterVideo />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/test-results" element={<TeacherTestResults />} />
          <Route path="/teacher/notices" element={<TeacherNotices />} />
          <Route path="/teacher/notices/:noticeId" element={<TeacherNoticeView />} />
          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/progress" element={<TeacherProgress />} />
          <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudentManagement />} />
          <Route path="/admin/students/add" element={<AdminAddStudent />} />
          <Route path="/admin/students/:studentId" element={<AdminStudentView />} />
          <Route path="/admin/staff" element={<AdminStaffManagement />} />
          <Route path="/admin/staff/add" element={<AdminAddStaff />} />
          <Route path="/admin/staff/:staffId" element={<AdminStaffView />} />
          <Route path="/admin/batches" element={<AdminBatchList />} />
          <Route path="/admin/batches/create" element={<AdminCreateBatch />} />
          <Route path="/admin/batches/:batchId" element={<AdminBatchDetails />} />
          <Route path="/admin/batches/:batchId/assign-teacher" element={<AdminAssignTeacher />} />
          <Route path="/admin/batches/:batchId/edit-timetable" element={<AdminEditTimetable />} />
          <Route path="/admin/notices" element={<AdminNoticeManagement />} />
          <Route path="/admin/notices/:noticeId" element={<AdminNoticeView />} />
          <Route path="/admin/fees" element={<AdminFeeManagement />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
