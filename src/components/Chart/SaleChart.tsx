import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getChartRevenueDataThunk } from "@/featues/chart/chart.thunk";
import type { ChartDataFormatted } from "@/types/types";
import { useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

export default function SalesChart() {
  const dispatch = useAppDispatch();
  const { getChart, loading, error } = useAppSelector((state) => state.chart);

  useEffect(() => {
    dispatch(getChartRevenueDataThunk());
  }, []);

  const formattedData = getChart.reduce((acc, item) => {
    const date = item.createdAt.slice(0, 10);
    const total = Number(item.total);

    const found = acc.find((x) => x.createdAt === date);

    if (found) {
      found.total += total;
    } else {
      acc.push({ createdAt: date, total });
    }

    return acc;
  }, [] as ChartDataFormatted[]);

  return (
    <div className="w-full h-full rounded-md p-2 relative">
      {loading.getChartLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70">
          <Skeleton className="h-full w-full rounded-md animate-pulse" />
        </div>
      )}

      {error.getChartError && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-red-500">
          {error.getChartError}
        </div>
      )}

      {!loading.getChartLoading && !error.getChartError && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" className="" />
            <YAxis />
            <Tooltip />
            <Line type="bump" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
