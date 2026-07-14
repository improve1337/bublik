import { AiCursor } from "@/components/ai-cursor"
import { BackgroundFx } from "@/components/background-fx"
import { ThemeToggle } from "@/components/theme-toggle"
import { Hero } from "@/components/hero"
import { Terminal } from "@/components/terminal"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <BackgroundFx />
      <AiCursor />
      <ThemeToggle />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-8 pt-24 sm:px-8">
        <Hero />
        <Terminal />
      </div>

      <Features />
      <Footer />
    </main>
  )
}
