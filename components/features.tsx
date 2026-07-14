"use client"

import { motion } from "framer-motion"
import { features } from "@/lib/features"

export function Features() {
  return (
    <section id="features" className="relative z-10 px-4 py-12 sm:px-6 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl text-center"
      >
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ключевые возможности <span className="text-gradient">v0.3</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-lg text-text-muted">
          Всё, что умеет Бублик — из коробки, без интернета
        </p>
      </motion.div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-5">
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            whileHover={{ y: -8 }}
            data-cursor="hover"
            className="glass-border group relative flex h-[280px] w-[280px] max-[500px]:h-[220px] max-[500px]:w-[220px] flex-col rounded-3xl border border-[var(--border)] bg-bg-card p-6 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[var(--shadow-hover)]"
            style={{ boxShadow: "var(--shadow), var(--card-glow)" }}
          >
            <div
              className="grid h-12 w-12 place-items-center rounded-full text-2xl transition-transform duration-300 group-hover:scale-110 max-[500px]:h-10 max-[500px]:w-10"
              style={{ background: "var(--icon-circle)" }}
              aria-hidden
            >
              {f.icon}
            </div>
            <h3 className="mt-4 text-[19px] font-bold leading-tight tracking-tight text-text max-[500px]:text-base">
              {f.title}
            </h3>
            <p className="mt-1.5 flex-1 overflow-hidden text-sm leading-relaxed text-text-secondary max-[500px]:text-[13px]">
              {f.description}
            </p>
            {f.tag && (
              <span className="mt-2 self-start rounded-full bg-badge-bg px-3 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-badge-text">
                {f.tag}
              </span>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
