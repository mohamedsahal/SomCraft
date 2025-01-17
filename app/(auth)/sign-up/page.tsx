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
import { CountrySelect } from "@/components/ui/country-select"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, User, Phone, Users } from "lucide-react"
import { useState, useEffect } from "react"

const codeSnippet = `// Welcome to SomaliCraft Academy
import { Developer } from '@somalicraft/core';

interface SkillSet {
  languages: string[];
  frameworks: string[];
  tools: string[];
}

class WebDeveloper extends Developer {
  private skills: SkillSet = {
    languages: [],
    frameworks: [],
    tools: []
  };

  constructor(name: string) {
    super(name);
    this.initializeJourney();
  }

  async learnSkill(category: keyof SkillSet, skill: string) {
    console.log(\`Learning \${skill}...\`);
    await this.practice(skill);
    this.skills[category].push(skill);
    console.log(\`✨ Mastered \${skill}!\`);
  }

  private async initializeJourney() {
    await this.learnSkill('languages', 'JavaScript');
    await this.learnSkill('languages', 'TypeScript');
    await this.learnSkill('frameworks', 'React');
    await this.learnSkill('tools', 'Git');
  }

  async buildProject(name: string) {
    console.log(\`🚀 Creating \${name}...\`);
    const project = await Project.create({
      name,
      technologies: this.skills
    });
    return project;
  }
}

// Start your coding journey
const you = new WebDeveloper('${name}');
you.buildProject('My First Website');`.split('\n')

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [countryCode, setCountryCode] = useState("+252")
  const [codeLines, setCodeLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    if (currentLine < codeSnippet.length) {
      const timer = setTimeout(() => {
        setCodeLines(prev => [...prev, codeSnippet[currentLine]])
        setCurrentLine(prev => prev + 1)
      }, 50) // Faster typing speed
      return () => clearTimeout(timer)
    }
  }, [currentLine])

  return (
    <div className="container relative flex h-screen w-screen flex-col lg:flex-row-reverse items-center justify-center gap-8">
      {/* Code Animation Background */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <pre className="absolute inset-0 p-4 text-sm font-mono overflow-hidden opacity-10">
          {codeLines.map((line, i) => (
            <div
              key={i}
              className="code-line"
              style={{ 
                animationDelay: `${i * 50}ms`,
                color: getCodeColor(line)
              }}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>

      {/* Code Animation Display */}
      <div className="hidden lg:flex w-1/2 h-full items-center justify-center z-10">
        <div className="relative w-full max-w-3xl p-8">
          <div className="rounded-xl border bg-background/40 backdrop-blur-md shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-background/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-sm text-muted-foreground">script.ts</div>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className="code-line"
                  style={{ 
                    animationDelay: `${i * 50}ms`,
                    color: getCodeColor(line)
                  }}
                >
                  {line}
                </div>
              ))}
              <div className="animate-cursor inline-block" />
            </pre>
          </div>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 z-10">
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
                        placeholder="Magacaaga oo saddexan"
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
                    <div className="flex gap-2">
                      <CountrySelect onSelect={setCountryCode} />
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="61 123 4567"
                          autoComplete="tel"
                          className="pl-10 h-12 text-base bg-background/50 backdrop-blur-sm transition-colors focus:bg-background/80"
                        />
                      </div>
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

function getCodeColor(line: string): string {
  // VS Code-like syntax highlighting
  if (line.trim().startsWith('//')) return '#6A9955' // Comments
  if (line.includes('class ')) return '#569CD6' // Class keyword
  if (line.includes('interface ')) return '#569CD6' // Interface keyword
  if (line.includes('async ')) return '#569CD6' // Async keyword
  if (line.includes('private ')) return '#569CD6' // Private keyword
  if (line.includes('constructor')) return '#DCDCAA' // Constructor
  if (line.includes('console.log')) return '#DCDCAA' // Function calls
  if (line.match(/'[^']*'/)) return '#CE9178' // String literals
  if (line.match(/\b\d+\b/)) return '#B5CEA8' // Numbers
  if (line.includes('import ')) return '#C586C0' // Import statements
  if (line.includes('return ')) return '#C586C0' // Return statements
  if (line.includes('await ')) return '#C586C0' // Await keyword
  if (line.match(/\b(true|false|null|undefined)\b/)) return '#569CD6' // Constants
  if (line.match(/[{}[\]()]/)) return '#D4D4D4' // Brackets
  if (line.includes(':')) return '#9CDCFE' // Type annotations
  return '#D4D4D4' // Default text color
} 