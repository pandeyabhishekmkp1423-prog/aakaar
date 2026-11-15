import { useParams } from "react-router-dom";
import { PostEditor } from "@/components/admin/PostEditor";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;

  return <PostEditor postId={postId} />;
}
