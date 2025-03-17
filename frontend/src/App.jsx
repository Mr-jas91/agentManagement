import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import UploadList from "./pages/UploadList";
import ProtectRoute from "./components/ProtectRoute";
import Sidebar from "./components/Sidebar";

// Layout Component with Sidebar
function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="flex">
      {isAuthenticated && <Sidebar />}
      <div className={isAuthenticated ? "flex-1 p-4 ml-64" : "flex-1 p-4"}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/agents"
          element={
            <ProtectRoute>
              <Layout>
                <Agents />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectRoute>
              <Layout>
                <UploadList />
              </Layout>
            </ProtectRoute>
          }
        />
        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
