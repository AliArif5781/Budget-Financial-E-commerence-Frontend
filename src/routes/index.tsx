import Layout from "@/layout";
import Dashboard from "@/components/AdminDashboard/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import Report from "@/components/AdminDashboard/Report";
import AdminLayout from "@/AdminLayout";
import UploadProducts from "@/components/AdminDashboard/UploadProducts";
import BudgetTracker from "@/pages/BudgetTracker";
import UserProfile from "@/pages/UserProfile";
import ShowAddToCartProducts from "@/pages/ShowAddToCartProducts";
import SelectedProductDetailPage from "@/pages/SelectedProductDetailPage";
import Payment from "@/pages/Payment";
import Invoice from "@/pages/Invoice";
import History from "@/pages/History";
import Products from "@/components/AdminDashboard/Products";
import GetAllInvoice from "@/components/AdminDashboard/GetAllInvoice";
import ReportHistory from "@/pages/ReportHistory";
import AllProducts from "@/pages/AllProducts";
import UserInvoiceHistory from "@/pages/UserInvoiceHistory";
import SalesChart from "@/components/Chart/SaleChart";
import Coupon from "@/components/AdminDashboard/Coupon";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        // path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "budget-tracker",
        element: <BudgetTracker />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "addToCart",
        element: <ShowAddToCartProducts />,
      },
      {
        path: "products/:id",
        element: <SelectedProductDetailPage />,
      },
      {
        path: "payment-success",
        element: <Payment />,
      },
      {
        path: "invoice/:orderId",
        element: <Invoice />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "reportHistory",
        element: <ReportHistory />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "user-invoice",
        element: <UserInvoiceHistory />,
      },
      {
        path: "chart",
        element: <SalesChart />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "reports",
        element: <Report />,
      },
      {
        path: "create-product",
        element: <UploadProducts />,
      },
      {
        path: "productsSection",
        element: <Products />,
      },
      {
        path: "getAllInvoice",
        element: <GetAllInvoice />,
      },
      {
        path: "coupon",
        element: <Coupon />,
      },
    ],
  },
]);

export default router;
