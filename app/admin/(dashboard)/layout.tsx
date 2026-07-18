import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { requireAdminPage } from "@/lib/admin/auth";
import { logout } from "@/app/admin/login/actions";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: { default: "CMS", template: "%s — CMS" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate every dashboard page. Individual server actions ALSO verify the
  // session via requireAdmin() — this layout is UX, not the security boundary.
  await requireAdminPage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <p className="font-mono text-sm">
          <span className="text-accent">~/</span>aashik · CMS
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            <LogOut className="size-3.5" aria-hidden /> Log out
          </button>
        </form>
      </div>
      <div className="grid gap-8 lg:grid-cols-[190px_1fr]">
        <AdminNav />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
