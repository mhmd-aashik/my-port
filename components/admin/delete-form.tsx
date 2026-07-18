"use client";

import { useActionState, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import type { ActionState } from "@/lib/admin/action-state";

// Two-step inline delete confirmation (no browser confirm dialogs).
export function DeleteForm({
  action,
  id,
  label = "Delete",
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  id: string;
  label?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, pending] = useActionState(action, null);

  if (!confirming) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
        >
          <Trash2 className="size-3.5" aria-hidden /> {label}
        </button>
        {state?.error && (
          <p role="alert" className="mt-1 text-xs text-red-400">
            {state.error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="inline-flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <span className="text-xs text-muted">Are you sure?</span>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1 rounded-md bg-red-500/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-60"
      >
        {pending && <Loader2 className="size-3 animate-spin" aria-hidden />}
        Yes, delete
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-md border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
      >
        Cancel
      </button>
    </form>
  );
}
