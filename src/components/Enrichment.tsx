import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const campaigns = [
  { id: "all", name: "ALL" },
  { id: "camp1", name: "Summer Sale 2024" },
  { id: "camp2", name: "Holiday Promo" },
  { id: "camp3", name: "Brand Awareness Q1" },
  { id: "camp4", name: "Product Launch" },
];

const sources = [
  { id: "all", name: "ALL" },
  { id: "src1", name: "Google Analytics" },
  { id: "src2", name: "Salesforce CRM" },
  { id: "src3", name: "Facebook Ads" },
  { id: "src4", name: "Email Platform" },
];

const statuses = [
  { id: "all", name: "ALL" },
  { id: "active", name: "Active" },
  { id: "in-review", name: "In Review" },
  { id: "in-progress", name: "In Progress" },
  { id: "archived", name: "Archived" },
];

const metadataAvailability: Record<string, { sourceAvailability: number; campaignAvailability: number }> = {
  "camp1-src1": { sourceAvailability: 92, campaignAvailability: 88 },
  "camp1-src2": { sourceAvailability: 78, campaignAvailability: 85 },
  "camp2-src3": { sourceAvailability: 95, campaignAvailability: 91 },
  "camp3-src4": { sourceAvailability: 65, campaignAvailability: 72 },
  "camp4-src1": { sourceAvailability: 88, campaignAvailability: 82 },
  default: { sourceAvailability: 75, campaignAvailability: 70 },
};

const relevancyScores: Record<string, number> = {
  "camp1-src1": 87,
  "camp1-src2": 72,
  "camp2-src3": 91,
  "camp3-src4": 65,
  default: 70,
};

const schedules = [
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
  { id: "manual", name: "Manual" },
];

const sourcePipelineStatus = [
  { source: "Google Analytics", complete: 12, inProgress: 3, failed: 1, queued: 4, inReview: 2 },
  { source: "Salesforce CRM", complete: 8, inProgress: 5, failed: 2, queued: 3, inReview: 1 },
  { source: "Facebook Ads", complete: 15, inProgress: 2, failed: 0, queued: 5, inReview: 3 },
  { source: "Email Platform", complete: 6, inProgress: 4, failed: 1, queued: 2, inReview: 2 },
];

interface Pipeline {
  id: string;
  campaign: string;
  source: string;
  status: "in-progress" | "complete";
  progress: number;
  submittedAt: string;
}

const Enrichment = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [configSource, setConfigSource] = useState<string>("");
  const [configCampaign, setConfigCampaign] = useState<string>("");
  const [configSchedule, setConfigSchedule] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: "1",
      campaign: "Summer Sale 2024",
      source: "Google Analytics",
      status: "complete",
      progress: 100,
      submittedAt: "2024-01-15 10:30",
    },
    {
      id: "2",
      campaign: "Holiday Promo",
      source: "Facebook Ads",
      status: "in-progress",
      progress: 65,
      submittedAt: "2024-01-15 11:45",
    },
  ]);

  const selectionKey = selectedCampaign && selectedSource 
    ? `${selectedCampaign}-${selectedSource}` 
    : "default";
  
  const availability = metadataAvailability[selectionKey] || metadataAvailability.default;
  const currentRelevancyScore = relevancyScores[selectionKey] || relevancyScores.default;
  const threshold = 70;
  const isAboveThreshold = currentRelevancyScore >= threshold;

  const handleSubmitPipeline = () => {
    if (!selectedCampaign || !selectedSource) return;
    
    const campaignName = campaigns.find(c => c.id === selectedCampaign)?.name || "";
    const sourceName = sources.find(s => s.id === selectedSource)?.name || "";
    
    const newPipeline: Pipeline = {
      id: Date.now().toString(),
      campaign: campaignName,
      source: sourceName,
      status: "in-progress",
      progress: 0,
      submittedAt: new Date().toLocaleString(),
    };
    
    setPipelines(prev => [newPipeline, ...prev]);
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setPipelines(prev => 
        prev.map(p => 
          p.id === newPipeline.id 
            ? { ...p, progress, status: progress >= 100 ? "complete" : "in-progress" }
            : p
        )
      );
      if (progress >= 100) clearInterval(interval);
    }, 1000);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Selection Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Select Campaign & Source</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Campaign</label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {campaigns.map(campaign => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Source</label>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {sources.map(source => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {statuses.map(status => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Metadata Availability */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Metadata Availability</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Source Table Level */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Source Table Level</p>
              <div className="relative w-28 h-28 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="hsl(var(--muted))"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke={availability.sourceAvailability >= 80 ? "hsl(var(--chart-2))" : availability.sourceAvailability >= 60 ? "hsl(var(--chart-3))" : "hsl(var(--chart-5))"}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(availability.sourceAvailability / 100) * 301.6} 301.6`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{availability.sourceAvailability}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {sources.find(s => s.id === selectedSource)?.name || "Select a source"}
              </p>
            </div>
          </div>

          {/* Campaign Level */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Campaign Level</p>
              <div className="relative w-28 h-28 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="hsl(var(--muted))"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke={availability.campaignAvailability >= 80 ? "hsl(var(--chart-2))" : availability.campaignAvailability >= 60 ? "hsl(var(--chart-3))" : "hsl(var(--chart-5))"}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(availability.campaignAvailability / 100) * 301.6} 301.6`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{availability.campaignAvailability}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {campaigns.find(c => c.id === selectedCampaign)?.name || "Select a campaign"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Enrichment Configuration</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Source</label>
            <Select value={configSource} onValueChange={setConfigSource}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {sources.map(source => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Campaign</label>
            <Select value={configCampaign} onValueChange={setConfigCampaign}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {campaigns.map(campaign => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Schedule</label>
            <Select value={configSchedule} onValueChange={setConfigSchedule}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {schedules.map(schedule => (
                  <SelectItem key={schedule.id} value={schedule.id}>
                    {schedule.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Campaign Description</label>
            <Textarea
              value={campaignDescription}
              onChange={(e) => setCampaignDescription(e.target.value)}
              placeholder="Describe the campaign..."
              className="bg-background min-h-[80px]"
            />
          </div>
        </CardContent>
        <CardContent className="pt-0">
          <Button 
            onClick={handleSubmitPipeline}
            disabled={!selectedCampaign || !selectedSource}
            className="w-full md:w-auto"
          >
            Submit Enrichment Pipeline
          </Button>
        </CardContent>
      </Card>

      {/* Source Level Pipeline Status Graph */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Source Level Enrichment Pipeline Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourcePipelineStatus} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="source" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <Bar dataKey="complete" name="Complete" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="queued" name="Queued" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="inReview" name="In Review" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" name="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pipeline Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Pipeline Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pipelines.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No pipelines submitted yet</p>
          ) : (
            pipelines.map(pipeline => (
              <div key={pipeline.id} className="p-4 rounded-lg bg-muted/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{pipeline.campaign}</p>
                    <p className="text-sm text-muted-foreground">{pipeline.source}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={pipeline.status === "complete" ? "default" : "secondary"}>
                      {pipeline.status === "complete" ? "Complete" : "In Progress"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{pipeline.submittedAt}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{pipeline.progress}%</span>
                  </div>
                  <Progress value={pipeline.progress} className="h-2" />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Enrichment;
