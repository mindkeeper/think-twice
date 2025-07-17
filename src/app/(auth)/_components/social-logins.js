import { Button } from "@/components/ui/button";
import { googleLoginAction } from "@/lib/services/auth";
import { FontBrand } from "@/utils/font";
import { cn } from "@/lib/utils";

export const GoogleLogin = () => {
  return (
    <form action={googleLoginAction}>
      <Button
        className={cn(
          "w-full h-12 text-lg text-black rounded-lg bg-gradient-to-b from-slate-100 to-slate-300 hover:from-slate-200 hover:to-slate-400 transition-colors duration-300",
          FontBrand.className
        )}
      >
        Continue with Google
      </Button>
    </form>
  );
};
