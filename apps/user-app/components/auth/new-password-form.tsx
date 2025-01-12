"use client";

import { CardWrapper } from "@components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NewPasswordSchema } from "@repo/common/zodValidation";
import { Button } from "@repo/ui/components/ui/button";
import { FormError } from "@repo/ui/components/form-error";
import { FormSuccess } from "@repo/ui/components/form-success";
import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@actions/new-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    console.log("onSubmit handler ");
    console.log(values);
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data) {
          setError(data.error || ""); // Handle undefined errors
          setSuccess(data.success || "");
        } else {
          setError("An unknown error occurred.");
        }
      });
    });
  };

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="enter New Password"
      backButtonLabel="Back to signin"
      backButtonHrf="/auth/signin"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            size="xl"
            className="w-full bg-blue-600 text-white text-lg"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
