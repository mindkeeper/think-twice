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

const INITIAL_STATE = {
  error: "",
};
export default function SignInPage() {
  const [state, action, pending] = useActionState(signInAction, INITIAL_STATE);
  console.log(state);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form action={action} className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="input your password"
                required
              />
              {state.error && (
                <p className="text-red-500 text-sm">{state.error}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={pending}>
                Sign in
              </Button>
            </div>
          </form>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <GoogleLogin />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
