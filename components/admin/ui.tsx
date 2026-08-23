import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border bg-surface text-left">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-subtle"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-c)]">{children}</tbody>
      </table>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "border-accent/30 bg-accent-soft text-accent",
    draft: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
    archived: "border-border bg-surface-raised text-subtle",
    unread: "border-accent/30 bg-accent-soft text-accent",
    read: "border-border bg-surface-raised text-muted",
    replied: "border-green-500/30 bg-green-500/10 text-green-500",
    spam: "border-red-500/30 bg-red-500/10 text-red-400",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 font-mono text-xs",
        styles[status] ?? "border-border text-muted"
      )}
    >
      {status}
    </span>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border-strong p-10 text-center text-sm text-subtle">
      {message}
    </div>
  );
}
