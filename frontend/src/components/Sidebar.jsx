import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function Sidebar() {
  const navigate = useNavigate();
  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5 fixed top-0 left-0 overflow-hidden">
      <h2 className="text-lg font-bold mb-5">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="block py-2 px-4 bg-gray-800 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/agents" className="block py-2 px-4 bg-gray-800 rounded">
              Manage Agents
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/upload"
              className="block py-2 px-4 bg-gray-800 rounded"
            >
              Upload List
            </Link>
          </li>
          <li className="mb-2">
            <Button
              onClick={handleLogout}
              className="block py-2 px-4 bg-gray-800 rounded"
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
