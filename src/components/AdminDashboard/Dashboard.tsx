import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { StatData } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getAllUsersAndAdminThunk } from "@/featues/user/user.thunk";
import AllProductsData from "./CardData/AllProductsData";
import AllUsersData from "./CardData/AllUsersData";
import AllRevenueData from "./CardData/AllRevenueData";
import AllAdminData from "./CardData/AllAdminData";
import SalesChart from "../Chart/SaleChart";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  // const { allCount, loading, error } = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(getAllUsersAndAdminThunk());
  // }, [dispatch, allCount]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Welcome to the admin dashboard. You can manage sales, products, and
        reports here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
        <AllRevenueData />
        <AllUsersData />
        <AllAdminData />
        <AllProductsData />
      </div>

      {/* chart */}
      <div className="grid grid-cols-12 py-10">
        <Card className="col-span-8 min-h-65">
          <SalesChart />
        </Card>

        <div>others</div>
      </div>
    </div>
  );
};

export default Dashboard;
