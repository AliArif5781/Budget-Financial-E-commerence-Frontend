import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { getUserProfile } from "./featues/user/user.thunk";
import { getUserBudgetThunk } from "./featues/budgetTracker/budget.thunk";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserBudgetThunk());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
