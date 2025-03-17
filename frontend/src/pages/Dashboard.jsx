import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { allLists } from "../services/api";

export default function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgentTasks();
  }, []);
  // fetch agent with their tasks
  const fetchAgentTasks = async () => {
    try {
      const response = await allLists();
      setAgents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <Card className="w-full max-w-4xl shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-600">Loading tasks...</p>
          ) : agents.length === 0 ? (
            <p className="text-center text-gray-500">No tasks assigned.</p>
          ) : (
            agents.map((agent) => (
              <div key={agent._id} className="mb-8">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  {agent?.agentId?.name} ({agent?.agentId?.email})
                </h2>
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="w-full border-collapse">
                    {/* Table Head */}
                    <thead className="sticky top-0 bg-white shadow-md border-b">
                      <tr>
                        <th className="p-3 text-left font-semibold">Name</th>
                        <th className="p-3 text-left font-semibold">Mobile</th>
                        <th className="p-3 text-left font-semibold">Notes</th>
                      </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                      {agent?.items?.map((item) => (
                        <tr
                          key={item._id}
                          className="hover:bg-gray-50 border-b"
                        >
                          <td className="p-3">{item?.firstName}</td>
                          <td className="p-3">{item?.phone}</td>
                          <td className="p-3">{item?.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
