"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/ui/card";
import { DataTable } from "./data-table";
import { columns } from "@app/(dashboard)/transaction/columns";
import { useEffect, useState } from "react";
import { getTransactions } from "@actions/getTransactions";

type Transaction = {
    amount: number,
    timestamp: string,
    phonenumber: number
}

export const AllTransactionsComponent = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions();
                console.log("data inside useEffect", data);
                setTransactions(data || []);
            } catch(e) {
                console.error("Falied to get the data", e);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="w-full bg-white pb-10 mt-40 pl-10 pr-10 max-w-screen-2xl">
        <Card className="border-none drop-shadow-sm bg-white">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Transactions page
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={transactions}/>
            </CardContent>
        </Card>
    </div>     
    )
}