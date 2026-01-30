import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../featues/user/user.slice";
import budgetReducer from "../featues/budgetTracker/budget.slice";
import productReducer from "../featues/products/products.slice";
import paymentReducer from "../featues/payment/payment.slice";
import InvoiceReducer from "../featues/invoice/invoice.slice";
import reportReducer from "../featues/report/report.slice";
import AiproductsReducer from "../featues/ai/ai.slice";
import ChartReducer from "../featues/chart/chart.slice";
import couponReducer from "../featues/coupon/coupon.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    budget: budgetReducer,
    products: productReducer,
    payment: paymentReducer,
    invoice: InvoiceReducer,
    report: reportReducer,
    aiProductGenerator: AiproductsReducer,
    chart: ChartReducer,
    coupon: couponReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
