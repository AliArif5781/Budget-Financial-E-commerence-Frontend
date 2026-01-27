import { api } from "@/axios/api";
import type { BudgetPayload } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const setUserBudgetThunk = createAsyncThunk(
  "user/setBudget",
  async (
    { budgetAmount, budgetCurrency }: BudgetPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("budget/setUserBudget", {
        budgetAmount,
        budgetCurrency,
      });
      toast.success(response.data.message || "Budget Set Successfully");
      console.log(response.data, "setUserBudgetThunk");
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed To set Budget, Try Again"
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed To set Budget, Try Again"
      );
    }
  }
);

export const getUserBudgetThunk = createAsyncThunk(
  "user/getBudget",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("budget/getUserBudget");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch budget"
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { budget } = getState() as any;
      if (budget.budgetSet) {
        return false; // ❌ cancel API
      }
    },
  }
);
