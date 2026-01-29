import { api } from "@/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export const getChartRevenueDataThunk = createAsyncThunk(
  "get/revunuceData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("products/getChartData");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message || "Failed to get chart data";
      return rejectWithValue(message);
    }
  },
);
