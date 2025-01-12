"use server"

import { z } from "zod";
import { NewPasswordSchema } from "@repo/common/zodValidation";
import { getPasswordResetTokenByToken } from "@data/password-reset-token";
import { getUserByEmail } from "@data/user";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return {error: "missing reset password token"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {password} = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return {error: "Invalid token"};
    }

    const hasExipred = new Date(existingToken.expires) < new Date();
    if (hasExipred) {
        return {error: "Token expired"};
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {error: "Email doesnot exists"};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Password Updated"};
}