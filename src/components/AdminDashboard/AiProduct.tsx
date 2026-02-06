"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { AiProductThunk } from "@/featues/ai/ai.thunk";

export default function GenerateAiModal({
  open,
  setOpen,
  mediaUrl,
}: {
  open: boolean;
  mediaUrl: string | null;
  setOpen: (val: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.aiProductGenerator);
  const [localError, setLocalError] = useState("");
  const [data, setData] = useState({
    name: "",
    price: 0,
    gender: "men",
    stock: 0,
  });

  const handleGenerativeAi = () => {
    if (data.price <= 0 || data.stock <= 0 || !data.name) {
      return setLocalError("All Field are required");
    }
    dispatch(
      AiProductThunk({
        ...data,

        price: Number(data.price),
        stock: Number(data.stock),
      }),
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Product Using AI</DialogTitle>
          <DialogDescription>
            Enter product details and AI will generate
            <span className="font-bold underline">
              {" "}
              title, description, category and size.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={data.name}
              //   onChange={(e) => setName(e.target.value)}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Adidas Running T-Shirt"
            />
          </div>

          <div className="grid gap-2">
            <Label>price</Label>
            <Input
              //   value={price}
              value={data.price}
              inputMode="decimal"
              //   step={"0.01"}
              min={0}
              type="number"
              //   onChange={(e) => setPrice(Number(e.target.value))}
              onChange={(e) =>
                setData({ ...data, price: Number(e.target.value) })
              }
              placeholder="e.g. 999"
            />
          </div>

          <div className="grid gap-2">
            <Label>stock</Label>
            <Input
              //   value={stock}
              value={data.stock}
              type="number"
              //   onChange={(e) => setStock(Number(e.target.value))}
              onChange={(e) =>
                setData({ ...data, stock: Number(e.target.value) })
              }
              placeholder="e.g. 20"
              min={0}
            />
          </div>

          <div className="grid gap-2">
            <Label>Gender</Label>
            <Select
              value={data.gender}
              onValueChange={(val) => setData({ ...data, gender: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">women</SelectItem>
                <SelectItem value="baby">baby</SelectItem>
                <SelectItem value="unisex">unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <span className="text-red-500">{localError}</span>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            // onClick={() => {
            //   handleGenerativeAi();
            //   setOpen(false);
            // }}
            disabled={!mediaUrl || loading.aiProductLoading}
            onClick={handleGenerativeAi}
          >
            {loading.aiProductLoading ? "Loading..." : " Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
