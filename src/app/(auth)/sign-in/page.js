"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/lib/services/auth";
import Link from "next/link";
import { useActionState } from "react";
import { GoogleLogin } from "../_components/social-logins";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";
import Image from "next/image";

const INITIAL_STATE = {
  error: "",
};

export default function SignInPage() {
  const [state, action, pending] = useActionState(signInAction, INITIAL_STATE);

  return (
    <div className="min-h-screen flex flex-col w-full max-w-md mx-auto">
      <div className="bg-gradient-to-b from-sky-300 to-blue-500 min-h-[180px] flex items-center justify-center">
        <Image
          src="/think-twice.svg"
          alt="Logo"
          width={220}
          height={220}
          className="-translate-y-5"
        />
      </div>

      <div className="flex flex-col flex-1 -mt-6">
        <Card className="flex flex-col justify-between flex-1 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className={cn("text-2xl", FontBrand.className)}>
              Sign in
            </CardTitle>
            <CardDescription>
              Fill the form below to sign in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 flex-1">
            <form action={action} className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label
                  htmlFor="email"
                  className={cn("text-sm", FontBrand.className)}
                >
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-full h-12 bg-slate-100"
                />
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="password"
                  className={cn("text-sm", FontBrand.className)}
                >
                  Password
                </Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="input your password"
                  required
                  className="rounded-full h-12 bg-slate-100"
                />
                {state.error && (
                  <p className="text-red-500 text-sm">{state.error}</p>
                )}
              </div>
              <Button
                type="submit"
                className={cn(
                  "w-full h-12 text-lg bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-colors duration-300",
                  FontBrand.className
                )}
                disabled={pending}
              >
                Sign in
              </Button>
            </form>

            <div className="my-2 text-center text-sm relative">
              <div className="absolute inset-0 top-1/2 border-t border-border z-0" />
              <span className="bg-background relative z-10 px-2 text-muted-foreground">
                or
              </span>
            </div>

            <GoogleLogin />

            <div className="mt-3 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 font-semibold"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
