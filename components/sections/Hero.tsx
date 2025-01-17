"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Code, 
  FileCode2, 
  Laptop, 
  Database, 
  GitBranch,
  Terminal,
  Blocks,
  LayoutGrid,
  MessageCircleCode
} from "lucide-react"

const techStacks = [
  { icon: <LayoutGrid className="h-8 w-8" />, name: "HTML5" },
  { icon: <FileCode2 className="h-8 w-8" />, name: "CSS3" },
  { icon: <Code className="h-8 w-8" />, name: "JavaScript" },
  { icon: <Blocks className="h-8 w-8" />, name: "React" },
  { icon: <Laptop className="h-8 w-8" />, name: "Node.js" },
  { icon: <Database className="h-8 w-8" />, name: "Databases" },
  { icon: <GitBranch className="h-8 w-8" />, name: "Git" },
  { icon: <Terminal className="h-8 w-8" />, name: "CLI" },
]

const roadmapSteps = [
  { phase: "Phase 1", title: "Frontend Fundamentals", progress: 100 },
  { phase: "Phase 2", title: "Advanced JavaScript", progress: 85 },
  { phase: "Phase 3", title: "React & Modern UI", progress: 70 },
  { phase: "Phase 4", title: "Backend Development", progress: 55 },
]

export function Hero() {
  const [codeText, setCodeText] = useState("")
  const [taglineText, setTaglineText] = useState("")
  const [showResult, setShowResult] = useState(false)
  const fullCodeText = `{"<"}div className="flex items-center"{">"}{"<"}MessageCircleCode className="h-6 w-6 mr-2 hover:scale-110 transition-transform" /{">"}SomaliCraft{"<"}/div{">"}`
  const fullTaglineText = "// Crafting the Future with Somali Innovation"
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullCodeText.length) {
        setCodeText(fullCodeText.slice(0, currentIndex + 1))
        currentIndex++
      } else if (currentIndex <= fullCodeText.length + fullTaglineText.length) {
        setTaglineText(fullTaglineText.slice(0, currentIndex - fullCodeText.length + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowResult(true), 500)
        setTimeout(() => {
          setCodeText("")
          setTaglineText("")
        }, 300)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [fullCodeText, fullTaglineText])

  return (
    <section className="py-12 md:py-16 flex items-center">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="flex flex-col space-y-6 animate-fade-in text-center lg:text-left">
            {/* Dynamic Brand Logo */}
            <div className="inline-block mx-auto lg:mx-0">
              <div className="relative w-fit rounded-lg overflow-hidden">
                {/* Code editor header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <span className="text-xs text-muted-foreground/60 font-mono">index.tsx</span>
                </div>

                {/* Code content */}
                <div className="flex">
                  {/* Line numbers */}
                  <div className="px-2 py-4 bg-primary/5 text-primary/30 font-mono text-sm text-right">
                    <div>1</div>
                    <div>2</div>
                  </div>

                  {/* Code area */}
                  <div className="p-4 bg-primary/[0.03] min-w-[380px]">
                    <div className="flex flex-col gap-1.5">
                      {!showResult ? (
                        <div className="flex flex-col font-mono">
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm" style={{ color: getCodeColor(codeText) }}>
                              {codeText}
                            </span>
                            <span className="animate-blink text-sm">|</span>
                          </div>
                          <div className="flex items-baseline gap-1 h-6">
                            <span className="text-xs text-[#6A9955]">
                              {taglineText}
                            </span>
                            {codeText.length === fullCodeText.length && (
                              <span className="animate-blink text-xs">|</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <div className="px-4 py-1.5 rounded-md bg-background/80 border border-primary/20">
                            <div className="flex items-center">
                              <MessageCircleCode 
                                className="h-6 w-6 mr-2 text-primary hover:scale-110 transition-transform" 
                              />
                              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
                                SomaliCraft
                              </span>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground/80 font-medium italic pl-1">
                            Crafting the Future with Somali Innovation
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Master Web Development in 24 Weeks
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto lg:mx-0 animate-slide-up delay-200">
              Join SomaliCraft&apos;s comprehensive program to learn practical skills, work on real-world projects, and get expert mentorship
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up delay-300 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-accent/30 transition-colors"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Side - Tech Stack & Roadmap */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="backdrop-blur-sm bg-background/30 border border-primary/10 rounded-xl p-4 animate-slide-up delay-400">
              <h3 className="text-base font-semibold mb-4">Technologies You&apos;ll Master</h3>
              <div className="grid grid-cols-4 gap-4">
                {techStacks.map((tech, index) => (
                  <div 
                    key={tech.name}
                    className="group flex flex-col items-center space-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2 rounded-lg bg-background/50 border border-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-110">
                      {tech.icon}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="backdrop-blur-sm bg-background/30 border border-primary/10 rounded-xl p-4 animate-slide-up delay-500 hover:border-primary/30 transition-all duration-300 group/card">
              <h3 className="text-base font-semibold mb-4 flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                Your Learning Path
              </h3>
              <div className="grid gap-3">
                {roadmapSteps.map((step, index) => (
                  <div 
                    key={step.phase}
                    className="group relative p-3 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-medium text-primary group-hover:text-primary/80 transition-colors">
                            {step.phase}
                          </span>
                          <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {step.title}
                          </h4>
                        </div>
                        <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full border border-primary/10 group-hover:border-primary/30 transition-all">
                          <span className="group-hover:hidden">0%</span>
                          <span className="hidden group-hover:inline">100%</span>
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-primary/10 overflow-hidden">
                        <div className="relative h-full w-0 group-hover:w-full rounded-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-all duration-700 ease-out">
                          {/* Animated glow */}
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getCodeColor(line: string): string {
  // VS Code-like syntax highlighting
  if (line.trim().startsWith('//')) return '#6A9955' // Comments
  if (line.includes('className=')) return '#9CDCFE' // Attributes
  if (line.includes('MessageCircleCode')) return '#4EC9B0' // Component names
  if (line.includes('div')) return '#569CD6' // HTML elements
  if (line.includes('flex')) return '#CE9178' // Tailwind classes
  if (line.match(/[{}[\]()]/)) return '#D4D4D4' // Brackets
  if (line.includes('"')) return '#CE9178' // String literals
  return '#D4D4D4' // Default text color
} 