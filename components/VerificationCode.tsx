"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verCode } from "@/app/actions/auth";
import { useState } from "react";

const FormSchema = z.object({
  verificationCode: z.string().min(1, {
    message: "Your code must be 6 characters.",
  }),
});

export function VerificationCode() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      setErrorMessage(null);
      const res = await verCode(data.verificationCode);
      console.log(res.message);
    } catch (error) {
      setErrorMessage("Invalid code, please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="h-screen bg-orange-100 p-2 md:p-6 grid place-items-center">
      <div className=" bg-white p-10 rounded-3xl text-center flex flex-col items-center justify-center w-full lg:w-fit mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-10"
          >
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="space-y-6">
                  <FormLabel
                    className={
                      errorMessage
                        ? "text-red-600 capitalize font-semibold text-xl"
                        : "capitalize font-semibold text-xl"
                    }
                  >
                    verification code
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription
                    className={errorMessage ? "text-red-600" : ""}
                  >
                    {errorMessage
                      ? errorMessage
                      : "Please enter the verification code sent to sign up."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-green-700 hover:bg-green-800 uppercase rounded-xl"
              type="submit"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
