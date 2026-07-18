"use client";

import { useActionState } from "react";
import type { ActionState } from "@/lib/admin/action-state";
import { setMessageStatus } from "./actions";

const options = ["unread", "read", "replied", "archived", "spam"] as const;

export function StatusButtons({ id, current }: { id: string; current: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    setMessageStatus,
    null
  );

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {options
        .filter((o) => o !== current)
        .map((status) => (
          <form key={status} action={action}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="status" value={status} />
            <button
              type="submit"
              disabled={pending}
              className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-foreground disabled:opacity-50"
            >
              {status}
            </button>
          </form>
        ))}
      {state?.error && <span className="text-xs text-red-400">{state.error}</span>}
    </div>
  );
}
