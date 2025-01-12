import { AddMoneyWrapper } from "@components/layout/add-money-wrapper";
import { BalanceComponent } from "@components/layout/balance";
import { OnRampTransactionComponent } from "@components/layout/onRamp-transactions";
import { onRampTransaction } from "@actions/onRampTransactin";
import { getBalance } from "@actions/getBalance";

const TransferPage = async () => {
    const balance = await getBalance();
    const transactions = await onRampTransaction();

    return (
    <div className="bg-[#e0f5fd] w-full">
        <h1 className="w-28 h-28 font-bold text-5xl p-10 text-[#00baf2]">Transfer</h1>
        <div className="flex justify-between gap-20"> 
            <div className="mt-16 ml-24">
                <AddMoneyWrapper title="Add Money" firstInputLabel="Amount" firstInputPlaceholder="Amount" secondInputLabel="Bank" isTransfer/>
            </div>
            <div className="mt-16 mr-24">
                <BalanceComponent amount={balance.amount} locked={balance.locked}/>
                <div className="mt-16">
                    <OnRampTransactionComponent transactions={transactions}/>
                </div>
            </div>
        </div>
    </div>
        
    )
}

export default TransferPage;