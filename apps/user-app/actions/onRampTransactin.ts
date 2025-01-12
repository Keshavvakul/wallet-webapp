"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@app/lib/auth";
import db from "@repo/db/client";

export const onRampTransaction = async () => {
    const session = await getServerSession(authOptions);

    const transactions = await db.onRampTransaction.findMany({
        where: {
            userId: session?.user.id
        }
    });

    return transactions.map(e => ({
        time: e.startTime,
        amount: e.amount,
        status: e.status,
        provider: e.provider
    }))
}