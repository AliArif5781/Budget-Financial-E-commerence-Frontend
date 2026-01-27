import React from "react";
import Sidebar from "./components/AdminDashboard/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header /> {/* Header with logout/avatar */}
        <main className="flex-1 p-6">
          {/* Render admin child pages */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
