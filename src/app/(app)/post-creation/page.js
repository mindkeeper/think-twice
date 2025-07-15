import { CreatePostForm } from "./_components/CreatePostForm";
import BackButton from "@/components/BackButton";
import { getCategories } from "@/lib/services/categories";

export default async function PostCreationPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen">
      <div className="flex justify-between items-center py-2">
        <BackButton />
        <div className="text-sm font-bold">Post</div>
        <div className="w-12"></div>
      </div>
      <CreatePostForm categories={categories} />
    </main>
  );
}
