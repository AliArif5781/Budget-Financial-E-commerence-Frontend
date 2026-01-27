import { Button } from "@/components/ui/button";
import headset from "/headset.png";
import PopularProducts from "@/components/PopularProducts";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useEffect } from "react";
import { getProductsThunk } from "@/featues/products/products.thunk";
import { getUserBudgetThunk } from "@/featues/budgetTracker/budget.thunk";
import Report from "@/components/Report";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const {
    budgetSet,
    loading: { budgetAmountLoading },
    error,
  } = useAppSelector((state) => state.budget);

  // console.log(isAuthenticated, budgetSet);

  // Conditions
  const showBudgetNotSetBanner =
    isAuthenticated && !budgetSet && !budgetAmountLoading;

  const showBudgetLoadingBanner = isAuthenticated && budgetAmountLoading;

  useEffect(() => {
    if (isAuthenticated && !budgetSet) {
      dispatch(getUserBudgetThunk());
    }
  }, [dispatch, isAuthenticated, budgetSet]);

  // useEffect(() => {
  //   dispatch(getProductsThunk());
  // }, [dispatch]);
  return (
    <>
      <div className="relative">
        {/* <div> */}

        {showBudgetLoadingBanner && (
          <div className="absolute top-0 left-0 right-0 z-50">
            {/* <div className="mx-auto w-full bg-blue-100 text-blue-900 border border-blue-300 px-4 py-2 text-sm"> */}
            <div className="mx-auto w-full bg-muted-foreground px-4 py-1 md:text-sm text-xs">
              Loading your budget…
            </div>
          </div>
        )}

        {showBudgetNotSetBanner && (
          <div className="sticky top-0 left-0 right-0 z-50">
            <div className="mx-auto w-full bg-yellow-100 text-yellow-900 border border-yellow-300 px-4 py-2 md:text-sm text-xs">
              Your budget isn’t set yet. Please create a budget to start
              tracking.
            </div>
          </div>
        )}

        {/* </div> */}
        <div className="p-6 md:px-16">
          <div className="min-h-screen grid grid-cols-12 ">
            {/* Left content */}
            <div className="col-span-12 md:col-span-6 flex items-center">
              <div className="pl-5 space-y-8">
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                  Smart Shopping & Budget Tracker{" "}
                </h1>{" "}
                <div className="flex gap-5">
                  <p
                    className="text-6xl font-bold text-transparent"
                    style={{ WebkitTextStroke: "2px #9ca3af" }}
                  >
                    01
                  </p>
                  <div className="border border-b"></div>
                  <div>
                    <h1 className="font-semibold text-md">Clear Sounds</h1>
                    <div className="text-xs text-muted-foreground pt-1">
                      <span>Making your dream music come true</span> <br />
                      <span>stay with Sequios Sounds</span>
                    </div>
                  </div>
                </div>
                <Link to={"/products"}>
                  <Button className="cursor-pointer">View Products</Button>
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 flex justify-center items-center ">
              <div className="">
                <img
                  src={headset}
                  className="h-48 md:h-full md:w-full object-cover"
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Popular Products */}
        </div>
      </div>
      <PopularProducts />
      <div className="pt-14 px-7">
        <h1 className="text-3xl font-semibold mb-5">Report an Issue</h1>
        <Report />
      </div>
    </>
  );
};

export default Home;
