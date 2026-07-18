import { AdminPageHeader } from "@/components/admin/ui";
import { PostForm } from "../post-form";

export default function NewPostPage() {
  return (
    <>
      <AdminPageHeader title="New post" />
      <PostForm />
    </>
  );
}
