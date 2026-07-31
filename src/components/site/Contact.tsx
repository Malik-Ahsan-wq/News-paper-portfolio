import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PERSON } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";

const LISTINGS = [
  { icon: Mail, label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "/in/eliashart", href: "https://linkedin.com" },
  { icon: Github, label: "GitHub", value: "@eliashart", href: "https://github.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "+351 900 000 000", href: "https://wa.me/351900000000" },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Letter received — I'll reply within two working days.");
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
        <motion.div variants={fadeUp} className="mb-8 flex items-baseline justify-between border-b border-ink pb-2">
          <h2 id="contact-title" className="font-display text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl">
            Classifieds
          </h2>
          <span className="eyebrow text-muted-foreground">Contact the editor</span>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            className="border-2 border-ink bg-card p-6 shadow-paper"
          >
            <p className="eyebrow border-b border-border pb-2 text-primary">Place your notice</p>
            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="name" className="eyebrow block text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-1.5 w-full border-b border-ink bg-transparent py-2 font-serif text-base outline-none focus:border-primary"
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
                  className="mt-1.5 w-full border-b border-ink bg-transparent py-2 font-serif text-base outline-none focus:border-primary"
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
                  className="mt-1.5 w-full resize-none border-b border-ink bg-transparent py-2 font-serif text-base outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="eyebrow w-full border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:border-primary hover:bg-primary"
              >
                {sent ? "Sent — thank you" : "Submit letter"}
              </button>
            </div>
          </motion.form>

          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {LISTINGS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group flex items-center gap-3 border border-border bg-card p-4 transition-[transform,border-color,box-shadow] duration-[250ms] hover:-translate-y-1 hover:border-ink hover:shadow-paper"
              >
                <l.icon className="size-5 text-primary" aria-hidden />
                <span>
                  <span className="eyebrow block text-muted-foreground">{l.label}</span>
                  <span className="text-[15px]">{l.value}</span>
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <footer className="border-t border-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-6">
          <p className="font-display text-sm uppercase tracking-[0.14em]">
            {PERSON.paper} © 2026 — All Rights Reserved
          </p>
          <p className="text-[13px] italic text-muted-foreground">
            Printed on the open web, in {PERSON.city}.
          </p>
        </div>
        <div className="h-[3px] bg-ink" />
        <div className="mt-[3px] h-px bg-ink" />
      </footer>
    </section>
  );
}
