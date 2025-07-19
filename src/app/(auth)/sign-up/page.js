import SignupForm from "./_components/SignupForm";

export const metadata = {
  title: "Sign Up",
  description: "Create a new account to start using Think Twice.",
};

export default async function SignUpPage() {
  return <SignupForm />;
}
