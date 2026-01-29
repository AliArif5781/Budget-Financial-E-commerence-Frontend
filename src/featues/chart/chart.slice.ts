import { createSlice } from "@reduxjs/toolkit";
import { getChartRevenueDataThunk } from "./chart.thunk";
import type { ChartDataRaw } from "@/types/types";

interface chartState {
  getChart: ChartDataRaw[];
  loading: {
    getChartLoading: boolean;
  };
  error: {
    getChartError: string | null;
  };
}

const initialState: chartState = {
  getChart: [],
  loading: {
    getChartLoading: false,
  },
  error: {
    getChartError: null,
  },
};

const ChartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get chart revenue data
      .addCase(getChartRevenueDataThunk.pending, (state) => {
        state.loading.getChartLoading = true;
        state.error.getChartError = null;
      })
      .addCase(getChartRevenueDataThunk.fulfilled, (state, action) => {
        state.loading.getChartLoading = false;
        state.getChart = action.payload;
        state.error.getChartError = null;
      })
      .addCase(getChartRevenueDataThunk.rejected, (state, action) => {
        state.loading.getChartLoading = false;
        state.error.getChartError =
          (action.payload as string) || "Failed to get chart data";
      });
  },
});

export const {} = ChartSlice.actions;

export default ChartSlice.reducer;
