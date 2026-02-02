import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React, { useState } from "react";
import { useAppDispatch } from "@/app/hook";
import { handleCouponThunk } from "@/featues/coupon/coupon.thunk";

const Coupon = () => {
  const dispatch = useAppDispatch();
  const [coupon, setCoupon] = useState<string>("");
  const [error, setError] = useState("");

  const handleGenerateCoupon = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let resut = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      resut += chars[randomIndex];
    }
    setCoupon(resut);
    return resut;
  };

  const handleCoupon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (coupon.trim().length <= 7) {
      return setError("Coupon must be greater then 7 character");
    }

    dispatch(handleCouponThunk({ coupon }));
    setError("");
    setCoupon("");
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create a Coupon</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage discount coupons for your store.
        </p>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="text-lg">Coupon Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Coupon Code:</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                placeholder="ABvg5567ZZ"
                value={coupon}
                onChange={(e) => {
                  setError("");
                  setCoupon(e.target.value);
                }}
              />
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleGenerateCoupon}
              >
                Generate
              </Button>
            </div>
          </div>

          <div>
            {error && <span className="text-red-500 text-xs">{error}</span>}
          </div>
          <Button className="mt-4 cursor-pointer" onClick={handleCoupon}>
            Create Coupon
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Coupon;
