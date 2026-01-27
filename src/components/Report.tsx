import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendReportThunk } from "@/featues/report/report.thunk";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Report = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmitReport = async () => {
    if (!message.trim()) {
      setError("Cannot send empty message");
      return;
    }
    dispatch(sendReportThunk(message));
    setMessage("");
  };

  return (
    <div className="flex">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Report an Issue
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* USER INFO */}
          <div className="text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Name:</span> {user?.firstName}{" "}
              {user?.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </div>

          {/* MESSAGE */}
          <div className="space-y-2">
            <Label htmlFor="report">Your Report</Label>
            <Textarea
              id="report"
              placeholder="Describe your issue or feedback..."
              className="min-h-30 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <span className="text-red-500">{error}</span>
          {/* SUBMIT */}
          <Button
            className="w-full disabled:cursor-none"
            disabled={!message}
            onClick={handleSubmitReport}
          >
            Submit Report
            {/* {load ? "Submitting..." : "Submit Report"} */}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
