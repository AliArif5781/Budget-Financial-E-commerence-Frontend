import React, { useState } from "react";
import { Card } from "../ui/card";
import SidebarHeader from "./SidebarHeader";
import {
  PanelLeft,
  Home,
  BarChart,
  User,
  ClipboardPlusIcon,
  ClipboardPlus,
  Package,
  Folder,
  ClipboardClock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "Products",
      path: "/productsSection",
      icon: <Package className="h-4 w-4" />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <ClipboardPlus className="h-4 w-4" />,
    },
    {
      name: "create-products",
      path: "/create-product",
      icon: <Folder className="h-4 w-4" />,
    },
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4" /> },
    {
      name: "Invoice",
      path: "/getAllInvoice",
      icon: <ClipboardClock className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {isOpen ? (
        <Card className="min-h-screen w-62.5 duration-300 ease-in-out">
          <SidebarHeader toogleSidebar={toggleSidebar} />

          <div className="flex flex-col mt-4 px-0.5">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted text-sm ${
                  location.pathname === item.path
                    ? "bg-sidebar-accent font-semibold"
                    : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </Card>
      ) : (
        <button
          onClick={toggleSidebar}
          className="fixed top-18 px-2 rounded-md shadow-md z-50"
        >
          <PanelLeft className="h-4 w-4 hover:cursor-pointer hover:shadow-md hover:text-muted-foreground" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
