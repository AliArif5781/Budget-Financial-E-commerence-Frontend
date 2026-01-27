import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getReportThunk } from "@/featues/report/report.thunk";
import { useEffect } from "react";

const ReportHistory = () => {
  const dispatch = useAppDispatch();
  const { geReportUser, loading, error } = useAppSelector(
    (state) => state.report,
  );

  useEffect(() => {
    dispatch(getReportThunk());
  }, [dispatch]);

  return (
    <main className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Report History</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your reports are removed automatically once resolved by admin.
            </p>
          </div>

          <Badge variant="secondary">Auto Cleanup Enabled</Badge>
        </div>

        {/* LOADING */}
        {loading.getAllReportLoading && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        )}

        {/* ERROR */}
        {error.getAllReportError && (
          <div className="text-center py-10">
            <p className="text-destructive">Failed to load reports.</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading.getAllReportLoading && geReportUser.length === 0 && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-muted-foreground">
              No report history found.
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Submit a report and it will appear here.
            </p>
          </div>
        )}

        {/* REPORT LIST */}
        {!loading.getAllReportLoading && geReportUser.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {geReportUser.map((item) => (
              <Card key={item._id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Report ID: {item._id}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item?.message}
                    </p>
                  </div>

                  <Badge variant="outline">Pending</Badge>
                </div>

                <Separator className="my-4" />
                {/* 
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Submitted: {new Date(item.createdAt).toLocaleString()}
                  </span>
                  <span>Status: {item.status ?? "Pending"}</span>
                </div> */}
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ReportHistory;
