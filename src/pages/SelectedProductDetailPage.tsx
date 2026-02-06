import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import {
  addToCartProductThunk,
  selectedProductThunk,
} from "@/featues/products/products.thunk";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const SelectedProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector(
    (state) => state.products,
  );

  const preloaded = (location.state as any)?.selectedProduct;

  useEffect(() => {
    if (!id) return;
    if (!selectedProduct || selectedProduct._id !== id) {
      dispatch(selectedProductThunk(id));
    }
  }, [id, dispatch]);

  if (loading.handleSelectedLoading && !preloaded) {
    return (
      <div className="min-h-screen flex justify-center items-center animate-pulse">
        Loading product…
      </div>
    );
  }

  if (error.handleSelectedError) {
    return <div className="p-4 text-red-600">{error.handleSelectedError}</div>;
  }

  const product = selectedProduct ?? preloaded;
  if (!product) return <div className="p-4">No product found.</div>;

  const stockQuantity = selectedProduct?.stock ?? 0;

  if (!selectedProduct) {
    return <div className="p-4 text-muted-foreground">Loading product…</div>;
  }
  const handleAddToCart = (productId: string) => {
    dispatch(addToCartProductThunk({ productId, quantity: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Product Image */}
        <div className="md:col-span-6 flex justify-center">
          <div className="w-full max-w-md rounded-xl overflow-hidden m-auto">
            <img
              src={selectedProduct?.mediaUrl}
              alt={selectedProduct?.title}
              loading="lazy"
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:col-span-6 flex flex-col justify-center max-w-xl">
          <section className="space-y-6">
            {/* Category / Brand */}
            <span className="text-sm uppercase tracking-wide text-muted-foreground">
              {selectedProduct?.name}
            </span>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight">
              {selectedProduct?.title}
            </h1>

            {/* Price */}
            <div className="text-3xl font-semibold text-primary">
              ${selectedProduct?.price}
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-muted-foreground">
              {selectedProduct?.description}
            </p>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Size
                </h3>
                <span className="inline-flex mt-1 px-3 py-1 rounded-md bg-secondary text-sm font-medium">
                  {selectedProduct?.size}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Gender
                </h3>
                <span className="inline-flex mt-1 px-3 py-1 rounded-md bg-secondary text-sm font-medium">
                  {selectedProduct?.gender}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Stock
                </h3>
                <span
                  className={`inline-flex mt-1 px-3 py-1 rounded-md text-sm font-medium ${
                    stockQuantity > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stockQuantity > 0
                    ? `${selectedProduct?.stock} available`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1 rounded-lg px-6 py-3 font-semibold hover:cursor-pointer"
                size={"icon-lg"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(selectedProduct._id);
                }}
              >
                Add to Cart
              </Button>
              {/* <Button
                className="flex-1 rounded-lg border border-border px-6 py-3 font-semibold hover:cursor-pointer"
                variant={"outline"}
                size={"icon-lg"}
              >
                Buy Now
              </Button> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SelectedProductDetailPage;
