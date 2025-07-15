import { getSession } from "@/lib/services/session";
import { getCommentsByPostId } from "@/lib/services/comment";
import { CommentsDrawer } from "./commentsDrawer";

export default async function CommentsDrawerWrapper({ trigger, postId }) {
  const session = await getSession();
  const comments = await getCommentsByPostId(postId);

  return (
    <CommentsDrawer
      trigger={trigger}
      postId={postId}
      comments={comments}
      session={session}
    />
  );
}
