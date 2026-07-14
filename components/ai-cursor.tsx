"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function AiCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.4 })

  useEffect(() => {
    // Only enable custom cursor for fine pointers (desktop)
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
      const el = e.target as HTMLElement
      setActive(Boolean(el?.closest("a, button, [data-cursor='hover']")))
    }
    const leave = () => setHidden(true)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: hidden ? 0 : 1 }}>
      {/* outer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid var(--badge-text)",
          boxShadow: "0 0 18px var(--glow-color)",
        }}
        animate={{
          width: active ? 56 : 34,
          height: active ? 56 : 34,
          backgroundColor: active ? "var(--badge-bg)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* inner pulsing dot */}
      <motion.div
        className="absolute rounded-full animate-pulse-dot"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 7,
          height: 7,
          background: "linear-gradient(135deg, var(--grad-start), var(--grad-end))",
        }}
      />
    </div>
  )
}
