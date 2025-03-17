import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/api";
import { toast } from "react-toastify";
export default function ProtectRoute({ children }) {
  const navigate = useNavigate();
  // Check if user is authenticated and redirect to login if not
  useEffect(() => {
    async function fetch() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const user = await getCurrentUser();
      if (user.status !== 200) {
        toast.error("Please login!")
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    fetch();
  }, [navigate]);

  return children;
}
