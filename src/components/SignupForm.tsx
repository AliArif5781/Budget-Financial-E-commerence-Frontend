import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { SignUpUserThunk } from "@/featues/user/user.thunk";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupResult = await dispatch(
      SignUpUserThunk({
        firstName,
        lastName,
        email,
        password,
      })
    );

    if (SignUpUserThunk.fulfilled.match(signupResult)) {
      navigate("/home", { replace: true });
    }
  };

  return (
    <Card className="p-6 rounded-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="firstName">FirstName</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="lastName">lastName</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Brick"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@gmail.com"
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
            disabled={loading.signupLoading}
          >
            {loading.signupLoading ? "Loading..." : "Sign up"}
          </Button>
        </form>

        <div className="text-sm  text-center mt-4 hover:text-muted-foreground">
          Already have an account?{" "}
          <Link to={"/login"} className="underline font-bold pl-1">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
