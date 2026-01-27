import { api } from "@/axios/api";
import type { getPayment, InvoiceItemMinimal } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handlePaymentThunk = createAsyncThunk(
  "payment/users",
  async (totalPrice: number, { rejectWithValue }) => {
    try {
      // Step 1: Get a payment token from backend
      const tokenResponse = await api.post("payments/token", {
        amount: Number(totalPrice * 100).toFixed(2),
      });

      const token = tokenResponse.data.token;

      console.log(token, "TOEKN");
      // Step 2: Send the token to backend to process payment
      const paymentResponse = await api.post("payments", {
        token,
        amount: Number(totalPrice * 100).toFixed(2),
        // merchant_api_key: import.meta.env.VITE_MERCHANT_API_KEY,
      });

      console.log(import.meta.env.VITE_MERCHANT_API_KEY, "API KEY MERCHANT");
      console.log(paymentResponse.data, "paymentResponseThunk");
      return paymentResponse.data; // contains success/failure info
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Payment did not proceed, try again";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const storeUserPaymentThunk = createAsyncThunk(
  "storePayment/users",
  // async (payload: getPayment, { rejectWithValue }) => {
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.post("payments/storePayment", payload);
      console.log(response.data, "storeUserPaymentThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message || "Failed to store Payment.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getUserPaymentDetailsThunk = createAsyncThunk(
  "user/paymentDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("payments/getUserPaymentDetails");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to get Payment Details. ";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAllRevenuethunk = createAsyncThunk(
  "user/revenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("payments/getAllRevenue");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to get Revenue Details. ";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
