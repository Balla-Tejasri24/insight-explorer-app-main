import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data Sources & Attributes
const dataSourcesData = [
  { name: "CRM Database", attributes: 45 },
  { name: "Web Analytics", attributes: 32 },
  { name: "Email Platform", attributes: 28 },
  { name: "Social Media", attributes: 21 },
  { name: "Ad Platforms", attributes: 38 },
  { name: "CDP", attributes: 52 },
];

// Active Campaigns
const activeCampaignsData = [
  { name: "Summer Sale 2024", value: 35 },
  { name: "Brand Awareness", value: 25 },
  { name: "Product Launch", value: 20 },
  { name: "Retargeting", value: 20 },
];

// Metadata Presence Report
const metadataPresenceData = [
  { campaign: "Summer Sale", available: 85, unavailable: 15, contextualScore: 92 },
  { campaign: "Brand Awareness", available: 72, unavailable: 28, contextualScore: 78 },
  { campaign: "Product Launch", available: 90, unavailable: 10, contextualScore: 95 },
  { campaign: "Retargeting", available: 65, unavailable: 35, contextualScore: 68 },
  { campaign: "Email Nurture", available: 78, unavailable: 22, contextualScore: 82 },
];

const COLORS = ["hsl(348, 70%, 35%)", "hsl(210, 100%, 45%)", "hsl(220, 15%, 20%)", "hsl(220, 10%, 50%)"];

const Reports = () => {
  return (
    <div className="py-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Data Discovery Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Sources & Attributes Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data Sources & Number of Attributes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataSourcesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" angle={-20} textAnchor="end" height={60} />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="attributes" fill="hsl(210, 100%, 45%)" radius={[4, 4, 0, 0]} name="Attributes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Active Campaigns Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activeCampaignsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {activeCampaignsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Metadata Presence Report - Stacked Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Metadata Presence Report (Availability vs Unavailable)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metadataPresenceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" domain={[0, 100]} unit="%" className="text-xs" />
                <YAxis dataKey="campaign" type="category" className="text-xs" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                  formatter={(value, name) => [`${value}%`, name]}
                />
                <Legend />
                <Bar dataKey="available" stackId="a" fill="hsl(142, 70%, 40%)" name="Available" radius={[0, 0, 0, 0]} />
                <Bar dataKey="unavailable" stackId="a" fill="hsl(348, 70%, 35%)" name="Unavailable" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contextual Score per Campaign */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Contextual Score by Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={metadataPresenceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="campaign" className="text-xs" />
                <YAxis domain={[0, 100]} className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="contextualScore" 
                  stroke="hsl(210, 100%, 45%)" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(210, 100%, 45%)", r: 6 }}
                  name="Contextual Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
