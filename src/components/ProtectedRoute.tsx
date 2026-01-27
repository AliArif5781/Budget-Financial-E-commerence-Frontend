import { useAppSelector } from "@/app/hook";
import type { ReactNode } from "react";
import type React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedProps) => {
  const { user, loading } = useAppSelector((state) => state.user);

  console.log(user, "U");

  if (loading.userProfileLoading || loading.logoutLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
