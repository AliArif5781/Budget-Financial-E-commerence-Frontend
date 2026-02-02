import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  getAddToCartThunk,
  removeFromCartThunk,
  updateCartQtyThunk,
} from "@/featues/products/products.thunk";

import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ShowAddToCartProducts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errors, setError] = useState("");
  const [isBudgetWarningOpen, setIsBudgetWarningOpen] = useState(false);

  const { cartItems, loading, error } = useAppSelector(
    (state) => state.products,
  );

  const { budget } = useAppSelector((state) => state.budget);
  useEffect(() => {
    dispatch(getAddToCartThunk());
  }, [dispatch]);

  if (loading.popularProductsLoading)
    return <p className="text-center py-4">Loading your cart...</p>;
  if (error.getAddToCartError)
    return (
      <p className="text-red-500 text-center">{error.getAddToCartError}</p>
    );

  const handleRemove = (id: string) => {
    dispatch(removeFromCartThunk(id));
  };

  const handleQuantityChange = (productId: string, type: "inc" | "dec") => {
    const quantity = type === "inc" ? 1 : -1;
    dispatch(updateCartQtyThunk({ productId, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 0),
    0,
  );

  const checkStock = cartItems.map((item) => item);

  const handlePayment = async () => {
    if (totalPrice > (budget?.budgetAmount ?? 0)) {
      setIsBudgetWarningOpen(true);
      return;
    }
    const outOfStock = cartItems.find(
      (item) => item.stock < (item.quantity ?? 1),
    );
    if (outOfStock) {
      setError(
        `Stock not enough for ${outOfStock.title}. Available: ${outOfStock.stock}`,
      );
      return;
    } else {
      navigate("/payment-success");
    }
  };

  // const handlePayment = async () => {
  //   if (totalPrice > (budget?.budgetAmount ?? 0)) {
  //     setIsBudgetWarningOpen(true);
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       items: cartItems.map((item) => ({
  //         productId: item._id,
  //         quantity: item.quantity,
  //       })),
  //       amount: totalPrice,
  //       currency: "USD",
  //       environment: "sandbox",
  //       mode: "payment",
  //       payment_method_kind: "card",
  //       // token: "track_" + uuidv4(),
  //     };

  //     const result = await dispatch(storeUserPaymentThunk(payload)).unwrap();

  //     // If success
  //     navigate("/payment-success");
  //   } catch (err: any) {
  //     // Show error to user
  //     toast.error(err || "Payment failed");
  //   }
  // };

  /*
  3️⃣ Backend endpoints

You need two endpoints:

POST /payments/token → generates a SafePay token.

POST /payments → uses secret key to finalize the payment.
   */
  return (
    <div className="p-5">
      <div>
        <h1 className="text-2xl font-bold mb-6 px-7">Shopping Cart</h1>
      </div>

      {/* Dialog for budget warning */}
      <Dialog open={isBudgetWarningOpen} onOpenChange={setIsBudgetWarningOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Budget Exceeded!</DialogTitle>
          </DialogHeader>
          <p className="py-2 text-muted-foreground">
            Your total cart amount is{" "}
            <span className=" font-bold text-green-500">
              ${totalPrice.toFixed(2)}
            </span>{" "}
            exceeds your budget of{" "}
            <span className="font-bold text-red-500">
              ${budget?.budgetAmount.toFixed(2)}
            </span>
            . Please reduce some items before proceeding or{" "}
            <span className=" underline font-medium">
              choose to exceed your budget.
            </span>
          </p>
          <DialogFooter>
            <Button
              onClick={() => setIsBudgetWarningOpen(false)}
              variant={"secondary"}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Link to={"/budget-tracker"}>
              <Button
                // onClick={() => setIsBudgetWarningOpen(false)}
                className="cursor-pointer"
              >
                Budget Traker
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Always render cart UI */}
      <main className="grid md:grid-cols-12 px-4 py-6 gap-5">
        {cartItems.length === 0 ? (
          <div className="col-span-12 flex flex-col items-center justify-center py-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-4 max-w-md">
              Looks like you haven’t added anything to your cart yet. Browse our
              products and find something you love!
            </p>
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Left section */}
            <div className="col-span-8 overflow-x-auto overflow-y-hidden">
              <div className="min-w-225  space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-lg shadow-sm p-4"
                  >
                    {/* Product details */}
                    <div className="flex items-center gap-4 w-1/2">
                      <img
                        src={item.mediaUrl || item.thumbnailUrl}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div>
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="text-xs text-gray-500">
                          {item.description?.slice(0, 50)}...
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item._id, "dec")}
                      >
                        -
                      </Button>
                      <span className="px-3">{item?.quantity ?? 1}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item._id, "inc")}
                      >
                        +
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-lg">${item.price}</p>
                    </div>

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handleRemove(item._id)}
                    >
                      <Trash className="w-5 h-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right section */}
            <div className="col-span-4">
              <h2 className="text-xl font-semibold mb-4">Check-out</h2>
              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-xl font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              {errors && (
                <div className="text-red-500 text-xs py-2">{errors}</div>
              )}
              <Button
                className="w-full mt-4 cursor-pointer"
                onClick={handlePayment}
                disabled={loading.getAddToCartLoading}
              >
                Proceed to Payment
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ShowAddToCartProducts;
