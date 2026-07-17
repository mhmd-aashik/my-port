import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong",
        className
      )}
    >
      {children}
    </div>
  );
}
