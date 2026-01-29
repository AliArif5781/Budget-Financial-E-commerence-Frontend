import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { budgetCurrencyLevel } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setUserBudgetThunk } from "@/featues/budgetTracker/budget.thunk";
import { useNavigate } from "react-router-dom";

export default function BudgetTracker() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const budget = useAppSelector((state) => state.budget);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<budgetCurrencyLevel>("$");

  const handleSave = async () => {
    if (!amount || !currency || amount <= 0) return;

    await dispatch(
      setUserBudgetThunk({
        budgetAmount: amount,
        budgetCurrency: currency,
      }),
    );

    setAmount(0);
    setCurrency("$");
    navigate("/home");
  };

  console.log(budget, "B- SLECTETOR");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardHeader className="text-center pb-2">
          <h1 className="text-2xl font-bold">Set Your Budget</h1>
          <p className="text-sm text-muted-foreground">
            Control your monthly spending
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Preview */}
          <div className="rounded-xl p-5 text-center">
            <p className="text-xs uppercase text-slate-400">Total Budget</p>
            <p className="text-3xl font-bold mt-1">
              {currency ?? "--"}{" "}
              {budget.budget?.budgetAmount.toFixed(2) || amount || "0"}
            </p>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>Budget Amount</Label>
            <Input
              type="number"
              placeholder="500"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-11"
            />
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={currency}
              //   onValueChange={setCurrency as budgetCurrencyLevel}
              onValueChange={(value) =>
                setCurrency(value as budgetCurrencyLevel)
              }
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="$">$ Dollar</SelectItem>
                <SelectItem value="Rs">Rs Rupees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full h-11 text-base font-semibold"
            onClick={handleSave}
            disabled={!amount || !currency}
          >
            Save Budget
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
