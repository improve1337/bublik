"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { dialogues } from "@/lib/features"

export function Terminal() {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState("")
  const [done, setDone] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const current = dialogues[index]

  const runTypewriter = useCallback((text: string) => {
    setDone(false)
    setTyped("")
    let i = 0
    const tick = () => {
      i += 1
      setTyped(text.slice(0, i))
      if (i < text.length) {
        timer.current = setTimeout(tick, 26)
      } else {
        setDone(true)
      }
    }
    timer.current = setTimeout(tick, 300)
  }, [])

  useEffect(() => {
    runTypewriter(current.bublik)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [current, runTypewriter])

  const nextDialogue = () => {
    if (timer.current) clearTimeout(timer.current)
    setIndex((prev) => {
      let n = Math.floor(Math.random() * dialogues.length)
      if (n === prev) n = (n + 1) % dialogues.length
      return n
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mt-4 max-w-3xl"
    >
      <button
        type="button"
        onClick={nextDialogue}
        aria-label="Показать другую реплику Бублика"
        data-cursor="hover"
        className="group w-full overflow-hidden rounded-2xl border border-[var(--border)] text-left transition-shadow"
        style={{ background: "var(--cmd-bg)", boxShadow: "var(--shadow), 0 0 40px var(--glow-color)" }}
      >
        {/* header */}
        <div
          className="flex items-center gap-2.5 border-b px-5 py-3"
          style={{ background: "var(--cmd-title-bg)", borderColor: "var(--cmd-border)" }}
        >
          <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57]" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[13px] font-medium tracking-wide text-[#9a9aac]">
            Bublik Console v0.3
          </span>
          <span className="ml-auto font-mono text-[11px] text-[#6a6a7a] opacity-0 transition-opacity group-hover:opacity-100">
            клик — новая реплика
          </span>
        </div>

        {/* body */}
        <div className="min-h-[220px] px-6 py-5 font-mono text-[13.5px] leading-relaxed sm:text-sm">
          <div className="font-bold text-[#66d9ff]">Бублик — Голосовой Ассистент + AI</div>
          <div className="mt-3 text-[#ffcc66]">
            [0_0] <span className="text-[#888]">Активация: бублик</span>
          </div>
          <div className="text-[#ff9fb1]">
            Бублик: <span className="text-[#b0ffb0]">я тут</span>
          </div>
          <div className="mt-1 text-[#b3ff8f]">
            Вы: <span className="text-[#dfe7cf]">{current.user}</span>
          </div>
          <div className="text-[#ff9fb1]">
            Бублик:{" "}
            <span className="text-[#b0ffb0]">
              {typed}
              {!done && (
                <span
                  className="ml-0.5 inline-block h-[16px] w-[9px] translate-y-[3px] bg-[#b0ffb0] animate-cmd-blink"
                  style={{ boxShadow: "0 0 10px #b0ffb0" }}
                />
              )}
            </span>
          </div>
          {done && (
            <span
              className="mt-1 inline-block h-[16px] w-[9px] translate-y-[3px] bg-[#b0ffb0] animate-cmd-blink"
              style={{ boxShadow: "0 0 10px #b0ffb0" }}
            />
          )}
        </div>
      </button>

      <p className="mt-6 text-center text-lg font-semibold text-text">
        Привет, я твой голосовой помощник с искусственным интеллектом
      </p>
      <p className="mt-1 text-center text-text-muted">Кликни по терминалу, чтобы услышать новую реплику</p>
    </motion.div>
  )
}
