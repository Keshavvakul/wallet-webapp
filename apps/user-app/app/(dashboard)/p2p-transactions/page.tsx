import { AddMoneyWrapper } from "@components/layout/add-money-wrapper";

const PeerToPeerTransfer = () => {
    return (
        <div className="flex items-center w-full h-full justify-center pb-40 bg-[#e0f5fd]">
            <AddMoneyWrapper title="Send money" firstInputLabel="Phone number" firstInputPlaceholder="Phone number" secondInputLabel="Amount" isTransfer={false}/>
        </div>
    )
}

export default PeerToPeerTransfer;