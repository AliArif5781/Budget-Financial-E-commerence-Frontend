import { api } from "@/axios/api";
import type { ProductsType } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const createProductsThunk = createAsyncThunk(
  "create/products",
  async (
    {
      name,
      title,
      description,
      price,
      stock,
      thumbnailUrl,
      category,
      gender,

      //   slug,
      size,
      mediaType,
      mediaUrl,
    }: ProductsType,
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/products/upload", {
        name,
        title,
        description,
        price,
        stock,
        category,
        gender,
        thumbnailUrl,
        // slug,
        size,
        mediaType,
        mediaUrl,
      });
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed To Upload Product, Try Again",
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed To Upload Product, Try Again",
      );
    }
  },
);

export const getProductsThunk = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/getProducts");

      // console.log(response.data, "getProductsThunk");

      // await new Promise((resolve) => setTimeout(resolve, 2000));
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "Failed To Fetch Product, Try Again",
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed To Fetch Product, Try Again",
      );
    }
  },
);

export const getProductByIdThunk = createAsyncThunk(
  "selected/product",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`products/${productId}`);
      console.log(response.data, "get-product-by- id");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Failed To Get Product, Try Again",
      );
      return rejectWithValue(
        err.response?.data.message || "Failed To Get Product, Try Again",
      );
    }
  },
);

export const addToCartProductThunk = createAsyncThunk(
  "/cart/products",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/cart/products", {
        items: [{ productId, quantity }],
      });
      console.log(response.data, "addToCartProductThunk");
      toast.success(response.data?.message || "Add Item Successfully");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || "Failed to add Products, Try Again";
      return rejectWithValue(message);
    }
  },
);

export const getAddToCartThunk = createAsyncThunk(
  "cart/getCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart/getCartProducts");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to get Products. Try Again";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateCartQtyThunk = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch("/cart/updateQuantity", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to update cart");
      return rejectWithValue(
        err.response?.data?.message || "Failed to update cart",
      );
    }
  },
);

export const removeFromCartThunk = createAsyncThunk(
  "cartProduct/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/${id}`);
      toast.success(response.data?.message || "Remove product Successfully");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to delete item. Try Again";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const selectedProductThunk = createAsyncThunk(
  "selected/product",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cart/selectedProduct/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Product Didnot found. Go back.";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAllProductsThunk = createAsyncThunk(
  "all/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("products/all-products");
      console.log(response.data, "getAllProductsThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to get Products. Try Again";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAllProductsCountThunk = createAsyncThunk(
  "all/productsCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("products/productscount");
      // console.log(response.data, "getAllProductsCountThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message ||
        "Failed to get Products Length. Try Again";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const getAllProductsCursorThunk = createAsyncThunk(
  "all/productsCursor",
  async (
    { limit = 5, cursor }: { limit?: number; cursor?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.get("products/allProductscursor", {
        params: { limit, cursor },
      });
      console.log(response.data, "getAllProductsCursorThunk");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data.message || "Failed to get Products. Try Again";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);
