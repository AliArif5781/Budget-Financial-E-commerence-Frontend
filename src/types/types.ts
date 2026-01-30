// export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  city?: string;
  zip?: string;
  address?: string;
}

//  DASHBOARD DATA
export interface StatData {
  id: string | number;
  title: string;
  value: string | number;
  growth: string;
  descriptionTitle: string;
  descriptionText: string;
  growthPositive: boolean;
  loading?: any;
}

// PRODUCTS TYPES
export type genderLevel = "men" | "baby" | "women" | "unisex";
export type sizelevel = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "standard";
export type categoryLevel = "Electronic" | "Grocery" | "Fashion" | "Cosmetics";
export type MediaType = "image" | null;

export interface ProductsType {
  _id?: string;
  name: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: categoryLevel;
  gender: genderLevel | null;
  // slug: string;
  thumbnailUrl: string;
  size: sizelevel;
  mediaType: MediaType;
  mediaUrl: string | null;
}

export interface UploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height?: number;
  width?: number;
  size: number;
  fileType: string;
  mime?: string;
}

// user budget
export type budgetCurrencyLevel = "$" | "Rs";

export interface BudgetPayload {
  budgetAmount: number;
  budgetCurrency: budgetCurrencyLevel;
}

// add to cart prodict

export interface CartItem {
  id: string; // productId
  title: string;
  price: number; // per unit
  image?: string;
  quantity: number; // >= 1
}

// get Payment
export interface PaymentItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface getPayment {
  mode: string;
  payment_method_kind: string;
  environment: string;
  amount: number;
  currency: string;
  token: string;
  items: PaymentItem[];
}

// get payment user details

export interface PaymentResponse {
  _id: string;
  mode: string;
  payment_method_kind: string;
  environment: string;
  amount: number;
  currency: string;
  items: PaymentItems[];
  token: string;
  user: PaymentUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductDetails {
  _id: string;
  name: string;
  price: number;
}

export interface PaymentItems {
  productId: ProductDetails;
  quantity: number;
}

export interface PaymentUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
}

// save user invoice

export interface userInvoiceItems {
  // name: string;
  productId: string;
  quantity: number;
  subtotal: number;
}
export interface InvoiceItemMinimal {
  mode?: string;
  bank?: string;
  payment_Method?: string;
  total: string;
  items: userInvoiceItems[];
}

// get report user
export interface getReport {
  message: string[];
  solved?: boolean;
  _id: string;
}

// invoice histor

export interface item {
  productId: {
    category: string;
    createdAt: string;
    description: string;
    gender: string;
    mediaType: string;
    mediaUrl: string;
    name: string;
    price: number;
    size: string;
    stock: number;
    thumbnailUrl: string;
    title: string;
    _id: string;
    // updatedAt: "2026-01-27T08:05:20.639Z";
  };
}
export interface Invoice {
  _id: string;
  environment?: string;
  user: string;
  total: string;
  token: string;
  payment_Method: string;
  mode: string;
  items: item[];
}

// get all invoice interface
export interface InvoiceItem {
  productId: string;
  quantity: number;
  subtotal?: number; // optional because some items may not have subtotal
}

export interface UserInvoice {
  _id: string;
  token: string; //
  mode: string; //
  payment_Method: string; //
  total: string; //
  user: {
    firstName: string;
  }; //
  items: InvoiceItem[]; //
  currenct: string;
  environment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// export interface chartDAta {
//   createdAt: Date;
//   total: string;
// }

export interface ChartDataRaw {
  createdAt: string;
  total: string;
}

export interface ChartDataFormatted {
  createdAt: string; // e.g. "2026-01-27"
  total: number;
}

// coupon

export interface couponInterface {
  coupon: string;
}
export interface checkCouponInterface {
  coupon: string;
  total: number;
  message?: string;
  appliedCoupon?: string;
}
