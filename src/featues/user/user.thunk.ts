import { api } from "@/axios/api";
import type { Login, signup } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const SignUpUserThunk = createAsyncThunk(
  "auth/signup",
  async (
    { firstName, lastName, email, password }: signup,
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials",
      );
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: Login, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials",
      );
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/auth/logout");
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout User Successfully?");
      return rejectWithValue(
        error.response?.data?.message || "Failed To Logout",
      );
    }
  },
);

export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");
      // console.log(response.data, "getUserProfile");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to Fetch Users Details",
      );
    }
  },
);

export const getAllUsersAndAdminThunk = createAsyncThunk(
  "get/user/admin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("users/getAllUsers");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Failed to Fetch details";
      return rejectWithValue(message);
    }
  },
);

export const updateUserDetails = createAsyncThunk(
  "/user/updateDetail",
  async (
    {
      phone,
      city,
      zip,
      address,
    }: { phone: string; city: string; zip: string; address: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch("users/updateDetails", {
        zip,
        phone,
        address,
        city,
      });
      console.log(response.data, "updateUserDetails");
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Failed to Update details";
      return rejectWithValue(message);
    }
  },
);
