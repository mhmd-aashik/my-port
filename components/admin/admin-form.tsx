"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import type { ActionState } from "@/lib/admin/action-state";

// Generic CMS form shell: wires a server action through useActionState and
// renders success/error banners. Fields are passed as (server-rendered)
// children; field-level errors surface next to inputs via FieldError.
export function AdminForm({
  action,
  children,
  submitLabel = "Save",
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  children: React.ReactNode;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5">
      {children}
      {state?.error && (
        <p
          role="alert"
          className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
        >
          {state.error}
        </p>
      )}
      {state?.fieldErrors && (
        <ul className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {Object.entries(state.fieldErrors).map(([field, msg]) => (
            <li key={field}>
              <span className="font-mono text-xs">{field}</span>: {msg}
            </li>
          ))}
        </ul>
      )}
      {state?.success && (
        <p
          role="status"
          className="rounded-md border border-accent/30 bg-accent-soft px-3 py-2 text-sm text-accent"
        >
          {state.success}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {submitLabel}
      </button>
    </form>
  );
}
