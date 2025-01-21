import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { Courses } from "@/components/sections/Courses"
import { Footer } from "@/components/sections/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Courses />
      <Footer />
    </main>
  )
} 