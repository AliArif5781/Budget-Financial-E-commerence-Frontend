// featues/products/products.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  getAddToCartThunk,
  getAllProductsCountThunk,
  getAllProductsCursorThunk,
  getAllProductsThunk,
  getProductsThunk,
  removeFromCartThunk,
  removeProductItemThunk,
  selectedProductThunk,
  updateCartQtyThunk,
} from "./products.thunk";

interface Product {
  _id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
  gender?: string;
  size?: string[];
  quantity?: number; // i change the quantity? => ? = quantity
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
}

export interface popularProduct {
  _id: string;
  name: string;
  title?: string;
  description: string;
  price: number;
  category: string;
  gender: string;
  size: string;
  stock: number;
  mediaType: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PopularProduct {
  productId: popularProduct; // populated product
  totalSold: number; // analytics data
}

interface ProductsState {
  items: Product[];
  cartLoaded: boolean;
  nextCursor: string | null;
  hasNextPage: boolean;
  cartItems: Product[];
  selectedProduct: Product | null;
  ProductsCount: number;
  popularproduct: PopularProduct[];

  getAllProducts: {
    products: Product[];
  };
  // payment: string;
  loading: {
    popularProductsLoading: boolean;
    getAddToCartLoading: boolean;
    removeItemCartLoading: boolean;
    handleSelectedLoading: boolean;
    getAllProductsLoading: boolean;
    productsCountLoading: boolean;
    moreCursorLoading: boolean;
    removeSingleProductLoading: boolean;
    // paymentLoading: boolean;
  };
  error: {
    popularProductError: string | null;
    getAddToCartError: string | null;
    removeAddToCartError: string | null;
    handleSelectedError: string | null;
    getAllProductsError: string | null;
    productsCountError: string | null;
    moreCursorError: string | null;
    removeSingleProductError: string | null;
    // paymentError: string | null;
  };
}

const initialState: ProductsState = {
  items: [],
  cartLoaded: false,
  nextCursor: null,
  hasNextPage: false,
  cartItems: [],
  selectedProduct: null,
  ProductsCount: 0,
  popularproduct: [],
  getAllProducts: {
    products: [],
  },
  // payment: "",
  loading: {
    popularProductsLoading: false,
    getAddToCartLoading: false,
    removeItemCartLoading: false,
    handleSelectedLoading: false,
    getAllProductsLoading: false,
    productsCountLoading: false,
    moreCursorLoading: false,
    removeSingleProductLoading: false,
    // paymentLoading: false,
  },
  error: {
    getAddToCartError: null,
    popularProductError: null,
    removeAddToCartError: null,
    handleSelectedError: null,
    getAllProductsError: null,
    productsCountError: null,
    moreCursorError: null,
    removeSingleProductError: null,
    // paymentError: null,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.nextCursor = null;
      state.hasNextPage = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // popular products section for get upload products == > change it late only for popular products.
      .addCase(getProductsThunk.pending, (state) => {
        state.loading.popularProductsLoading = true;
        state.error.popularProductError = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading.popularProductsLoading = false;
        state.popularproduct = action.payload; // array of Product
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading.popularProductsLoading = false;
        state.error.popularProductError =
          (action.payload as string) || "Failed To Fetch Products";
      })

      // getAddToCartThunk
      .addCase(getAddToCartThunk.pending, (state) => {
        state.loading.getAddToCartLoading = true;
        state.error.getAddToCartError = null;
      })
      .addCase(getAddToCartThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload; // array of Product
        state.cartLoaded = true;
        state.loading.getAddToCartLoading = false;
      })
      .addCase(getAddToCartThunk.rejected, (state, action) => {
        state.loading.getAddToCartLoading = false;
        state.error.getAddToCartError =
          (action.payload as string) || "Failed To Fetch Add To Cart Products";
      })

      // remove from add to cart
      .addCase(removeFromCartThunk.pending, (state) => {
        state.loading.removeItemCartLoading = true;
        state.error.removeAddToCartError = null;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.loading.removeItemCartLoading = false;
        state.cartItems = action.payload as Product[];
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.loading.removeItemCartLoading = false;
        state.error.removeAddToCartError =
          (action.payload as string) || "Failed To Delete Product.";
      })

      // update product quantituy
      .addCase(updateCartQtyThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload; // update state with new cart items
      })

      // selected product details
      .addCase(selectedProductThunk.pending, (state) => {
        state.loading.handleSelectedLoading = true;
        state.error.handleSelectedError = null;
      })
      .addCase(selectedProductThunk.fulfilled, (state, action) => {
        state.loading.handleSelectedLoading = false;
        state.selectedProduct = action.payload;
        console.log(action.payload, "selectedProduct  -- slice");
      })
      .addCase(selectedProductThunk.rejected, (state, action) => {
        state.loading.handleSelectedLoading = false;
        state.error.handleSelectedError =
          (action.payload as string) || "Product Didnot found. Go back.";
      })

      // getAllProductsThunk
      .addCase(getAllProductsThunk.pending, (state) => {
        state.loading.getAllProductsLoading = true;
        state.error.getAllProductsError = null;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.loading.getAllProductsLoading = false;
        state.getAllProducts.products = action.payload.products;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.loading.getAllProductsLoading = false;
        state.error.getAllProductsError =
          (action.payload as string) || "Product Didnot found. Go back.";
      })

      // get all products length or count getAllProductsCountThunk
      .addCase(getAllProductsCountThunk.pending, (state) => {
        state.loading.productsCountLoading = true;
        state.error.productsCountError = null;
      })
      .addCase(getAllProductsCountThunk.fulfilled, (state, action) => {
        state.loading.productsCountLoading = false;
        state.ProductsCount = action.payload;
      })
      .addCase(getAllProductsCountThunk.rejected, (state, action) => {
        state.loading.productsCountLoading = false;
        state.error.productsCountError =
          (action.payload as string) || "Failed to get count of products";
      })
      // more products cursor base
      .addCase(getAllProductsCursorThunk.pending, (state) => {
        state.loading.moreCursorLoading = true;
        state.error.moreCursorError = null;
      })
      .addCase(getAllProductsCursorThunk.fulfilled, (state, action) => {
        state.loading.moreCursorLoading = false;
        const existingIds = new Set(state.items.map((p) => p._id)); // Make a list of all product IDs that are already in the store.
        // A Set is like an array, BUT:
        // it cannot contain duplicates
        // ✅ it can check very fast if something exists
        const newItems = action.payload.data.filter(
          (p: any) => !existingIds.has(p._id), // From the new products coming from the API, keep only the ones we don’t already have.
        );

        state.items.push(...newItems);
        state.nextCursor = action.payload.nextCursor;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(getAllProductsCursorThunk.rejected, (state, action) => {
        state.loading.moreCursorLoading = false;
        state.error.moreCursorError =
          (action.payload as string) || "Failed to load products";
      })

      // removeProductItemThunk

      .addCase(removeProductItemThunk.pending, (state) => {
        state.loading.removeSingleProductLoading = true;
        state.error.removeSingleProductError = null;
      })
      .addCase(removeProductItemThunk.fulfilled, (state, action) => {
        state.loading.removeSingleProductLoading = false;

        const deletedId = action.meta.arg;

        if (state.getAllProducts?.products) {
          state.getAllProducts.products = state.getAllProducts.products.filter(
            (item) => item._id !== deletedId,
          );
        }
      })

      .addCase(removeProductItemThunk.rejected, (state, action) => {
        state.loading.removeSingleProductLoading = false;
        state.error.removeSingleProductError =
          (action.payload as string) || "Failed to delete product";
      });
  },
});

export const { resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
