"use client"

import { Session } from "inspector/promises";
import { useSession } from "next-auth/react";

export const WelcomeMsgComponent = () => {
    const session = useSession();

    return (
        <div className="bg-gradient-to-b from-blue-600 to-blue-400 w-full px-4 py-8 pb-28 lg:px-14 space-y-2 mb-4x4 absolute">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">Welcome {session ? session.data?.user.name : ""}</h2>
            <p className="text-sm  lg:text-base text-[#89b6fd]">This is Your transaction history</p>
        </div>
    )
}