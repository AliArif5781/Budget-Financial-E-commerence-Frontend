import { useAppSelector } from "@/app/hook";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading.userProfileLoading || loading.logoutLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    if (user.role === "Admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
