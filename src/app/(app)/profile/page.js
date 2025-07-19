import { getSession } from "@/lib/services/session";
import { getPostCountByUserId, getUserPostList } from "@/lib/services/post";
import { redirect } from "next/navigation";
import ClientProfile from "./components/clientProfile";
import { getUserBookmarkedPost } from "@/lib/services/bookmark";

export async function generateMetadata(
  { params: _params, searchParams: _searchParams },
  _parent
) {
  const session = await getSession();
  return {
    title: `${session?.user.name || "Profile"} - Think Twice`,
    description: "User profile page for managing posts and bookmarks.",
  };
}

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const user = session.user;
  const postCount = await getPostCountByUserId(user.id);
  const wishlistPosts = await getUserPostList(user.id);
  const bookmarkedPosts = await getUserBookmarkedPost(user.id);
  const avatarUrl = user.avatarUrl || "/images/default-avatar.jpg";

  return (
    <ClientProfile
      user={user}
      postCount={postCount}
      avatarUrl={avatarUrl}
      posts={wishlistPosts}
      bookmarkedPosts={bookmarkedPosts}
    />
  );
}
