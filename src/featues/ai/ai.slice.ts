// featues/products/products.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { AiProductThunk } from "./ai.thunk";

export interface AiProduct {
  name: string;
  price: number;
  gender?: string;
  stock: number;
  category?: string;
  description?: string;
  size?: string;
  title?: string;
}

// export interface Product {
//   _id: string;
//   name: string;
//   title?: string;
//   description: string;
//   price: number;
//   category: string;
//   gender: string;
//   size: string;
//   stock: number;
//   mediaType: string;
//   mediaUrl?: string;
//   thumbnailUrl?: string;
//   createdAt: string;
//   updatedAt: string;
// }

interface ProductsState {
  items: AiProduct | null;

  loading: {
    aiProductLoading: boolean;
  };
  error: {
    aiProductError: string | null;
  };
}

const initialState: ProductsState = {
  items: null,
  loading: {
    aiProductLoading: false,
  },
  error: {
    aiProductError: null,
  },
};

const AiproductsSlice = createSlice({
  name: "Aiproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AiProductThunk.pending, (state) => {
        state.loading.aiProductLoading = true;
        state.error.aiProductError = null;
      })
      .addCase(AiProductThunk.fulfilled, (state, action) => {
        state.loading.aiProductLoading = false;
        state.items = action.payload;
        console.log(action.payload, "Ai Product  -- slice");
      })
      .addCase(AiProductThunk.rejected, (state, action) => {
        state.loading.aiProductLoading = false;
        state.error.aiProductError =
          (action.payload as string) || "Failed To Generate Ai, Try Again";
      });
  },
});

export const {} = AiproductsSlice.actions;

export default AiproductsSlice.reducer;
