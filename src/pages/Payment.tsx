import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setUserBudgetThunk } from "@/featues/budgetTracker/budget.thunk";
import {
  handlePaymentThunk,
  storeUserPaymentThunk,
} from "@/featues/payment/payment.thunk";
import { getAddToCartThunk } from "@/featues/products/products.thunk";
import { updateUserDetails } from "@/featues/user/user.thunk";
import { Tag } from "lucide-react";
import React, { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    user,
    loading: { updateUserloading },
  } = useAppSelector((state) => state.user);
  const { cartItems, loading, error } = useAppSelector(
    (state) => state.products,
  );

  const {
    loading: { paymentLoading },
  } = useAppSelector((state) => state.payment);

  const { budget } = useAppSelector((state) => state.budget);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!loading.getAddToCartLoading && cartItems.length === 0) {
      toast.error("Your cart is Empty");
      navigate("/home");
    }
  }, [cartItems, loading.getAddToCartLoading, navigate]);

  useEffect(() => {
    dispatch(getAddToCartThunk());
  }, [dispatch]);

  const Subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 0),
    0,
  );

  const TotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 0),
    14,
  );

  const handleSaveUserDetails = (e: FormEvent) => {
    e.preventDefault();

    dispatch(updateUserDetails({ phone, city, zip, address }));
  };

  useEffect(() => {
    if (user) {
      setPhone(user.phone ?? phone);
      setCity(user.city ?? city);
      setZip(user.zip ?? zip);
      setAddress(user.address ?? address);
    }
  }, [user]);

  const isShippingIncomplete =
    !phone?.trim() || !city?.trim() || !zip?.trim() || !address?.trim();

  const paymentItems = cartItems.map((item) => ({
    productId: item._id,
    name: item.title,
    price: item.price,
    quantity: item.quantity ?? 1,
  }));

  const handlePaymentMethod = async () => {
    try {
      const result = await dispatch(handlePaymentThunk(Subtotal)).unwrap();
      if (result.payment.status.message === "success") {
        toast.success(result?.message || "Payment successful");
        const paymentData = result.payment.data.tracker;
        const val = Number(budget?.budgetAmount) - Number(TotalPrice);

        dispatch(
          setUserBudgetThunk({ budgetAmount: val, budgetCurrency: "$" }),
        );

        dispatch(
          storeUserPaymentThunk({
            mode: paymentData.mode,
            token: paymentData.token,
            payment_method_kind: paymentData.payment_method_kind,
            amount: Number(TotalPrice),
            currency: paymentData.purchase_totals.quote_amount.currency,
            environment: paymentData.environment,
            items: paymentItems,
          }),
        );

        navigate("/invoice");
      } else {
        toast.error(result.payment.status.errors || "Payment failed");
      }
    } catch (err) {
      toast.error("Payment failed: " + err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-3 lg:px-10">
      {/* LEFT SIDE — SHIPPING FORM */}
      <Card className="lg:col-span-7 w-full">
        <CardTitle className="text-2xl font-semibold pl-2 lg:pl-6">
          Shipping Address
        </CardTitle>

        <CardContent>
          <form onSubmit={handleSaveUserDetails} className="space-y-4">
            {/* FIRST + LAST NAME */}
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={user?.firstName ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Brick"
                  value={user?.lastName ?? ""}
                  disabled
                />
              </div>
            </div>

            {/* EMAIL + PHONE */}
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@gmail.com"
                  value={user?.email ?? ""}
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+92-31555555"
                  value={phone ?? ""}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* CITY + ZIP */}
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Lahore"
                  value={city ?? ""}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  id="zip"
                  type="text"
                  placeholder="56789"
                  value={zip ?? ""}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="House #10 Street #5 DHA Phase 8 Lahore."
                  value={address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                  className="resize-none h-32"
                  required
                />
              </div>
            </div>

            <Button disabled={updateUserloading}>
              {updateUserloading ? "Loading" : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-5 border border-b-8 px-6 lg:px-10 w-full">
        <CardTitle className="text-xl lg:text-2xl font-semibold">
          Your Cart
        </CardTitle>

        <Card className="overflow-y-auto max-h-40 p-3 mt-2">
          {cartItems.map((item) => (
            <div key={item._id} className="relative">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4 ">
                  <div className="">
                    <img
                      src={item.mediaUrl || item.thumbnailUrl}
                      alt={item.title}
                      className=" h-20 object-contain rounded"
                    />
                  </div>

                  <div>
                    <h2 className="text-xs">{item.title}</h2>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {item.name}
                      <span className="ml-3 text-green-600 font-bold">
                        x{item.quantity}
                      </span>{" "}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>

        <div className="relative w-full md:w-44 mt-3">
          <Input className="pl-10" placeholder="Discount Code" />
          <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        {/* SUBTOTAL */}
        <div className="space-y-2 border-b pb-2 mt-3 text-sm">
          <div className="flex justify-between text-[15px]">
            <span>Subtotal</span>
            <span>${Subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Shipping</span>
            <span>$9</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Estimated Tax</span>
            <span>$5</span>
          </div>
        </div>

        {/* Total after shipping and all tax */}

        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-semibold text-lg">
            ${TotalPrice.toFixed(2)}
          </span>
        </div>

        {/* PAYMENT */}
        <Button
          size="lg"
          className={`cursor-pointer mt-4 w-full`}
          disabled={isShippingIncomplete || paymentLoading}
          onClick={handlePaymentMethod}
        >
          {paymentLoading ? "Loading..." : "Order Now"}
        </Button>
      </Card>
    </div>
  );
};

export default Payment;
