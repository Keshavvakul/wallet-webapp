"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@app/lib/auth";
import db from "@repo/db/client";

export const getBalance = async () => {
    const session = await getServerSession(authOptions);

    const balance = await db.balance.findFirst({
        where: {
            userId: session?.user.id
        }
    });

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}