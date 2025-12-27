import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QueryInputProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  downloadFormat: string;
  onDownloadFormatChange: (value: string) => void;
  isLoading?: boolean;
}

const QueryInput = ({
  query,
  onQueryChange,
  onSubmit,
  onClear,
  downloadFormat,
  onDownloadFormatChange,
  isLoading = false,
}: QueryInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <Textarea
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your query here..."
        className="min-h-[120px] resize-y border-border bg-background"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button 
            onClick={onSubmit} 
            disabled={isLoading || !query.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? "Processing..." : "Submit"}
          </Button>
          <Button 
            onClick={onClear} 
            variant="secondary"
            className="bg-secondary hover:bg-secondary/90"
          >
            Clear
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Select Download Format:</span>
          <Select value={downloadFormat} onValueChange={onDownloadFormatChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default QueryInput;
