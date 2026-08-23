import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs",
        variant === "accent"
          ? "border-accent/30 bg-accent-soft text-accent"
          : "border-border bg-surface-raised text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
