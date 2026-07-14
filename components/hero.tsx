"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DownloadIcon, SparkIcon } from "@/components/icons"

const EYE_FRAMES = ["0_o", "o_0", "0_0", "-_-", "0_-", "-_0"]
const DOWNLOAD_URL = "https://drive.google.com/file/d/1ecWPrziRVJm9kuWOSZ5I4PPkvUQQlttM/view?usp=drive_link"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Hero() {
  const [eyes, setEyes] = useState("0_o")

  useEffect(() => {
    const id = setInterval(() => {
      setEyes(EYE_FRAMES[Math.floor(Math.random() * EYE_FRAMES.length)])
    }, 500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative pb-12 pt-6 text-center sm:pb-16">
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
        <span className="glass-border inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-badge-bg px-5 py-2 text-sm font-bold tracking-wide text-badge-text backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[var(--grad-start)] animate-pulse-dot" />
          Beta v0.3 · Голосовой ассистент + ИИ
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="mt-7 flex flex-wrap items-center justify-center gap-x-3 font-sans text-[clamp(52px,10vw,104px)] font-black uppercase leading-[1.05] tracking-[0.04em]"
      >
        <span
          className="text-gradient"
          style={{ filter: "drop-shadow(0 0 34px var(--glow-color))" }}
        >
          Бублик
        </span>
        <span
          className="inline-block font-mono text-[0.55em] font-bold text-badge-text"
          style={{ textShadow: "0 0 22px var(--glow-color)" }}
          aria-label="глаза ассистента"
        >
          {eyes}
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="mx-auto mt-3 max-w-xl text-pretty text-lg font-light tracking-[0.06em] text-text-secondary"
      >
        Голосовой ассистент с локальным ИИ — работает офлайн, прямо на вашем ПК.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <motion.a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full px-11 py-4 text-lg font-bold text-white sm:w-auto"
          style={{
            background: "linear-gradient(135deg, var(--grad-start), var(--grad-end))",
            boxShadow: "0 12px 32px rgba(255,150,150,.35), 0 0 44px var(--glow-color)",
          }}
        >
          <DownloadIcon width={20} height={20} />
          Скачать v0.3
        </motion.a>

        <motion.a
          href="#features"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          className="glass-border inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[var(--border)] bg-bg-card px-11 py-4 text-lg font-bold text-text backdrop-blur-xl sm:w-auto"
          style={{ boxShadow: "var(--shadow)" }}
        >
          <SparkIcon width={18} height={18} className="text-badge-text" />
          Подробнее
        </motion.a>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
        className="mt-8"
      >
        <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--code-bg)] px-5 py-1.5 font-mono text-[13px] font-medium tracking-wide text-text-muted">
          текущая версия: beta v0.3
        </span>
      </motion.div>
    </section>
  )
}
