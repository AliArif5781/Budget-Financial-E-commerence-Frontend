import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUsersAndAdminThunk } from "@/featues/user/user.thunk";
import React, { useEffect } from "react";

const AllAdminData = () => {
  const dispatch = useAppDispatch();
  const { allCount, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsersAndAdminThunk());
  }, [dispatch]);
  return (
    <div>
      <Card key={allCount.totalUsers} className="max-w-xs rounded-lg">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm">Total Admin</CardTitle>

          {/* <div
              className={`flex items-center gap-1 rounded-full px-2 py-1 font-semibold text-xs ${
                stat.growthPositive
                  ? "text-green-400 bg-muted dark:bg-black border"
                  : "dark:text-red-400 bg-red-500 dark:bg-red-900 border border-red-700"
              }`}
            >
              {stat.growthPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {stat.growth}
            </div> */}
        </CardHeader>

        <CardContent className="pt-0">
          <div className="text-3xl font-extrabold">
            {loading.totalAdminLoading ? (
              <div className="text-sm font-normal">Loading....</div>
            ) : (
              <>{allCount.totalAdmins}</>
            )}
          </div>

          <div className="mt-4 space-y-1">
            <p className="font-semibold">Total Admin </p>
            <p className="text-sm text-muted-foreground">Total Admin Count</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllAdminData;
