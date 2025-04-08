import { useEffect, useState } from "react";
import { File, CheckCircle, XCircle } from "lucide-react";

const CompanyListUploader = ({ onFileSelect, resetSignal }) => {
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    // Clear the icon when the parent signals a reset
    setStatus(null);
  }, [resetSignal]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        let text = event.target.result;
        let names = [];

        if (extension === "txt" || extension === "csv") {
          names = text
            .split(/[\n,]+/)
            .map((name) => name.trim().toLowerCase())
            .filter(Boolean);
        } else if (extension === "json") {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            names = parsed
              .map((n) => n.trim().toLowerCase())
              .filter(Boolean);
          } else if (typeof parsed === "object") {
            names = Object.values(parsed)
              .map((n) => String(n).trim().toLowerCase())
              .filter(Boolean);
          } else {
            throw new Error("Invalid JSON");
          }
        } else {
          throw new Error("Unsupported file type");
        }

        if (!names.length) {
          throw new Error("Empty list");
        }

        setStatus("success");
        onFileSelect({ names, file });
      } catch (err) {
        console.error("File parse error:", err);
        setStatus("error");
        onFileSelect({ names: [], file });
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="relative">
        <label
        htmlFor="file-upload"
        className="inline-flex items-center justify-center gap-2 px-4 h-10 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto cursor-pointer"
        >
        <File className="w-4 h-4" />
        <span className="sr-only">Upload Company List</span>
        <input
          id="file-upload"
          type="file"
          accept=".txt,.csv,.json"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {status === "success" && (
        <CheckCircle className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 text-green-500" />
      )}
      {status === "error" && (
        <XCircle className="absolute top-0 right-0 -mt-2 -mr-2 w-4 h-4 text-red-500" />
      )}
    </div>
  );
};

export default CompanyListUploader;
