"use server"

import db from "@repo/db/client";
import { getUserByEmail, getUserById } from "@data/user";
import { getVerificationTokenByToken } from "@data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    console.log("Token for verification", existingToken);
    if (!existingToken) {
        return {error: "Token does not existsssss"};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {error: "Verification token expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {error: "Email doen not exists"}
    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    });

    return {success: "Email Verified"}};