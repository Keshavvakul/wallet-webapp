"use server"

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/lib/auth";

export const createOnRampTransaction = async (provider: string, amount: number) => {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = Math.floor((Math.random() * 1000)).toString();

    await db.onRampTransaction.create({
        data: {
            provider,
            amount: amount * 100,
            startTime: new Date(),
            token: token,
            userId: session?.user.id,
            status: "Processing"
        }
    })
}