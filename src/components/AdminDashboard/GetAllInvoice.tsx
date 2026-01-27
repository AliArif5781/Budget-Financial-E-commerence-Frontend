import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getAllInvoiceThunk } from "@/featues/invoice/invoice.thunk";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const GetAllInvoice = () => {
  const dispatch = useAppDispatch();
  const { getAllInvoice, loading, error } = useAppSelector(
    (state) => state.invoice,
  );

  useEffect(() => {
    dispatch(getAllInvoiceThunk());
  }, [dispatch]);

  console.log(getAllInvoice, "GAI");

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Invoice History</h2>

      <div className="border rounded-md p-2">
        <Table className="min-w-max">
          <TableCaption>List of all past invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-30">Invoice #</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading.getAllInvoiceLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading.getAllInvoiceLoading && getAllInvoice.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No invoice history found.
                </TableCell>
              </TableRow>
            )}

            {getAllInvoice.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>

                {/* Use the correct field names */}
                <TableCell>SafePay, {item.environment}</TableCell>

                <TableCell>
                  {item.items.map((p: any) => p.productId?.name).join(", ")}
                </TableCell>

                <TableCell className="capitalize">
                  {item.payment_Method || item.mode || "—"}
                </TableCell>

                <TableCell>${item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GetAllInvoice;
