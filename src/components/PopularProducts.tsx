import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardDescription, CardTitle } from "./ui/card";
import {
  addToCartProductThunk,
  getProductsThunk,
  selectedProductThunk,
} from "@/featues/products/products.thunk";
import { useEffect } from "react";

const PopularProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { popularproduct, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCartProductThunk({ productId, quantity: 1 }));
  };

  const handleSelectedProduct = (id: string) => {
    dispatch(selectedProductThunk(id));
    navigate(`/products/${id}`);
  };

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold py-5">Popular Products</h1>

      {error.popularProductError && (
        <p className="text-red-600 mb-4">{error.popularProductError}</p>
      )}

      {loading.popularProductsLoading && (
        <p className="text-gray-600 mb-4">Loading...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularproduct.map((item) => {
          const product = item?.productId;

          return (
            <Card
              key={product._id}
              onClick={() => handleSelectedProduct(product._id)}
              className="cursor-pointer hover:shadow-sm transition"
            >
              <div className="grid h-full grid-rows-[180px_1fr_auto]">
                <div className="flex items-center justify-center p-4">
                  <img
                    src={product.mediaUrl || product.thumbnailUrl}
                    alt={product.title || product.name}
                    className="max-h-full w-full object-contain"
                  />
                </div>

                <div className="px-4 space-y-2">
                  <CardTitle className="line-clamp-2">
                    {product.title || product.name}
                  </CardTitle>

                  <CardDescription className="line-clamp-3">
                    {product.description}
                  </CardDescription>
                </div>

                <div className="flex items-center gap-3 p-4">
                  <span className="text-lg font-semibold">
                    ${product.price.toFixed(2)}
                  </span>

                  <Button
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product._id);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default PopularProducts;
