import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Бублик v0.3 — голосовой ассистент с локальным ИИ",
  description:
    "Bublik v0.3 — голосовой ассистент для Windows с офлайн-распознаванием, локальным ИИ (Qwen 0.5B) и базами данных игр и сленга.",
  authors: [{ name: "improve1337" }],
  keywords: ["голосовой ассистент", "локальный ИИ", "Бублик", "Bublik", "Vosk", "оффлайн"],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcf7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e16" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning className="bg-bg">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
