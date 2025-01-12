import db from "@repo/db/client";

export const getTwoFactorConfirmationById = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: {userId}
        });

        return twoFactorConfirmation;
    } catch {
        return null;
    }
}