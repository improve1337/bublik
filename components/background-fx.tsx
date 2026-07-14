"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type Particle = {
  size: number
  left: number
  duration: number
  delay: number
  opacity: number
}

export function BackgroundFx() {
  // Generate particles only on the client after mount to avoid SSR/CSR
  // hydration mismatches from Math.random().
  const [particles, setParticles] = useState<Particle[]>([])
  useEffect(() => {
    setParticles(
      Array.from({ length: 34 }, () => ({
        size: 8 + Math.random() * 26,
        left: Math.random() * 100,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    )
  }, [])

  // parallax for blobs based on mouse
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 20 })
  const sy = useSpring(py, { stiffness: 60, damping: 20 })
  const sx2 = useSpring(px, { stiffness: 40, damping: 22 })
  const sy2 = useSpring(py, { stiffness: 40, damping: 22 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      px.set(nx * 40)
      py.set(ny * 40)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [px, py])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* drifting gradient blobs */}
      <motion.div
        style={{ x: sx, y: sy, background: "radial-gradient(circle, var(--blob-1), transparent 70%)" }}
        className="absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full blur-3xl [animation:blob-drift_18s_ease-in-out_infinite]"
      />
      <motion.div
        style={{
          x: sx2,
          y: sy2,
          background: "radial-gradient(circle, var(--blob-2), transparent 70%)",
        }}
        className="absolute -right-40 top-40 h-[40rem] w-[40rem] rounded-full blur-3xl [animation:blob-drift_22s_ease-in-out_infinite_reverse]"
      />
      <motion.div
        style={{ x: sx, y: sy, background: "radial-gradient(circle, var(--blob-3), transparent 70%)" }}
        className="absolute bottom-0 left-1/3 h-[36rem] w-[36rem] rounded-full blur-3xl [animation:blob-drift_26s_ease-in-out_infinite]"
      />

      {/* floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-[6px] [animation:float-up_linear_infinite]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}vw`,
            bottom: "-10vh",
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: "radial-gradient(circle, var(--leaf-start), var(--leaf-end))",
          }}
        />
      ))}
    </div>
  )
}
