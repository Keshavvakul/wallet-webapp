interface BalanceComponentProps {
  amount: number,
  locked: number
}

export const BalanceComponent = ({amount, locked}: BalanceComponentProps) => {
  return (
    <>
      <div className="w-[600px]">
        <h1 className="text-3xl font-semibold pb-4">Balance</h1>
        <div className="flex justify-between border-b border-black pb-5">
          <div>Unlocked Balance</div>
          <div>{amount / 100} INR</div>
        </div>
        <div className="flex justify-between border-b border-black pb-5">
          <div className="mt-2">Total Locked Balance</div>
          <div className="mt-2">{locked / 100} INR</div>
        </div>
        <div className="flex justify-between pb-5">
          <div className="mt-2">Total Balance</div>
          <div className="mt-2">{(amount + locked) / 100} INR</div>
        </div>
      </div>
    </>
  );
};

