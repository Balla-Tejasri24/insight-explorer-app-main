import { useState } from "react";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import DataExploration from "@/components/DataExploration";
import Enrichment from "@/components/Enrichment";
import Reports from "@/components/Reports";

const Index = () => {
  const [activeTab, setActiveTab] = useState("exploration");

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main>
          {activeTab === "exploration" && <DataExploration />}
          {activeTab === "enrichment" && <Enrichment />}
          {activeTab === "reports" && <Reports />}
        </main>
      </div>
    </div>
  );
};

export default Index;
