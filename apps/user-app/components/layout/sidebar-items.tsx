"use client"

import { useRouter, usePathname } from "next/navigation"
import React from "react"

interface SidebarItemsProps {
    icon: React.ReactElement,
    href: string,
    title: string
}

export const SidebarItems = ({icon, href, title}: SidebarItemsProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;
    return (
        <div className="flex cursor-pointer gap-3 pr-52"  onClick={() => {router.push(href)}}>
            <div className={`w-10 h-10 rounded-full ${selected ? "bg-blue-900" : "bg-white"}`}>
                <div className={`pt-2 pl-2 ${selected ? "text-white" : "text-black"}`}>
                {React.cloneElement(icon, { className: `text-2xl ${selected ? "text-white text-2xl" : "text-black text-2xl"}` })}
                 </div>
            </div>

            <div className="text-white font-semibold text-xl pt-1">{title}</div>
        </div>
    )
}

 