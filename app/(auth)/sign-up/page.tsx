"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, User, Phone, Users } from "lucide-react"
import { useState, useEffect } from "react"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [codeLines, setCodeLines] = useState<string[]>([])
  const code = `// Join SomaliCraft Community
class Developer {
  constructor(name) {
    this.name = name;
    this.skills = new Set();
    this.projects = [];
  }

  async learn(technology) {
    console.log("Learning " + technology);
    await this.practice(technology);
    this.skills.add(technology);
  }

  async buildProject(name) {
    const project = await Project.create({
      name,
      tech: Array.from(this.skills)
    });
    this.projects.push(project);
  }
}

// Your journey begins here
const you = new Developer(name);
you.learn("Web Development");`.split('\n')

  useEffect(() => {
    const timer = setInterval(() => {
      if (codeLines.length < code.length) {
        setCodeLines(prev => [...prev, code[prev.length]])
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [codeLines.length])

  return (
    <div className="container relative flex h-screen w-screen flex-col lg:flex-row-reverse items-center justify-center gap-8">
      {/* Left side - Coding Animation */}
      <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-black/5 backdrop-blur-sm">
        <div className="relative w-full max-w-3xl p-8 rounded-xl bg-background/40">
          <pre className="text-base font-mono text-primary/90 overflow-hidden">
            {codeLines.map((line, i) => (
              <div
                key={i}
                className="code-line"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {line}
              </div>
            ))}
            <div className="animate-cursor inline-block" />
          </pre>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <div className="w-full max-w-[500px]">
          <div className="rounded-xl border bg-background/60 backdrop-blur-sm shadow-sm p-8">
            <div className="flex flex-col space-y-2 text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">Create an account</h1>
              <p className="text-base text-muted-foreground">
                Enter your details to get started
              </p>
            </div>
            <div className="grid gap-8">
              <form>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label className="text-base" htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        type="text"
                        autoCapitalize="words"
                        autoComplete="name"
                        className="pl-10 h-12 text-base bg-background/50 backdrop-blur-sm transition-colors focus:bg-background/80"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-base" htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        className="pl-10 h-12 text-base bg-background/50 backdrop-blur-sm transition-colors focus:bg-background/80"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-base" htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="pl-10 pr-10 h-12 text-base bg-background/50 backdrop-blur-sm transition-colors focus:bg-background/80"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-base" htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        className="pl-10 pr-10 h-12 text-base bg-background/50 backdrop-blur-sm transition-colors focus:bg-background/80"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-base" htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        autoComplete="tel"
                        className="pl-10 h-12 text-base bg-background/50 backdrop-blur-sm transition-colors focus:bg-background/80"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-base" htmlFor="gender">Gender</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Select>
                        <SelectTrigger className="pl-10 h-12 text-base bg-background/50 backdrop-blur-sm transition-colors focus:bg-background/80">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full h-12 text-base">
                    Sign Up
                  </Button>
                </div>
              </form>
              <div className="text-center text-base">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-primary hover:text-primary/80 underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 