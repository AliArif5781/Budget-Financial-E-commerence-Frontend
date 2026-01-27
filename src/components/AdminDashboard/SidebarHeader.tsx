import React from "react";
import { PanelRight } from "lucide-react";

interface SidebarHeaderProps {
  toogleSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ toogleSidebar }) => {
  return (
    <div className="flex justify-between items-center px-3 py-2 border-b">
      <h1 className="text-xl font-semibold">Financial</h1>
      <PanelRight
        className="h-4 w-4 hover:cursor-pointer hover:shadow-md hover:text-muted-foreground"
        onClick={toogleSidebar}
      />
    </div>
  );
};

export default SidebarHeader;
