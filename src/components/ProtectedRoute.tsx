import { useAppSelector } from "@/app/hook";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedProps) => {
  const { user, loading } = useAppSelector((state) => state.user);

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
