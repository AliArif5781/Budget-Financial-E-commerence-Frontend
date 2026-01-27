import { api } from "@/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const sendReportThunk = createAsyncThunk(
  "users/report",
  async (message: string, { rejectWithValue }) => {
    try {
      const response = await api.post("/report/saveUserReport", {
        message,
      });
      toast.success("Report send Successfully", {
        duration: 2000,
        position: "top-center",
      });
      console.log(response.data, "sendReportThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to send report. Try Again";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getReportThunk = createAsyncThunk(
  "users/getReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/report/getUserReport");
      console.log(response.data, "getReportThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message || "Failed to fetch report";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

// show all report of user facing issue in application (admin side)
export const getAllReportThunk = createAsyncThunk(
  "users/getAllUsersReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/report/allReport");
      console.log(response.data, "getAllReportThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message || "Failed to fetch report";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const solveReportThunk = createAsyncThunk(
  "users/getAllSolvedReport",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.patch(`/report/${id}`, { solved: true });
      toast.success("Report resolved.");
      return id;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to solved report. Try Again..";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
