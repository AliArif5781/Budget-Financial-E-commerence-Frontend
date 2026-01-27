import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hook";
// import { loginUserThunk } from "@/featues/user/user.thunk.";
import { getUserProfile, loginUserThunk } from "../featues/user/user.thunk";
import { clearError } from "@/featues/user/user.slice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUserBudgetThunk } from "@/featues/budgetTracker/budget.thunk";

const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearError());

    // clear previous error
    const actionResult = await dispatch(loginUserThunk({ email, password }));

    if (loginUserThunk.fulfilled.match(actionResult)) {
      const profileAction = await dispatch(getUserProfile());
      dispatch(getUserBudgetThunk());
      const user = profileAction.payload;

      if (user.role === "Admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className="p-6 rounded-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        {/* {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={loading.loginLoading}
          >
            {loading.loginLoading ? "Loading..." : "Sign In"}
          </Button>
        </form>

        <div className="text-sm  text-center mt-4 hover:text-muted-foreground">
          Don,t have an account?{" "}
          <Link to={"/signup"} className="underline font-bold pl-1">
            Signup
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
