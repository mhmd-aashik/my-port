import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-accent";

export function Field({
  label,
  name,
  hint,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-subtle">{hint}</p>}
    </div>
  );
}

export function TextInput({
  label,
  name,
  defaultValue,
  hint,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <Field label={label} name={name} hint={hint}>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className={inputCls}
      />
    </Field>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  hint,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  rows?: number;
}) {
  return (
    <Field label={label} name={name} hint={hint}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={cn(inputCls, "font-mono text-xs leading-relaxed")}
      />
    </Field>
  );
}

export function SelectInput({
  label,
  name,
  defaultValue,
  options,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
  hint?: string;
}) {
  return (
    <Field label={label} name={name} hint={hint}>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={cn(inputCls, "appearance-none")}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function CheckboxInput({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="size-4 accent-[var(--accent)]"
      />
      {label}
    </label>
  );
}

export function StatusSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <SelectInput
      label="Status"
      name="status"
      defaultValue={defaultValue ?? "draft"}
      options={[
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" },
        { value: "archived", label: "Archived" },
      ]}
      hint="Drafts and archived items never appear on the public site."
    />
  );
}
