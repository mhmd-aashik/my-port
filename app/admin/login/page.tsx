import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        Owner access
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">CMS Login</h1>
      <p className="mt-2 text-sm text-muted">
        Enter the administrator passcode to manage site content.
      </p>
      <LoginForm />
    </div>
  );
}
