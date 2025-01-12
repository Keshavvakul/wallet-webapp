"use server"

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/lib/auth";

export const getTransactions = async() => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
        return []
    }

    const transactions = await db.p2pTransfer.findMany({
        where: {
            fromUserId: userId
        },
        include: {
            toUser: {
                select: {
                    phoneNumber: true,
                }
            }
        }
    })

    console.log("Recent transactions for the user", userId);
    console.log(transactions);
    const formattedTransactions = transactions.map((transactions) => ({
        amount: transactions.amount / 100,
        phonenumber: Number(transactions.toUser.phoneNumber),
        timestamp: new Intl.DateTimeFormat("en-Us", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(transactions.timestamp),
    }));
    return formattedTransactions;
}

