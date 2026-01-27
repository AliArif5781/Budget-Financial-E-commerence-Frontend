import { createSlice } from "@reduxjs/toolkit";
import type {
  AuthUser,
  budgetCurrencyLevel,
  BudgetPayload,
} from "@/types/types";
import { getUserBudgetThunk, setUserBudgetThunk } from "./budget.thunk";
import { logoutUserThunk } from "../user/user.thunk";

export interface UserBudgetState {
  budget: BudgetPayload | null;
  budgetSet?: boolean;
  loading: {
    budgetSetLoading: boolean;
    budgetAmountLoading: boolean;
  };

  error: string | null;
}

const savedBudget = localStorage.getItem("userBudget");
//  Inam ul haq
const initialState: UserBudgetState = savedBudget
  ? {
      ...JSON.parse(savedBudget),
      // only copies the properties that you previously stored in localStorage
      loading: {
        budgetAmountLoading: false,
        budgetSetLoading: false,
      },
      error: null,
    }
  : {
      budgetSet: false,
      budget: null,
      loading: {
        budgetAmountLoading: false,
        budgetSetLoading: false,
      },
      error: null,
    };

const budgetSlice = createSlice({
  name: "userBudget",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // set user budget.
    builder
      .addCase(setUserBudgetThunk.pending, (state, action) => {
        // state.loading.budgetAmountLoading = true;
        state.loading.budgetSetLoading = true;
        state.error = null;
      })
      .addCase(setUserBudgetThunk.fulfilled, (state, action) => {
        state.loading.budgetAmountLoading = false;
        state.loading.budgetSetLoading = false;
        state.budget = action.payload;
        state.budgetSet = true;
        state.error = null;

        localStorage.setItem(
          "userBudget",
          JSON.stringify({ budget: action.payload, budgetSet: true })
        );
      })
      .addCase(setUserBudgetThunk.rejected, (state, action) => {
        state.loading.budgetAmountLoading = false;
        state.loading.budgetSetLoading = false;
        state.error =
          (action.payload as string) || "Failed To set Budget, Try Again";
      })

      // get user budget
      .addCase(getUserBudgetThunk.pending, (state, action) => {
        state.loading.budgetAmountLoading = true;
        state.error = null;
      })
      .addCase(getUserBudgetThunk.fulfilled, (state, action) => {
        state.loading.budgetAmountLoading = false;
        state.budget = action.payload;
        state.budgetSet = !!action.payload;
        // Remminder
        // !! Double Not operator
        // It convert any   value into boolean except (null and undefined).
        /*
        !!null → false
!!undefined → false
!!0 → false
!!"something" → true
!!{} → true
         */
        state.error = null;
      })
      .addCase(getUserBudgetThunk.rejected, (state, action) => {
        state.loading.budgetAmountLoading = false;
        state.budgetSet = false;
        state.budget = null;
        state.error =
          (action.payload as string) || "Failed To set Budget, Try Again";
      })

      .addCase(logoutUserThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const {} = budgetSlice.actions;
export default budgetSlice.reducer;
