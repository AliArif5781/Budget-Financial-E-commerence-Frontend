import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useNavigate } from "react-router-dom";
import {
  getAllProductsCursorThunk,
  selectedProductThunk,
} from "@/featues/products/products.thunk";
import { Command } from "@/components/ui/command";
import { CommandInput, CommandList } from "@/components/ui/command";
import { useCallback, useEffect, useRef } from "react";
import { resetProducts } from "@/featues/products/products.slice";

const AllProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    items,
    nextCursor,
    hasNextPage,
    loading: { moreCursorLoading },
    error: { moreCursorError },
  } = useAppSelector((state) => state.products);

  // initial load
  useEffect(() => {
    dispatch(resetProducts());
    dispatch(getAllProductsCursorThunk({ limit: 5 }));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!hasNextPage || moreCursorLoading) return;

    dispatch(
      getAllProductsCursorThunk({
        limit: 5,
        cursor: nextCursor!,
      }),
    );
  }, [dispatch, hasNextPage, moreCursorLoading, nextCursor]);

  // infinite scroll (IntersectionObserver)
  useEffect(() => {
    if (!hasNextPage || moreCursorLoading) return;

    const observer = new IntersectionObserver(
      // IntersectionObserver = watcher
      //   Browser, please watch something for me
      //   Watch what?
      // 👉 An invisible div at the bottom of the page.

      ([entry]) => {
        // ([entry]) => { ... } this is a callback function, When the browser notices something, call this function
        // entry = This is the report from the browser
        // Is the thing visible or not
        if (entry.isIntersecting) {
          // if (entry.isIntersecting)
          // isIntersecting = true
          //   “YES, the user has scrolled close enough and can see the bottom.” If the bottom of the page is visible
          loadMore();
        }
      },
      { rootMargin: "200px" },
      //   Trigger 200 pixels BEFORE the bottom is actually visible
    );

    if (loadMoreRef.current) {
      // Do we actually have the bottom div in the page? If yes
      observer.observe(loadMoreRef.current);
      //   Start watching this bottom div.
    }

    return () => observer.disconnect();
    // When this component updates or disappears, stop watching.
  }, [loadMore, hasNextPage, moreCursorLoading]);

  const handleSelectedProduct = (id: string) => {
    dispatch(selectedProductThunk(id));
    navigate(`/products/${id}`);
  };

  return (
    <main className="px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">All Products</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Browse all products available in your store.
            </p>
          </div>

          {/* Search */}
          <Command className="max-w-sm rounded-lg border">
            <CommandInput
              placeholder="Search products..."
              //   value={query}
              //   onValueChange={(value) => setQuery(value)}
            />
            <CommandList>
              {/* <CommandEmpty>No results found.</CommandEmpty> */}
            </CommandList>
          </Command>
        </div>

        <Separator className="mb-6" />

        {/* Products Grid */}
        {moreCursorError && (
          <div className="text-red-500">{moreCursorError}</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((product) => (
            <Card
              key={product._id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-200 px-3"
            >
              <div className="relative rounded-md overflow-hidden">
                <img
                  src={product.mediaUrl}
                  alt={product.title}
                  className="h-56 w-full object-contain"
                  loading="lazy"
                />

                {/* <div className="absolute top-3 right-3">
                  <Badge
                    variant={
                      product.status === "In Stock" ? "default" : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </div> */}
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.name}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-xl">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleSelectedProduct(product._id)}
                    className="cursor-pointer"
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {hasNextPage && <div ref={loadMoreRef} className="h-10" />}

      {moreCursorLoading && (
        <div className="flex justify-center py-6">
          <span>Loading...</span>
        </div>
      )}
    </main>
  );
};

export default AllProducts;
