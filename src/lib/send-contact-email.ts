import { createServerFn } from "@tanstack/react-start";
import { renderContactEmail } from "./email-template";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

type ContactResult = { ok: true } | { ok: false; error: string };

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: ContactPayload) => data)
  .handler(async ({ data }): Promise<ContactResult> => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return { ok: false, error: "Email service is not configured." };
    }

    const to = process.env["CONTACT_EMAIL"] || "ahsanmalikking57@gmail.com";
    const from = process.env["RESEND_FROM"] || "Ahsan Bashir Portfolio <onboarding@resend.dev>";

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New letter from ${data.name} — The Ahsan Bashir Times`,
        text: `NEW MESSAGE — The Ahsan Bashir Times\n\nLetter From: ${data.name}\nReply To: ${data.email}\n\n${data.message}\n\n— Ahsan Bashir, Full-Stack & Shopify Developer`,
        html: renderContactEmail(data),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Resend error:", response.status, body);
      return { ok: false, error: "Message failed to send. Please try again later." };
    }

    return { ok: true };
  });
