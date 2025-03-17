import { useState, useEffect, useCallback } from "react";
import { getAgents, addAgent } from "../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  // Fetch agents from API
  const loadAgents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAgents();
      setAgents(response.data);
    } catch (error) {
      toast.error("Failed to load agents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new agent
  const handleAddAgent = async () => {
    if (!newAgent.name || !newAgent.email || !newAgent.mobile || !newAgent.password) {
      toast.warning("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const agentData = {
        ...newAgent,
        mobile: `${newAgent.countryCode} ${newAgent.mobile}` 
      };
      await addAgent(agentData);
      toast.success("Agent added successfully!");
      loadAgents();
      setNewAgent({ name: "", email: "", mobile: "", countryCode: "+91", password: "" });
    } catch (error) {
      toast.error("Failed to add agent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Agent Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <Input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={newAgent.name}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={newAgent.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Mobile</label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  name="countryCode"
                  placeholder="+91"
                  value={newAgent.countryCode}
                  onChange={handleChange}
                  className="w-1/3"
                />
                <Input
                  type="text"
                  name="mobile"
                  placeholder="Enter Mobile"
                  value={newAgent.mobile}
                  onChange={handleChange}
                  className="w-2/3"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={newAgent.password}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Add Agent Button */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleAddAgent}
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Add Agent"}
            </Button>
          </div>

          {/* Loading Indicator */}
          {loading && <p className="text-center mt-2 text-gray-600">Loading agents...</p>}

          {/* Agent List Table */}
          <div className="mt-4 overflow-x-auto">
            <div className="border rounded-lg shadow-md overflow-hidden">
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-white shadow-md border-b">
                    <tr>
                      <th className="p-3 text-left font-semibold">Name</th>
                      <th className="p-3 text-left font-semibold">Email</th>
                      <th className="p-3 text-left font-semibold">Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.length > 0 ? (
                      agents.map((agent) => (
                        <tr key={agent._id} className="hover:bg-gray-50 border-b">
                          <td className="p-3">{agent.name}</td>
                          <td className="p-3">{agent.email}</td>
                          <td className="p-3">{agent.mobile}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center text-gray-500 py-4">
                          No agents found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
