import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, MapPin, MessageCircle, Download } from "lucide-react";
import { toast } from "sonner";
import { PERSON } from "./data";
import { sendContactEmail, type ContactPayload } from "@/lib/send-contact-email";
import qrCode from "@/assets/qrcode.png";
import { Logo } from "./Logo";
import { fadeUp, stagger, viewportOnce } from "./motion";

type SendStatus = "idle" | "sending" | "sent";

const LISTINGS = [
  { icon: Mail, label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: PERSON.phone,
    href: `https://wa.me/${PERSON.whatsapp}`,
  },
  { icon: Linkedin, label: "LinkedIn", value: "Ahsan Bashir", href: PERSON.linkedin },
  {
    icon: MapPin,
    label: "Location",
    value: PERSON.city,
    href: "https://www.google.com/maps/place/Faisalabad,+Pakistan",
  },
];

export function Contact() {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [form, setForm] = useState<ContactPayload>({ name: "", email: "", message: "" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const result = await sendContactEmail({ data: form });
      if (!result.ok) {
        setStatus("idle");
        toast.error(result.error);
        return;
      }
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
      toast.success("Message sent — I'll reply within two working days.");
    } catch (error) {
      console.error(error);
      setStatus("idle");
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="bg-paper-alt" aria-labelledby="contact-title">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-5 py-14"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex items-baseline justify-between border-b border-ink pb-2"
        >
          <h2
            id="contact-title"
            className="font-display text-3xl font-black uppercase tracking-wider sm:text-4xl"
          >
            Get in Touch
          </h2>
          <span className="eyebrow text-muted-foreground">Contact the developer</span>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            className="border-2 border-ink bg-card p-6 shadow-paper"
          >
            <p className="eyebrow border-b border-border pb-2 text-primary">Start a project</p>
            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="name" className="eyebrow block text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  disabled={status === "sending"}
                  className="mt-1.5 w-full border-b border-ink bg-transparent py-2 font-serif text-base outline-none focus:border-primary disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="email" className="eyebrow block text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  disabled={status === "sending"}
                  className="mt-1.5 w-full border-b border-ink bg-transparent py-2 font-serif text-base outline-none focus:border-primary disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="message" className="eyebrow block text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  disabled={status === "sending"}
                  className="mt-1.5 w-full resize-none border-b border-ink bg-transparent py-2 font-serif text-base outline-none focus:border-primary disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="eyebrow w-full border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:border-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                    ? "Sent — thank you"
                    : "Send message"}
              </button>
            </div>
          </motion.form>

          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={`https://wa.me/${PERSON.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 border border-ink bg-card p-4 text-center transition-[transform,border-color,box-shadow] duration-250 hover:-translate-y-1 hover:border-ink hover:shadow-paper"
            >
              <span className="eyebrow text-primary">Scan to connect</span>
              <img
                src={qrCode}
                alt={`${PERSON.name} WhatsApp QR code`}
                width={267}
                height={264}
                className="size-40 border border-border bg-paper object-contain p-1"
              />
              <span className="wrap-break-words text-[15px]">WhatsApp — {PERSON.phone}</span>
            </a>
            {LISTINGS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 border border-border bg-card p-4 transition-[transform,border-color,box-shadow] duration-250 hover:-translate-y-1 hover:border-ink hover:shadow-paper"
              >
                <l.icon className="size-5 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0">
                  <span className="eyebrow block text-muted-foreground">{l.label}</span>
                  <span className="wrap-break-words text-[15px]">{l.value}</span>
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <footer className="border-t border-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6">
          <div className="flex items-center gap-3">
            <Logo className="size-9 shrink-0" />
            <p className="font-display text-sm uppercase tracking-[0.14em]">
              {PERSON.paper} © 2026 — All Rights Reserved
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSON.resume}
              download
              className="eyebrow inline-flex items-center gap-1.5 border border-ink px-4 py-2 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-paper"
            >
              <Download className="size-3.5" />
              Resume
            </a>
            <p className="text-[13px] italic text-muted-foreground">
              Printed on the open web, in {PERSON.city}.
            </p>
          </div>
        </div>
        <div className="h-0.75 bg-ink" />
        <div className="mt-0.75 h-px bg-ink" />
      </footer>
    </section>
  );
}
