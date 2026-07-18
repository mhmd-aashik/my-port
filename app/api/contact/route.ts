import { NextResponse } from "next/server";
import { db, tables } from "@/db";
import { clientIp } from "@/lib/admin/auth";
import { rateLimit } from "@/lib/admin/rate-limit";
import { validateContact, type ContactPayload } from "@/lib/validation";

export async function POST(req: Request) {
  // Spam control: 5 submissions per 10 minutes per IP.
  const ip = await clientIp();
  const { allowed } = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  let data: Partial<ContactPayload>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const { valid, errors } = validateContact(data);
  if (!valid) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Primary store: PostgreSQL. Email notification is best-effort on top.
  try {
    await db.insert(tables.contactMessages).values({
      name: data.name!.trim(),
      email: data.email!.trim(),
      company: (data.company ?? "").trim(),
      opportunityType: (data.opportunityType ?? "").trim(),
      subject: data.subject!.trim(),
      message: data.message!.trim(),
    });
  } catch (err) {
    console.error("Failed to store contact message:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email me directly." },
      { status: 500 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // TODO: verified domain sender
        to: "aashikdevelop@gmail.com",
        replyTo: data.email!,
        subject: `[Portfolio] ${data.opportunityType ?? "Enquiry"}: ${data.subject}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "—"}`,
          `Type: ${data.opportunityType || "—"}`,
          "",
          data.message,
        ].join("\n"),
      });
    } catch (err) {
      // Message is already safely stored; notification failure is non-fatal.
      console.error("Contact email notification failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
