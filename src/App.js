import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRegister from "./components/Admin/AdminRegister";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminProfile from "./components/Admin/AdminProfile";
import ChangePassword from "./components/Admin/ChangePassword";
import EditProfilePicture from "./components/Admin/EditProfilePicture";
import ForgotPassword from "./components/Admin/ForgotPassword";
import StudentList from "./components/Student/StudentList";
import StudentAdd from "./components/Student/StudentAdd.js";
import StudentDetail from "./components/Student/StudentDetails";
import StudentEdit from "./components/Student/StudentEdit";
import AdminDashboard from "./components/Admin/AdminDashboard.js";
import DashboardLayout from "./components/Layout/DashboardLayout";
function App() {
  return (
    <Router>
      <DashboardLayout />
      <Routes>
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/edit-profile-picture" element={<EditProfilePicture />} />
        <Route path="/student/" element={<StudentList />} />
        <Route path="/student/add-student" element={<StudentAdd />} />
        <Route path="/student/edit-student/:id" element={<StudentEdit />} />
        <Route path="/student/student/:id" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
