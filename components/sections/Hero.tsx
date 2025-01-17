import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Master Web Development in 24 Weeks
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px] animate-slide-up delay-200">
            Practical skills, real-world projects, and expert mentorship to launch your career in tech
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
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
      </div>
    </section>
  )
} 