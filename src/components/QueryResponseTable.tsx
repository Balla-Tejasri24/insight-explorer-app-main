import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import type { QueryResponse } from "./DataExploration";

interface QueryResponseTableProps {
  responses: QueryResponse[];
  onClearHistory: () => void;
}

const QueryResponseTable = ({
  responses,
  onClearHistory,
}: QueryResponseTableProps) => {
  if (responses.length === 0) {
    return (
      <div className="mt-8 p-6 text-center text-muted-foreground">
        <p>Submit a query to see responses...</p>
      </div>
    );
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "medium",
    }).format(date);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Response History ({responses.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearHistory}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[300px]">Query</TableHead>
              <TableHead>Response</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-sm">
                  {formatTimestamp(item.timestamp)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "success" ? "default" : "destructive"}
                  >
                    {item.status === "success" ? "Success" : "Error"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate" title={item.query}>
                  {item.query}
                </TableCell>
                <TableCell
                  className={`max-w-[400px] truncate ${
                    item.status === "error" ? "text-destructive" : ""
                  }`}
                  title={item.response}
                >
                  {item.response}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QueryResponseTable;
