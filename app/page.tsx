import { Hero } from "@/components/sections/Hero"
import { Courses } from "@/components/sections/Courses"
import { Features } from "@/components/sections/Features"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Courses />
      <Features />
      <Footer />
    </main>
  )
}
