import { motion } from "motion/react";
import { PERSON } from "./data";
import { fadeUp, stagger, viewportOnce } from "./motion";

export function About() {
  return (
    <section
      id="about"
      className="border-b border-ink/80 bg-paper-alt"
      aria-labelledby="about-title"
    >
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
            id="about-title"
            className="font-display text-3xl font-black uppercase tracking-wider sm:text-4xl"
          >
            About Me
          </h2>
          <span className="eyebrow text-muted-foreground">Section A · Page 1</span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <motion.div variants={fadeUp} className="lg:columns-2 lg:gap-10 `*:break-inside-avoid`">
            <p className="dropcap text-[1.0625rem] leading-[1.75]">
              I am a versatile Full-Stack Developer with {PERSON.experience.toLowerCase()} of
              professional experience specializing in the MERN Stack, Next.js, Shopify Development
              and Canva Design. I build modern, scalable and high-performance web applications and
              e-commerce solutions, while also creating visually engaging designs and marketing
              assets that strengthen brands.
            </p>

            <figure className="my-7 border-y-2 border-ink py-5">
              <blockquote className="font-display text-2xl italic leading-snug">
                “Clean code and compelling design are two sides of the same coin — together they
                build experiences users trust.”
              </blockquote>
            </figure>

            <p className="mt-4 text-[1.0625rem] leading-[1.75]">
              I am proficient in MongoDB, Supabase SQL, Express.js, React.js, Next.js, Node.js and
              Shopify, with hands-on experience in RESTful APIs, secure authentication systems,
              responsive UI/UX, deployment and e-commerce optimization.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-[1.75]">
              I excel in collaborative, Agile environments, delivering clean, efficient code and
              visually appealing designs that enhance both functionality and user experience — from
              a single landing page to a fully managed Shopify store.
            </p>
          </motion.div>

          <motion.aside
            variants={fadeUp}
            className="h-fit border border-ink bg-card p-5 shadow-paper"
          >
            <h3 className="eyebrow border-b border-ink pb-2">Specialties</h3>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                "MERN stack development",
                "Shopify stores & themes",
                "RESTful APIs & auth systems",
                "E-commerce & SEO optimization",
                "PWA & web applications",
                "Canva design & marketing assets",
              ].map((item) => (
                <li key={item} className="flex gap-2 border-b border-border pb-2 last:border-0">
                  <span className="text-primary">§</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] italic text-muted-foreground">
              Delivering clean, efficient code and compelling design.
            </p>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
