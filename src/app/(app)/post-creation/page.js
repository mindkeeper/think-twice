import { CreatePostForm } from "./_components/CreatePostForm";
import { getCategories } from "@/lib/services/categories";
import { getSession } from "@/lib/services/session";
import { redirect } from "next/navigation";

export default async function PostCreationPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const categories = await getCategories();
  return (
    <main className="min-h-screen mt-14">
      <CreatePostForm categories={categories} />
    </main>
  );
}
