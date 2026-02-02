import { api } from "@/axios/api";
import type { checkCouponInterface, couponInterface } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleCouponThunk = createAsyncThunk(
  "coupnon/products",
  async (coupon: couponInterface, { rejectWithValue }) => {
    try {
      const response = await api.post("coupon/create-coupon", coupon);
      // console.log(response.data, "handleCouponThunk");
      toast.success("Coupon created Successfully");
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

export const checkCouponThunk = createAsyncThunk(
  "coupnon/check",
  async (coupon: checkCouponInterface, { rejectWithValue }) => {
    try {
      const response = await api.post("coupon/check-coupon", coupon);
      // console.log(response.data, "checkCouponThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message || "Invalid Coupon";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
