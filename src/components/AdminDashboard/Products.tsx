import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  getAllProductsThunk,
  removeFromCartThunk,
} from "@/featues/products/products.thunk";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getAllProducts, loading, error } = useAppSelector(
    (state) => state.products,
  );

  console.log(getAllProducts, "G");
  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  const handleRemove = (id: string) => {
    dispatch(removeFromCartThunk(id));
  };

  console.log(getAllProducts, "check");
  return (
    <div className="p-5">
      <div>
        <h1 className="text-2xl font-bold mb-6 px-7">All Products</h1>
      </div>

      {/* Always render cart UI */}
      <main className="grid grid-cols-12 px-4 py-6 gap-5">
        {!getAllProducts ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-4 max-w-md">
              Looks like you haven’t added anything to your cart yet. Browse our
              products and find something you love!
            </p>
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => navigate("/create-product")}
            >
              Upload Products
            </Button>
          </div>
        ) : (
          <>
            {/* Left section */}
            <div className="col-span-12 overflow-x-auto overflow-y-hidden">
              <div className="min-w-225  space-y-4">
                {getAllProducts.products.map((item) => (
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

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-lg">${item.price}</p>
                    </div>

                    {/* stockl */}
                    <div>
                      <Badge>{item.stock}</Badge>
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
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
