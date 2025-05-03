import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditProfilePage from "./pages/EditProfilePage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Header from "./components/Header"; // Optional
import HomePage from "./pages/HomePage"; // Fixed import name to match usage
import AdminCreateQuestPage from "./pages/AdminCreateQuestPage";
import PhotoQuestPage from "./pages/PhotoQuestPage";
import MySubmissionsPage from "./pages/MySubmissionsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* ✅ Landing route – optional welcome or redirect */}
        <Route path="/" element={<HomePage />} />

        {/* ✅ OAuth callback handler (MUST include uid param from backend) */}
        <Route path="/oauth-callback" element={<OAuthCallbackPage />} />

        {/* ✅ Dashboards */}
        <Route path="/user/dashboard" element={<UserDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* ✅ User features */}
        <Route path="/edit-profile" element={<EditProfilePage />} />

        {/* ✅ Catch all (optional 404) */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin/photoquests/create" element={<AdminCreateQuestPage />} />
        <Route path="/photoquests" element={<PhotoQuestPage />} />
        <Route path="/my-submissions" element={<MySubmissionsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;