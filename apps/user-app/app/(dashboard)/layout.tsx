import { AppBar } from "@repo/ui/components/appbar";
import { SidebarItems } from "@components/layout/sidebar-items";
import { IoHomeOutline } from "react-icons/io5";
import { TbTransfer } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppBar />
            <hr className="border-blue-200"/> 
            <div className="flex h-full">
                <div className="flex flex-col pt-24 pl-14 gap-4 bg-[#00baf2]">
                    <SidebarItems icon={<IoHomeOutline className="text-blue-950"/>} title="home" href="/dashboard"/>
                    <SidebarItems icon={<TbTransfer className="text-blue-950"/>} title="transfer" href="/transfer"/>
                    <SidebarItems icon={<CiClock2 className="text-blue-950"/>} title="transaction" href="/transaction"/>
                    <SidebarItems icon={<FaArrowTrendUp className="text-blue-600"/>} title="p2p transfer" href="/p2p-transactions" />
                </div>        
                <div className="border-l-2 border-blue-200 h-full ml-0 bg-[#00baf2]"></div>
                {children}s
            </div>
            
        </>
        
    )
}