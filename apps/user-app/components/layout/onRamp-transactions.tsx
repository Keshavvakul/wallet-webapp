import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card";

interface OnRampTransactionComponentProps {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

export const OnRampTransactionComponent = ({
  transactions,
}: {
  transactions: OnRampTransactionComponentProps[];
}) => {
  if (!transactions?.length) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardContent>
            <div className="text-center">No recent transactions</div>
          </CardContent>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-[19px]">Recent Transaction</CardTitle>
        <hr></hr>
        <CardContent>
          <div className="text-sm">
            {transactions?.map((t) => (
              <div className="flex justify-between pt-1">
                <div>
                  <div className="flex gap-5">
                    <div className="text-[17px]">Received INR</div>
                    {t.status === "Success" ? (
                      <div className="border-2 rounded-md text-xs p-[1.5px] border-green-500 text-green-500">
                        success
                      </div>
                    ) : t.status === "Processing" ? (
                      <div className="border-2 rounded-md text-xs p-[1.5px] text-slate-500 border-slate-400">
                        Pending
                      </div>
                    ) : t.status === "Faliure" ? (
                      <div className="border-2 rounded-md text-xs p-[1.5px] text-red-500 border-red-500">
                        failure
                      </div>
                    ) : null}
                  </div>
                  <div className="text-[13px] pl-[1px] text-slate-600">
                    {t.time.toDateString()}
                  </div>
                </div>
                <div className="flex justify-center text-[17px] pt-2">
                  + Rs{t.amount / 100}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
