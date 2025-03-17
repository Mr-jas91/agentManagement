import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

// Add a request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Login API
export const loginAdmin = async (email, password) => {
  return await api.post("/auth/login", { email, password });
};

// current user
export const getCurrentUser = async () => {
  return await api.get("/auth/me");
};
// Fetch all agents
export const getAgents = async () => {
  return await api.get("/agents/all");
};

// Create new agent
export const addAgent = async (agentData) => {
  return await api.post("/agents/add", agentData);
};

// Upload CSV file
export const uploadCSV = async (file) => {
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);

  return await api.post("/lists/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// Get assigned lists for an agent
export const agentLists = async (id) => {
  return await api.get(`/lists/agent/${id}`);
};

// Get tasks for Admin that are assigned to agents
export const allLists = async () => {
  return await api.get("/admin/tasks");
};

export default api;
