"use client"

import { Button } from "@repo/ui/components/ui/button";
import {signOut} from "next-auth/react"

interface AppBarProps {
    onSignOut: typeof signOut
}

export const AppBar = () => {
    return (
        <div className="flex justify-between p-4">
            <div className="text-blue-600 text-xl font-semibold pl-52 pt-1">
                <a href="/dashboard">V-Bank</a>
            </div>
            <div className="pr-52">
            <Button size="lg" className="font-semibold bg-[#00baf2] text-white hover:bg-blue-900" onClick={() => signOut()}>
                Signout
            </Button>
            </div>
        </div>
        
    )
}