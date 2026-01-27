import { api } from "@/axios/api";
import type { InvoiceItemMinimal } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

// export const saveUserInvoiceThunk = createAsyncThunk<
//   InvoiceItemMinimal,
//   InvoiceItemMinimal
// >("save/invoice", async (payload, { rejectWithValue }) => {
//   try {
//     const response = await api.post("invoice/saveInvoice", payload);
//     //   console.log(response.data, "saveUserInvoiceThunk");
//     // return response.data;
//     return payload;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;
//     const message =
//       err.response?.data.message || "Failed to save Invoice details.";
//     toast.error(message);
//     return rejectWithValue(message);
//   }
// });

export const getInvoiceHistoryThunk = createAsyncThunk(
  "invoice/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("invoice/my-invoice");
      console.log(response.data, "getInvoiceHistoryThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message || "Failed to Fetch Invoice.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAllInvoiceThunk = createAsyncThunk(
  "all/invoice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("invoice/getAllInvoice");
      console.log(response.data, "I");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to save Invoice details.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
