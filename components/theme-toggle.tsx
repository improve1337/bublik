"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { MoonIcon, SunIcon } from "@/components/icons"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      type="button"
      aria-label="Переключить тему"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.96 }}
      className="glass-border fixed right-4 top-4 z-[200] flex items-center gap-3 rounded-full border border-[var(--border)] bg-bg-card px-4 py-2.5 text-sm font-semibold text-text-secondary backdrop-blur-2xl transition-shadow hover:shadow-[var(--shadow-hover)] sm:right-7 sm:top-7"
      style={{ boxShadow: "var(--shadow)" }}
    >
      <span className="grid h-5 w-5 place-items-center text-[var(--badge-text)]">
        {mounted && isDark ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
      </span>
      <span className="hidden sm:inline">{mounted ? (isDark ? "Тёмная" : "Светлая") : "Тема"}</span>
      <span
        className="relative h-6 w-11 rounded-full transition-colors"
        style={{ background: isDark ? "#4a4a6a" : "var(--toggle-bg)" }}
      >
        <motion.span
          className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-md"
          style={{ background: isDark ? "#f0e8e4" : "#ffffff" }}
          animate={{ x: mounted && isDark ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </span>
    </motion.button>
  )
}
