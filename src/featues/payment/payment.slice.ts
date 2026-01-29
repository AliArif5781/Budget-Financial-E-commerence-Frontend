import { createSlice } from "@reduxjs/toolkit";
import {
  getAllRevenuethunk,
  getUserPaymentDetailsThunk,
  handlePaymentThunk,
  storeUserPaymentThunk,
} from "./payment.thunk";
import type { getPayment, PaymentResponse } from "@/types/types";

interface ProductsState {
  payment: string;
  getPayment: getPayment | null;
  getPaymentDetails: PaymentResponse | null;
  getRevenueData: number;
  loading: {
    paymentLoading: boolean;
    getPaymentLoading: boolean;
    getUserPaymentDetailsLoading: boolean;
    getRevenueLoading: boolean;
  };
  error: {
    paymentError: string | null;
    getPaymentError: string | null;
    getUserPaymentDetailsError: string | null;
    getRevenueError: string | null;
  };
}

const initialState: ProductsState = {
  payment: "",
  getPayment: null, // ---- >
  getPaymentDetails: null,
  getRevenueData: 0,
  loading: {
    paymentLoading: false,
    getPaymentLoading: false,
    getUserPaymentDetailsLoading: false,
    getRevenueLoading: false,
  },
  error: {
    paymentError: null,
    getPaymentError: null,
    getUserPaymentDetailsError: null,
    getRevenueError: null,
  },
};

const paymentSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // handlePaymentThunk
      .addCase(handlePaymentThunk.pending, (state, action) => {
        state.loading.paymentLoading = true;
        state.error.paymentError = null;
      })

      .addCase(handlePaymentThunk.fulfilled, (state, action) => {
        state.loading.paymentLoading = false;
        state.payment = action.payload;
        console.log(action.payload, " handle payment slice");
        state.error.paymentError = null;
      })
      .addCase(handlePaymentThunk.rejected, (state, action) => {
        state.loading.paymentLoading = false;
        state.error.paymentError =
          (action.payload as string) || "Failed Payment";
      })

      //   store users payments
      .addCase(storeUserPaymentThunk.pending, (state, action) => {
        state.loading.getPaymentLoading = true;
        state.error.getPaymentError = null;
      })
      .addCase(storeUserPaymentThunk.fulfilled, (state, action) => {
        state.loading.getPaymentLoading = false;
        state.getPayment = action.payload;
        state.error.getPaymentError = null;
      })
      .addCase(storeUserPaymentThunk.rejected, (state, action) => {
        state.loading.getPaymentLoading = false;
        state.error.getPaymentError =
          (action.payload as string) || "Failed to Get Payment.";
      })

      // get user payment details
      .addCase(getUserPaymentDetailsThunk.pending, (state, action) => {
        state.loading.getUserPaymentDetailsLoading = true;
        state.error.getUserPaymentDetailsError = null;
      })
      .addCase(getUserPaymentDetailsThunk.fulfilled, (state, action) => {
        state.loading.getUserPaymentDetailsLoading = false;
        state.getPaymentDetails = action.payload;
        state.error.getUserPaymentDetailsError = null;
      })
      .addCase(getUserPaymentDetailsThunk.rejected, (state, action) => {
        state.loading.getUserPaymentDetailsLoading = false;
        state.error.getUserPaymentDetailsError =
          (action.payload as string) || "Failed to Get Payment Details.";
      })

      // get revenue data
      .addCase(getAllRevenuethunk.pending, (state, action) => {
        state.loading.getRevenueLoading = true;
        state.error.getRevenueError = null;
      })
      .addCase(getAllRevenuethunk.fulfilled, (state, action) => {
        state.loading.getRevenueLoading = false;
        state.getRevenueData = action.payload;
        state.error.getRevenueError = null;
      })
      .addCase(getAllRevenuethunk.rejected, (state, action) => {
        state.loading.getRevenueLoading = false;
        state.error.getRevenueError =
          (action.payload as string) || "Failed to Get Revenue Details.";
      });
  },
});

export const {} = paymentSlice.actions;

export default paymentSlice.reducer;
