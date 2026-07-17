"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// Renders both icons and lets the `dark` class decide which is visible,
// avoiding a mounted-state effect and any hydration flicker.
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 text-muted transition-colors hover:text-foreground"
    >
      <Sun className="hidden size-4.5 dark:block" aria-hidden />
      <Moon className="size-4.5 dark:hidden" aria-hidden />
    </button>
  );
}
