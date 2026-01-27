import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getUserPaymentDetailsThunk } from "@/featues/payment/payment.thunk";
import { useEffect } from "react";
import { useRef } from "react";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
// import { saveUserInvoiceThunk } from "@/featues/invoice/invoice.thunk";

const Invoice = () => {
  const dispatch = useAppDispatch();
  const { getPaymentDetails, loading, error } = useAppSelector(
    (state) => state.payment,
  );
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getUserPaymentDetailsThunk());
  }, [dispatch]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current || !getPaymentDetails) return;

    const node = invoiceRef.current;

    // 1) Add clean class
    node.classList.add("pdf-clean");

    try {
      const dataUrl = await domtoimage.toPng(node, {
        bgcolor: "#ffffff",
        quality: 1,
        style: {
          transform: "scale(3)",
          transformOrigin: "top left",
        },
        width: node.offsetWidth * 3,
        height: node.offsetHeight * 3,
      });

      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(
        pdfWidth / imgProps.width,
        pdfHeight / imgProps.height,
      );

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        imgProps.width * ratio,
        imgProps.height * ratio,
      );
      pdf.save(`Invoice-${getPaymentDetails._id}.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      // 2) Remove clean class after capture
      node.classList.remove("pdf-clean");
    }
  };

  const SubTotal = (getPaymentDetails?.amount ?? 0) - 14;

  if (loading.getUserPaymentDetailsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center animate-pulse text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (error.getUserPaymentDetailsError) {
    return (
      <div className="flex justify-center items-center animate-pulse text-red-600">
        {error.getUserPaymentDetailsError}
      </div>
    );
  }

  console.log(getPaymentDetails, "g");
  return (
    <div className="w-full">
      <div className=" flex justify-center items-center">
        <div ref={invoiceRef}>
          <Card>
            <CardContent>
              <CardTitle className="text-3xl">Invoice</CardTitle>

              <div className="mt-3 mb-5">
                <h3 className="text-muted-foreground">
                  {getPaymentDetails?.user.firstName}{" "}
                  {getPaymentDetails?.user.lastName}
                </h3>
              </div>

              <div className="flex justify-between">
                <div className=" space-y-1">
                  <div>
                    <span className="font-bold">ABN:</span>
                    <span className="text-muted-foreground pl-1">
                      123-456-789
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Email:</span>
                    <span className="text-muted-foreground pl-1">
                      ali@gmail.com
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Phone:</span>
                    <span className="text-muted-foreground pl-1">
                      {getPaymentDetails?.user?.phone}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Address:</span>
                    <span className="text-muted-foreground pl-1 text-sm">
                      {" "}
                      {getPaymentDetails?.user?.address}
                    </span>
                  </div>
                </div>
                {/* company */}
                <div>
                  <div className=" space-y-1">
                    <div>
                      <span className="font-bold">ABN</span>
                      <span className="text-muted-foreground pl-1">
                        123-456-789
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">Email:</span>
                      <span className="text-muted-foreground pl-1">
                        safePay@gmail.com
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">Phone:</span>
                      <span className="text-muted-foreground pl-1">
                        +92-15555555
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b w-full py-5"></div>

              {/* detail-section */}
              <div>
                <h2 className="text-xl font-semibold py-5">
                  Description of Service
                </h2>

                {/* Table header */}
                <div className="grid grid-cols-12 font-bold pb-2">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>

                {/* Table rows */}
                {getPaymentDetails?.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 py-2 last:border-b-0"
                  >
                    <div className="col-span-5">{item.productId?.name}</div>
                    <div className="col-span-2 text-center">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 text-right">
                      ${item.productId.price.toFixed(2)}
                    </div>
                    <div className="col-span-3 text-right">
                      ${item.productId.price * (item.quantity ?? 0)}
                    </div>
                  </div>
                ))}

                {/* SUBTOTAL */}
                <div className="space-y-2 border-b pb-2 mt-3 text-sm">
                  <div className="flex justify-end text-xs text-muted-foreground gap-2">
                    <span>SubTotal:</span>
                    <span>{SubTotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-end text-xs text-muted-foreground gap-2">
                    <span>Shipping:</span>
                    <span>$9</span>
                  </div>
                  <div className="flex justify-end text-xs text-muted-foreground gap-2">
                    <span>Estimated Tax:</span>
                    <span>$5</span>
                  </div>
                </div>

                {/* Optional: Grand Total */}
                <div className="grid grid-cols-12 font-bold pt-3">
                  <div className="col-span-9 text-right">Grand Total:</div>
                  <div className="col-span-3 text-right">
                    ${getPaymentDetails?.amount.toFixed(2)}
                  </div>
                </div>

                {/* Payment- detaikss */}

                <div className="py-5">
                  <h1 className="font-bold">Bank details for payment:</h1>

                  <div className="flex justify-between pt-3">
                    <div className=" space-y-1">
                      <div>
                        <span className="font-bold">Mode:</span>
                        <span className="text-muted-foreground pl-1">
                          {getPaymentDetails?.mode}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">Bank:</span>
                        <span className="text-muted-foreground pl-1">
                          SafePay, {getPaymentDetails?.environment}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">BSB:</span>
                        <span className="text-muted-foreground pl-1">
                          {getPaymentDetails?.user.email}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">Account Number:</span>
                        <span className="text-muted-foreground pl-1">
                          {getPaymentDetails?._id.slice(0, 15)}...
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">Name:</span>
                        <span className="text-muted-foreground pl-1">
                          {" "}
                          {getPaymentDetails?.user.firstName}{" "}
                          {getPaymentDetails?.user.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold">Payment Method:</span>
                        <span className="text-muted-foreground pl-1">
                          {" "}
                          {getPaymentDetails?.payment_method_kind}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-5">
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
    </div>
  );
};

export default Invoice;
