import { api } from "@/axios/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { AiProduct } from "./ai.slice";

export const AiProductThunk = createAsyncThunk(
  "ai/product",
  async (data: AiProduct, { rejectWithValue }) => {
    try {
      const response = await api.post(`ai/generate-product`, data);
      console.log(response.data, "get-product-by- id");
      return response.data;
      //   console.log(data, "data");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Failed To Generate Ai, Try Again",
      );
      return rejectWithValue(
        err.response?.data.message || "Failed To Generate Ai, Try Again",
      );
    }
  },
);
