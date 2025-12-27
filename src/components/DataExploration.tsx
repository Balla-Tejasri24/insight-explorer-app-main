import { useState } from "react";
import QueryInput from "./QueryInput";
import QueryResponseTable from "./QueryResponseTable";
import { API_CONFIG, apiRequest } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

export interface QueryResponse {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  status: "success" | "error";
}

const DataExploration = () => {
  const [query, setQuery] = useState("");
  const [downloadFormat, setDownloadFormat] = useState("csv");
  const [responses, setResponses] = useState<QueryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      // Call the API endpoint
      const result = await apiRequest<{ response: string }>(
        API_CONFIG.ENDPOINTS.query,
        {
          method: "POST",
          body: JSON.stringify({ query: query.trim() }),
        }
      );

      const newResponse: QueryResponse = {
        id: Date.now().toString(),
        query: query.trim(),
        response: result.response,
        timestamp: new Date(),
        status: "success",
      };

      setResponses((prev) => [newResponse, ...prev]);
      setQuery("");

      toast({
        title: "Query Submitted",
        description: "Your query has been processed successfully.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      const errorResponse: QueryResponse = {
        id: Date.now().toString(),
        query: query.trim(),
        response: errorMessage,
        timestamp: new Date(),
        status: "error",
      };

      setResponses((prev) => [errorResponse, ...prev]);

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleClearHistory = () => {
    setResponses([]);
    toast({
      title: "History Cleared",
      description: "All query responses have been cleared.",
    });
  };

  return (
    <div className="py-6">
      <QueryInput
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        onClear={handleClear}
        downloadFormat={downloadFormat}
        onDownloadFormatChange={setDownloadFormat}
        isLoading={isLoading}
      />
      <QueryResponseTable
        responses={responses}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};

export default DataExploration;
