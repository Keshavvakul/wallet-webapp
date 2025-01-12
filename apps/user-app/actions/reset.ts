"use server"

import { ResetSchema } from "@repo/common/zodValidation";
import { getUserByEmail } from "@data/user";
import { sendPasswordResetEmail } from "@app/lib/mail";
import { generatePasswordResetToken } from "@app/lib/tokens";
import {z} from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid email!"};
    }

    const { email } = validatedFields.data;
    console.log("email is", email)
    
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return {error: "Email not foundddd"};
    }

    // TODO: send reset token and email;
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return {success: "email sent!"};
}