"use client";

import React from "react";
import { ThemeToggle } from "./Theme-Toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserThunk } from "@/featues/user/user.thunk";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex items-center justify-between border-b p-4 px-10">
      <Link to={"/home"}>
        <h1 className="font-semibold">Financial POS</h1>
      </Link>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Link to={"addToCart"}>
          <ShoppingCart className="h-4 w-4" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <button>
              <Avatar>
                <AvatarImage src="/avatar.png" alt="User Avatar" />
                <AvatarFallback>{user?.firstName.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/home"}>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            {user?.role === "Admin" && (
              <DropdownMenuItem>
                <Link to={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link to={"/budget-tracker"}>Budget Tracker</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/reportHistory"}>Report History</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/user-invoice"}>Invoice History</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
