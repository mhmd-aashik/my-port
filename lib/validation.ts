// Shared contact-form validation, used on both client and server.
// Kept dependency-free deliberately; swap for Zod if the schema grows.

export const opportunityTypes = [
  "Full-time role",
  "Contract project",
  "Freelance work",
  "Collaboration",
  "Technical consulting",
  "General enquiry",
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  opportunityType: string;
  website: string; // honeypot — must stay empty
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: Partial<ContactPayload>): {
  valid: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  if (!data.name?.trim()) errors.name = "Please enter your name.";
  else if (data.name.trim().length > 100) errors.name = "Name is too long.";

  if (!data.email?.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (!data.subject?.trim()) errors.subject = "Please enter a subject.";
  else if (data.subject.trim().length > 150)
    errors.subject = "Subject is too long.";

  if (!data.message?.trim()) errors.message = "Please enter a message.";
  else if (data.message.trim().length < 20)
    errors.message = "Please add a little more detail (at least 20 characters).";
  else if (data.message.trim().length > 5000)
    errors.message = "Message is too long.";

  if (
    data.opportunityType &&
    !opportunityTypes.includes(data.opportunityType as (typeof opportunityTypes)[number])
  ) {
    errors.opportunityType = "Please choose a valid opportunity type.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
