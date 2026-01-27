"use client";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { getInvoiceHistoryThunk } from "@/featues/invoice/invoice.thunk";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const History = () => {
  const dispatch = useAppDispatch();
  const { invoiceHistory, loading } = useAppSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(getInvoiceHistoryThunk());
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Invoice History</h2>

      <div className="border rounded-md p-2">
        <Table>
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
            {loading.getInvoiceLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading.getInvoiceLoading && invoiceHistory?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No invoice history found.
                </TableCell>
              </TableRow>
            )}

            {invoiceHistory?.map((item: any, index) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell>{item.bank}</TableCell>

                <TableCell className="w-md">
                  {item.items.map((p: any) => p.name).join(", ")}
                </TableCell>

                <TableCell className="capitalize">
                  {item.payment_Method}
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

export default History;
