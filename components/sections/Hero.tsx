"use client"

import { Button } from "@/components/ui/button"
import { 
  Code, 
  FileCode2, 
  Laptop, 
  Database, 
  GitBranch,
  Terminal,
  Blocks,
  LayoutGrid
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
  return (
    <section className="py-12 md:py-16 flex items-center">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Master Web Development in 24 Weeks
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-[600px] animate-slide-up delay-200">
              Practical skills, real-world projects, and expert mentorship to launch your career in tech
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up delay-300">
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
              <h3 className="text-base font-semibold mb-4">Technologies You'll Master</h3>
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
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
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