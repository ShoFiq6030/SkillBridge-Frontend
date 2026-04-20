"use client";

import { Button } from "@/components/ui/button";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient, signInWithGoogle } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useState } from "react";
import { env } from "@/env";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email({
          ...value,
          callbackURL: "/",
        });
        console.log(data);

        if (error) {
          toast.error(error.message || "Something went wrong, please try again.", { id: toastId });
          return;
        }
        toast.success("User Logged in Successfully", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      await signInWithGoogle();
      setIsLoading(false);
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your information below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field className="relative">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {
                      <div className="absolute left-77 top-10 cursor-pointer">
                        {showPassword ? (
                          <IoEyeOff onClick={() => setShowPassword(false)} />
                        ) : (
                          <IoEye onClick={() => setShowPassword(true)} />
                        )}
                      </div>
                    }

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <p>
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
        {isLoading ? (
          <Button className="flex items-center justify-center w-full" disabled>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </Button>
        ) : (
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            type="button"
            disabled={isLoading}
            className={`w-full ${isLoading && "cursor-not-allowed opacity-50 "}`}
          >
            <FcGoogle /> Continue with Google
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
