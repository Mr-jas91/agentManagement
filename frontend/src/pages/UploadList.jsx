import { useState } from "react";
import { uploadCSV } from "../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";

export default function UploadList() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Please select a file!");
      return;
    }

    setLoading(true);
    try {
      await uploadCSV(file);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("File upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            accept=".csv,.xlsx,.axls"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            onClick={handleFileUpload}
            className="mt-4 w-full bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
