"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  opportunityTypes,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-accent";

function Field({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const emptyForm: ContactPayload = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  opportunityType: opportunityTypes[0],
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: keyof ContactPayload) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { valid, errors: fieldErrors } = validateContact(form);
    setErrors(fieldErrors);
    if (!valid) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await res.json();
      if (!res.ok) {
        if (body.errors) setErrors(body.errors);
        setServerError(body.error ?? "Please check the highlighted fields.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setServerError(
        "Could not reach the server. Please try again or email me directly."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-10 text-center"
      >
        <CheckCircle2 className="size-8 text-accent" aria-hidden />
        <h3 className="text-lg font-semibold">Message sent</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thanks for reaching out — I usually respond within one to two
          business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-accent hover:text-accent-strong"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" id="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={inputCls}
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field label="Email" id="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls}
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" id="company" error={errors.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={inputCls}
            value={form.company}
            onChange={(e) => set("company")(e.target.value)}
          />
        </Field>
        <Field label="Opportunity type" id="opportunityType" error={errors.opportunityType}>
          <select
            id="opportunityType"
            name="opportunityType"
            className={cn(inputCls, "appearance-none")}
            value={form.opportunityType}
            onChange={(e) => set("opportunityType")(e.target.value)}
          >
            {opportunityTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Subject" id="subject" error={errors.subject} required>
        <input
          id="subject"
          name="subject"
          className={inputCls}
          value={form.subject}
          onChange={(e) => set("subject")(e.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
      </Field>

      <Field label="Message" id="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={inputCls}
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot — hidden from real users, catches naive bots */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website")(e.target.value)}
        />
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-400">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden /> Send message
          </>
        )}
      </button>
    </form>
  );
}
