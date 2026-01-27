import { createSlice } from "@reduxjs/toolkit";
import {
  getAllReportThunk,
  getReportThunk,
  sendReportThunk,
  solveReportThunk,
} from "./report.thunk";
import type { getReport } from "@/types/types";

interface reportState {
  report: string;
  geReportUser: getReport[];
  getAllReportUsers: getReport[];
  loading: {
    reportLoading: boolean;
    getReportLoading: boolean;
    getAllReportLoading: boolean;
  };
  error: {
    reportError: string | null;
    getReportError: string | null;
    getAllReportError: string | null;
  };
}
//  Bhai Inam ul haq
const initialState: reportState = {
  report: "",
  geReportUser: [],
  getAllReportUsers: [],
  loading: {
    reportLoading: false,
    getReportLoading: false,
    getAllReportLoading: false,
  },
  error: {
    reportError: null,
    getReportError: null,
    getAllReportError: null,
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // send report
      .addCase(sendReportThunk.pending, (state) => {
        state.loading.reportLoading = true;
        state.error.reportError = null;
      })
      .addCase(sendReportThunk.fulfilled, (state, action) => {
        state.loading.reportLoading = false;
        state.report = action.payload;
        state.error.reportError = null;
      })
      .addCase(sendReportThunk.rejected, (state, action) => {
        state.loading.reportLoading = false;
        state.error.reportError =
          (action.payload as string) || "Failed to save reports";
      })

      // get report
      .addCase(getReportThunk.pending, (state) => {
        state.loading.getReportLoading = true;
        state.error.getReportError = null;
      })
      .addCase(getReportThunk.fulfilled, (state, action) => {
        state.loading.getReportLoading = false;
        state.geReportUser = action.payload;
        state.error.getReportError = null;
      })
      .addCase(getReportThunk.rejected, (state, action) => {
        state.loading.getReportLoading = false;
        state.error.getReportError =
          (action.payload as string) || "Failed to get reports";
      })

      // get all report of user admin
      .addCase(getAllReportThunk.pending, (state) => {
        state.loading.getAllReportLoading = true;
        state.error.getAllReportError = null;
      })
      .addCase(getAllReportThunk.fulfilled, (state, action) => {
        state.loading.getAllReportLoading = false;
        state.getAllReportUsers = action.payload;
        state.error.getAllReportError = null;
      })
      .addCase(getAllReportThunk.rejected, (state, action) => {
        state.loading.getAllReportLoading = false;
        state.error.getAllReportError =
          (action.payload as string) || "Failed to get All Users report";
      })

      // reoprt solveed slice

      .addCase(solveReportThunk.pending, (state) => {
        state.loading.getAllReportLoading = true;
        state.error.getAllReportError = null;
      })
      .addCase(solveReportThunk.fulfilled, (state, action) => {
        state.loading.getAllReportLoading = false;
        state.getAllReportUsers = state.getAllReportUsers.filter(
          (report) => report._id !== action.payload,
        );
        state.error.getAllReportError = null;
      })
      .addCase(solveReportThunk.rejected, (state, action) => {
        state.loading.getAllReportLoading = false;
        state.error.getAllReportError =
          (action.payload as string) || "Failed to get All Users report";
      });
  },
});

export const {} = reportSlice.actions;
export default reportSlice.reducer;
