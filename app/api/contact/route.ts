import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/validation";
import { profile } from "@/data/profile";

export async function POST(req: Request) {
  let data: Partial<ContactPayload>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const { valid, errors } = validateContact(data);
  if (!valid) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // TODO: set RESEND_API_KEY (and verify a sending domain) to enable email delivery.
    console.warn("Contact form submitted but RESEND_API_KEY is not configured.");
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // TODO: replace with verified domain sender
      to: profile.email,
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
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email me directly." },
      { status: 500 }
    );
  }
}
