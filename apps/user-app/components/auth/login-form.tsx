"use client";

import { CardWrapper } from "@components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "@repo/common/zodValidation";
import { Button } from "@repo/ui/components/ui/button";
import { FormError } from "@repo/ui/components/form-error";
import { FormSuccess } from "@repo/ui/components/form-success";
import { useTransition, useState } from "react";
import { login } from "@actions/login";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log("onSubmit handler ");
    console.log(values);
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data) {
            if (data.error) {
              form.reset();
              setError(data.error);
            }
            if (data.success) {
              form.reset();
              setSuccess(data.success);
              signIn("credentials", {
                email: values.email,
                password: values.password,
                redirectTo: "/dashboard",
              });
            }
            if (data.twoFactor) {
              setShowTwoFactor(true);
            }
          } else {
            setError("An unknown error occurred.");
          }
        })
        .catch(() => {
          setError("Something went wrong in login");
        });
    });
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHrf="/auth/signup"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            {showTwoFactor && (
               <FormField
               control={form.control}
               name="code"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Two Factor Code</FormLabel>
                   <FormControl>
                     <Input
                       {...field}
                       placeholder="123456"
                       disabled={isPending}
                     />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe@example.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="*******"
                          type="password"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            size="xl"
            className="w-full bg-blue-600 text-white text-lg"
          >
            {showTwoFactor ? "Confirm" : "Submit"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
