import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-accent text-background hover:opacity-90 border border-transparent",
  secondary:
    "border border-border-strong text-foreground hover:border-accent hover:text-foreground bg-transparent",
  ghost: "text-muted hover:text-foreground border border-transparent",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof styles;
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all",
    styles[variant],
    className
  );
  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
