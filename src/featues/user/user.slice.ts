import { createSlice } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types/types";
import {
  getAllUsersAndAdminThunk,
  getUserProfile,
  loginUserThunk,
  logoutUserThunk,
  SignUpUserThunk,
  updateUserDetails,
} from "./user.thunk";

interface UserState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  allCount: {
    totalUsers: number;
    totalAdmins: number;
  };
  loading: {
    signupLoading: boolean;
    loginLoading: boolean;
    userProfileLoading: boolean;
    logoutLoading: boolean;
    totalUsersLoading: boolean;
    totalAdminLoading: boolean;
    updateUserloading: boolean;
  };

  error: string | null;
}
//  Bhai Inam ul haq
// https://dev.to/_ndeyefatoudiop/7-habits-i-recommend-to-succeed-as-a-frontend-developer-57e
const initialState: UserState = {
  user: null,
  isAuthenticated: false,

  allCount: {
    totalAdmins: 0,
    totalUsers: 0,
  },
  loading: {
    signupLoading: false,
    loginLoading: false,
    logoutLoading: false,
    userProfileLoading: false,
    totalUsersLoading: false,
    totalAdminLoading: false,
    updateUserloading: false,
  },
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },

    // logout(state) {
    //   state.user = null;
    //   state.error = null;
    //   // state.loading = false;
    // },
  },

  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(SignUpUserThunk.pending, (state) => {
        state.loading.signupLoading = true;
        state.error = null;
      })
      .addCase(SignUpUserThunk.fulfilled, (state, action) => {
        state.loading.signupLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(SignUpUserThunk.rejected, (state, action) => {
        state.loading.signupLoading = false;
        state.error = (action.payload as string) || "Login failed. Try again.";
      })

      // LOGIN
      .addCase(loginUserThunk.pending, (state) => {
        state.loading.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading.loginLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading.loginLoading = false;
        state.error = (action.payload as string) || "Login failed. Try again.";
      })

      // get user profile

      .addCase(getUserProfile.pending, (state) => {
        state.loading.userProfileLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading.userProfileLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading.userProfileLoading = false;
        state.error =
          (action.payload as string) ||
          "Failed to fetch user details. Login Again";
      })

      // logout
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading.logoutLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.loading.logoutLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading.logoutLoading = false;
        state.error =
          (action.payload as string) || "Failed to Logout. Try Again";
      })

      // get all count of users and admin

      .addCase(getAllUsersAndAdminThunk.pending, (state) => {
        state.loading.totalAdminLoading = true;
        state.loading.totalUsersLoading = true;
        state.error = null;
      })
      .addCase(getAllUsersAndAdminThunk.fulfilled, (state, action) => {
        state.loading.totalAdminLoading = false;
        state.loading.totalUsersLoading = false;
        state.allCount = action.payload;
        state.error = null;
      })
      .addCase(getAllUsersAndAdminThunk.rejected, (state, action) => {
        state.loading.totalAdminLoading = false;
        state.loading.totalUsersLoading = false;
        state.error =
          (action.payload as string) || "Failed to Fetch. Try Again";
      })

      // update user profile
      .addCase(updateUserDetails.pending, (state) => {
        state.loading.updateUserloading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading.updateUserloading = false;
        // state.user = action.payload;
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading.updateUserloading = false;
        state.error =
          (action.payload as string) ||
          "Failed to update User details. Try Again";
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
