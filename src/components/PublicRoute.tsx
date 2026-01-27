import { useAppSelector } from "@/app/hook";
import React, { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  //   if (loading.userProfileLoading || loading.logoutLoading) {
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         Loading...
  //       </div>
  //     );
  //   }

  if (user?.role === "Admin") {
    return <Navigate to={"/dashboard"} replace />;
  } else {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoute;
