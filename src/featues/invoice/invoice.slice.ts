import { createSlice } from "@reduxjs/toolkit";

import type { Invoice, InvoiceItemMinimal, UserInvoice } from "@/types/types";
import {
  getAllInvoiceThunk,
  getInvoiceHistoryThunk,
  // saveUserInvoiceThunk,
} from "./invoice.thunk";

interface InvoiceState {
  saveInvoice: InvoiceItemMinimal | null;
  invoiceHistory: Invoice[]; // Invoice
  getAllInvoice: UserInvoice[];
  loading: {
    saveInvoiceLoading: boolean;
    getInvoiceLoading: boolean;
    getAllInvoiceLoading: boolean;
  };
  error: {
    saveInvoiceError: string | null;
    getInvoiceError: string | null;
    getAllInvoiceError: string | null;
  };
}

const initialState: InvoiceState = {
  saveInvoice: null,
  invoiceHistory: [],
  getAllInvoice: [],
  loading: {
    saveInvoiceLoading: false,
    getInvoiceLoading: false,
    getAllInvoiceLoading: false,
  },
  error: {
    saveInvoiceError: null,
    getInvoiceError: null,
    getAllInvoiceError: null,
  },
};

const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //   store users  payments invoice
      // .addCase(saveUserInvoiceThunk.pending, (state, action) => {
      //   state.loading.saveInvoiceLoading = true;
      //   state.error.saveInvoiceError = null;
      // })
      // .addCase(saveUserInvoiceThunk.fulfilled, (state, action) => {
      //   state.loading.saveInvoiceLoading = false;
      //   state.saveInvoice = action.payload;
      //   // console.log(action.payload, "save- user invoice slice....");
      //   state.error.saveInvoiceError = null;
      // })
      // .addCase(saveUserInvoiceThunk.rejected, (state, action) => {
      //   state.loading.saveInvoiceLoading = false;
      //   state.error.saveInvoiceError =
      //     (action.payload as string) || "Failed to save payment invoice.";
      // })

      // get user invoice history
      .addCase(getInvoiceHistoryThunk.pending, (state) => {
        state.loading.getInvoiceLoading = true;
        state.error.getInvoiceError = null;
      })
      .addCase(getInvoiceHistoryThunk.fulfilled, (state, action) => {
        state.loading.getInvoiceLoading = false;
        state.invoiceHistory = action.payload;
        console.log(action.payload, "invoice-history-slice");
      })
      .addCase(getInvoiceHistoryThunk.rejected, (state, action) => {
        state.loading.getInvoiceLoading = false;
        state.error.getInvoiceError = action.payload as string;
      })

      // get All Invoice

      .addCase(getAllInvoiceThunk.pending, (state) => {
        state.loading.getAllInvoiceLoading = true;
        state.error.getAllInvoiceError = null;
      })
      .addCase(getAllInvoiceThunk.fulfilled, (state, action) => {
        state.loading.getAllInvoiceLoading = false;
        state.getAllInvoice = action.payload;
      })
      .addCase(getAllInvoiceThunk.rejected, (state, action) => {
        state.loading.getAllInvoiceLoading = false;
        state.error.getAllInvoiceError =
          (action.payload as string) || "Failed to get All Invoice.";
      });
  },
});

export const {} = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
