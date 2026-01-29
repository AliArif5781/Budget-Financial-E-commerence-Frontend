import { api } from "@/axios/api";
import type { couponInterface } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleCouponThunk = createAsyncThunk(
  "coupnon/products",
  async (coupon: couponInterface, { rejectWithValue }) => {
    try {
      const response = await api.post("coupon/create-coupon", coupon);
      console.log(response.data, "handleCouponThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed To create coupon code. Try Again";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
