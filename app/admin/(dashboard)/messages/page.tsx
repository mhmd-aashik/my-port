import { desc, eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader, EmptyState, StatusBadge } from "@/components/admin/ui";
import { StatusButtons } from "./status-buttons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

const filters = ["all", "unread", "read", "replied", "archived", "spam"] as const;

export default async function MessagesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = filters.includes(status as (typeof filters)[number])
    ? (status as (typeof filters)[number])
    : "all";

  const messages = await db
    .select()
    .from(tables.contactMessages)
    .where(
      filter === "all"
        ? undefined
        : eq(tables.contactMessages.status, filter)
    )
    .orderBy(desc(tables.contactMessages.createdAt))
    .limit(100);

  return (
    <>
      <AdminPageHeader
        title="Contact Messages"
        description="Submissions from the public contact form. Never exposed publicly."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/admin/messages" : `/admin/messages?status=${f}`}
            className={cn(
              "rounded-full border px-3.5 py-1 font-mono text-xs transition-colors",
              filter === f
                ? "border-accent/40 bg-accent-soft text-accent"
                : "border-border text-muted hover:text-foreground"
            )}
          >
            {f}
          </Link>
        ))}
      </div>

      {messages.length === 0 ? (
        <EmptyState message="No messages in this view." />
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <details
              key={msg.id}
              className={cn(
                "rounded-lg border bg-surface p-4",
                msg.status === "unread" ? "border-accent/40" : "border-border"
              )}
            >
              <summary className="cursor-pointer">
                <span className="mr-3 font-medium">{msg.subject}</span>
                <span className="mr-3 text-sm text-muted">
                  {msg.name} · {msg.email}
                </span>
                <StatusBadge status={msg.status} />
                <span className="ml-3 font-mono text-xs text-subtle">
                  {new Date(msg.createdAt).toLocaleString("en-GB")}
                </span>
              </summary>
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <p className="font-mono text-xs text-subtle">
                  {msg.company && `Company: ${msg.company} · `}
                  {msg.opportunityType && `Type: ${msg.opportunityType}`}
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
                  {msg.message}
                </p>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="text-sm text-accent hover:underline"
                  >
                    Reply by email
                  </a>
                  <StatusButtons id={msg.id} current={msg.status} />
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </>
  );
}
