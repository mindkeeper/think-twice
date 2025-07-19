import SigninForm from "./_components/SigninForm";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account to access Think Twice features.",
};

export default async function SignInPage() {
  return <SigninForm />;
}
