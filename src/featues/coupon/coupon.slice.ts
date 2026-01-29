import { createSlice } from "@reduxjs/toolkit";
import { handleCouponThunk } from "./coupon.thunk";
import type { couponInterface } from "@/types/types";

interface ProductsState {
  coupon: couponInterface | null;
  loading: {
    couponLoading: boolean;
  };
  error: {
    couponError: string | null;
  };
}

const initialState: ProductsState = {
  coupon: null,
  loading: {
    couponLoading: false,
  },
  error: {
    couponError: null,
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
      });
  },
});

export const {} = couponSlice.actions;

export default couponSlice.reducer;
