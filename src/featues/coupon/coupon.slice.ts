import { createSlice } from "@reduxjs/toolkit";
import { checkCouponThunk, handleCouponThunk } from "./coupon.thunk";
import type { checkCouponInterface, couponInterface } from "@/types/types";

interface ProductsState {
  coupon: couponInterface | null;
  checkCoupon: checkCouponInterface | null;
  loading: {
    couponLoading: boolean;
    checkCouponLoading: boolean;
  };
  error: {
    couponError: string | null;
    checkCouponError: string | null;
  };
}

const initialState: ProductsState = {
  coupon: null,
  checkCoupon: null,
  loading: {
    couponLoading: false,
    checkCouponLoading: false,
  },
  error: {
    couponError: null,
    checkCouponError: null,
  },
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create a coupon code.
      .addCase(handleCouponThunk.pending, (state) => {
        state.loading.couponLoading = true;
        state.error.couponError = null;
      })
      .addCase(handleCouponThunk.fulfilled, (state, action) => {
        state.loading.couponLoading = false;
        state.coupon = action.payload;
      })
      .addCase(handleCouponThunk.rejected, (state, action) => {
        state.loading.couponLoading = false;
        state.error.couponError =
          (action.payload as string) ||
          "Failed To create coupon code. Try Again";
      })

      // check cooupon applying

      .addCase(checkCouponThunk.pending, (state) => {
        state.loading.checkCouponLoading = true;
        state.error.checkCouponError = null;
      })
      .addCase(checkCouponThunk.fulfilled, (state, action) => {
        state.loading.checkCouponLoading = false;
        state.checkCoupon = action.payload;
      })
      .addCase(checkCouponThunk.rejected, (state, action) => {
        state.loading.checkCouponLoading = false;
        state.error.checkCouponError =
          (action.payload as string) || "Invalid Coupon";
      });
  },
});

export const {} = couponSlice.actions;

export default couponSlice.reducer;
