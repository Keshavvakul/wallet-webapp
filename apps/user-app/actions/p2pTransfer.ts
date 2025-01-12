"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/lib/auth";
import db from "@repo/db/client";
import { Prisma } from "@prisma/client";

interface p2pTransferResults {
  success: boolean;
  message: string;
}

export const p2pTransfer = async (
  to: string,
  amount: number,
): Promise<p2pTransferResults> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  let retries = 0;
  const MAX_RETRIES = 5;
  if (!userId) {
    return {
      success: false,
      message: "Error while sending money",
    };
  }

  const userToSendMoney = await db.user.findFirst({
    where: {
      phoneNumber: to,
    },
  });

  if (!userToSendMoney) {
    return { success: false, message: "User not found" };
  }

  while (retries < MAX_RETRIES) {
    try {
      await db.$transaction(
        async (tx) => {
          const currentBalance = await tx.balance.findUnique({
            where: { userId: userId },
          });

          console.log("Before sleep");
          await new Promise((resolve) => setTimeout(resolve, 8000));
          console.log("After sleep");

          if (!currentBalance || currentBalance.amount < amount) {
            throw new Error("Insufficient funds");
          }

          await tx.balance.update({
            where: { userId: userId },
            data: {
              amount: {
                decrement: amount,
              },
            },
          });

          await tx.balance.update({
            where: { userId: userToSendMoney.id },
            data: {
              amount: {
                increment: amount,
              },
            },
          });

          await tx.p2pTransfer.create({
            data: {
              fromUserId: userId,
              toUserId: userToSendMoney.id,
              amount: amount,
              timestamp: new Date()
            }
          })
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          timeout: 10000,
        },
      );
      return { success: true, message: "Transfer Successful" };
    } catch (e: any) {
      if (e.code === "P2034") {
        retries++;
        continue;
      }
      console.error(e);
      return {
        success: false,
        message: e instanceof Error ? e.message : "Transfer failed",
      };
    }
  }
  return { success: false, message: "Max retries exceeded" };
};
