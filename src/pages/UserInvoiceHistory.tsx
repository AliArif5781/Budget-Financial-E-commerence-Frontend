import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvoiceHistoryThunk } from "@/featues/invoice/invoice.thunk";
import { isValidElement, useEffect } from "react";

const UserInvoiceHistory = () => {
  const dispatch = useAppDispatch();
  const { invoiceHistory, loading } = useAppSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(getInvoiceHistoryThunk());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-4 max-w-6xl mx-auto">
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
            {loading.getInvoiceLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!loading.getInvoiceLoading && invoiceHistory?.length === 0 && (
              // invoiceHistory.length === 0 &&
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No invoice history found.
                </TableCell>
              </TableRow>
            )}

            {invoiceHistory?.map((invoice: any, index: number) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell>SafePay, {invoice.environment}</TableCell>

                <TableCell>
                  {invoice.items.map((p: any) => p.productId?.name).join(", ")}
                </TableCell>

                <TableCell className="capitalize">
                  {invoice.payment_Method || invoice.mode || "—"}
                </TableCell>

                <TableCell>${invoice.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserInvoiceHistory;
