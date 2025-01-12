"use server";

import { z } from "zod";
import { LoginSchema } from "@repo/common/zodValidation";
import { getUserByEmail } from "@data/user";
import {
  generateVerificationToken,
  generateTwoFactortoken,
} from "@app/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@app/lib/mail";
import { getTwoFactorTokenByEmail } from "@data/two-factor-token";
import { getTwoFactorConfirmationById } from "@data/two-factor-confirmation";
import db from "@repo/db/client";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exists!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      console.log("getTwoFactorTokenByEmail", twoFactorToken);
      
      if (!twoFactorToken) {
        return {error: "Invalid code1"};
      }

      if (twoFactorToken.token !== code) {
        return {error: "Invalid code2"};
      }

      const hasExipred = new Date(twoFactorToken.expires) < new Date;
      if (hasExipred) {
        return {error: "Code expired"};
      }

      await db.twoFactorToken.delete({
        where: {id: twoFactorToken.id}
      })

      // Existing Confirmation
      const existingConfirmation = await getTwoFactorConfirmationById(existingUser.id);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {id: existingConfirmation.id}
        });
      }
      
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactortoken(existingUser.email);
      console.log("twoFactorToken generation: ", twoFactorToken);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      
      return { twoFactor: true };
    } 
  }

  try {
    console.log("Try blocked hit in login.ts");
    const validateUser = await getUserByEmail(email);
    if (validateUser) {
      return { success: "email sent" };
    }
    return { error: "Invalid credentials" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};
