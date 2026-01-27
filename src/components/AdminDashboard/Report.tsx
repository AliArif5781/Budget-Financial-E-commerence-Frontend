import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";
import {
  getAllReportThunk,
  solveReportThunk,
} from "@/featues/report/report.thunk";
import { Check } from "lucide-react";

const Report = () => {
  const dispatch = useAppDispatch();
  const { getAllReportUsers, loading, error } = useAppSelector(
    (state) => state.report,
  );

  useEffect(() => {
    dispatch(getAllReportThunk());
  }, [dispatch]);

  const handleSolved = (id: string) => {
    dispatch(solveReportThunk(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Reports</h1>
      <p>Here you can view and export sales reports.</p>

      <main className="grid md:grid-cols-12 px-4 py-6 gap-5">
        {/* Loading */}
        {loading.getAllReportLoading && (
          <div className="col-span-12 text-center">Loading...</div>
        )}

        {/* Error */}
        {error.getAllReportError && (
          <div className="col-span-12 text-center text-red-600">
            {error.getAllReportError}
          </div>
        )}

        {/* Empty */}
        {!loading.getAllReportLoading &&
          !error.getAllReportError &&
          getAllReportUsers.length === 0 && (
            <div className="col-span-12 flex flex-col items-center justify-center py-10 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-muted-foreground">
                No Report Yet..
              </h2>
            </div>
          )}

        {/* Data */}
        {!loading.getAllReportLoading &&
          !error.getAllReportError &&
          getAllReportUsers.length > 0 && (
            <div className="col-span-12 overflow-x-auto overflow-y-hidden">
              <div className="min-w-225 space-y-4">
                {getAllReportUsers.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-lg shadow-sm p-4"
                  >
                    <div className="flex items-center gap-4 w-1/2">
                      <Textarea
                        className="resize-none"
                        value={item.message}
                        readOnly
                      />
                    </div>

                    <div className="flex ml-5">
                      <span className="bg-green-700 p-2 rounded-md">
                        <Check
                          onClick={() => handleSolved(item._id)}
                          className={`h-4 w-4 cursor-pointer text-green-200 `}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </main>
    </div>
  );
};

export default Report;
