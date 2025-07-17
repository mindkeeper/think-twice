import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { FontBrand } from "@/utils/font";

export default function TopNavigation({ title }) {
  return (
    <div className="fixed bg-white w-full max-w-lg z-10 flex gap-x-1 items-center px-1 py-1">
      <div className="mt-1">
        <BackButton />
      </div>
      <div className={cn("text-lg font-bold", FontBrand.className)}>
        {title}
      </div>
    </div>
  );
}
