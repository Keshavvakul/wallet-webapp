import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters requiresd" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters requiresd" }),
  name: z.string().min(1, { message: "Name is required" }),
  phoneNumber: z.string().min(10, {message: "Minimum length is 10"})
});

export const PaymentInformationSchema = z.object({
  token: z.string(),
  userId: z.string(),
  amount: z.number()
})