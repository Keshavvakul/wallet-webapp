"use server";

import db from "@repo/db/client";
import { getUserByEmail } from "@data/user";
import { z } from "zod";
import { RegisterSchema } from "@repo/common/zodValidation";
import { generateVerificationToken } from "@app/lib/tokens";
import { sendVerificationEmail } from "@app/lib/mail";
import bcrypt from "bcrypt";

export const signup = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  try {
    const { email, name, password, phoneNumber } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const creatingUser = await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber
    },
  });

  // Creating initial balance table for user
  const initialBalanceData = await db.balance.create({
    data: {
      userId: creatingUser.id,
      amount: 0,
      locked: 0
    }
  })

  // Send Varification token email
  const verificationToken = await generateVerificationToken(email);
  console.log(verificationToken);
  const emailSent = await sendVerificationEmail(verificationToken.email, verificationToken.token);
  console.log(emailSent);


  return { success: "Confirmation email sent" };
  }
   catch (e) {
    console.log(e);
    return {error: "Something went wrong"};
  }
}