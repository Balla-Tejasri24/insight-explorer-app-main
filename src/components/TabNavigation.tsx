import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "exploration", label: "Data Exploration", disabled: false },
  { id: "enrichment", label: "Enrichment", disabled: false },
  { id: "reports", label: "Reports", disabled: false },
];

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="flex gap-2 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
          className={cn(
            "px-6 py-2.5 rounded-md font-medium text-sm transition-all",
            activeTab === tab.id
              ? "bg-tab-active text-secondary-foreground"
              : "bg-tab-inactive text-foreground hover:bg-muted",
            tab.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;
