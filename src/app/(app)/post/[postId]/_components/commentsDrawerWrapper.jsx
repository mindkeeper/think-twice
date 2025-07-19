import { getSession } from "@/lib/services/session";
import { getCommentsByPostId } from "@/lib/services/comment";
import { CommentsDrawer } from "./commentsDrawer";
import { getPostById } from "@/lib/services/post";

export default async function CommentsDrawerWrapper({ trigger, postId }) {
  const session = await getSession();
  const comments = await getCommentsByPostId(postId);
  const post = await getPostById(postId);
  const ownedPost = session?.user?.id === post.user.id;

  return (
    <CommentsDrawer
      trigger={trigger}
      postId={postId}
      comments={comments}
      session={session}
      authorId={post.userId}
      ownedPost={ownedPost}
    />
  );
}
