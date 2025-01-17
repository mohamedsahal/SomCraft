"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useState, useEffect } from "react"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [codeLines, setCodeLines] = useState<string[]>([])
  const code = `// Welcome to SomaliCraft
const learnCoding = async () => {
  const skills = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Backend Systems"
  ];

  for (const skill of skills) {
    await master(skill);
    console.log("Mastered: " + skill);
  }

  return "Success! 🚀";
};

// Start your journey
learnCoding().then((result) => {
  console.log(result);
});`.split('\n')

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
    <div className="container relative flex h-screen w-screen flex-col lg:flex-row items-center justify-center gap-8">
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

      {/* Right side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <div className="w-full max-w-[450px]">
          <div className="rounded-xl border bg-background/60 backdrop-blur-sm shadow-sm p-8">
            <div className="flex flex-col space-y-2 text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">Welcome back</h1>
              <p className="text-base text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <div className="grid gap-8">
              <form>
                <div className="grid gap-6">
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
                        autoCorrect="off"
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
                        autoCapitalize="none"
                        autoComplete="current-password"
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button className="w-full h-12 text-base">
                    Sign In
                  </Button>
                </div>
              </form>
              <div className="text-center text-base">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-primary hover:text-primary/80 underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 