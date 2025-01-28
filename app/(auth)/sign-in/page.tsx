"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const codeSnippet = `// Welcome back to SomCraft Academy
import { authenticate } from '@somcraft/auth';

const credentials = {
  email: 'student@somcraft.com',
  password: '********'
};

await authenticate(credentials);
// Starting your learning journey...`

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [codeLines, setCodeLines] = useState<string[]>([])

  // Handle code animation
  useEffect(() => {
    const lines = codeSnippet.split('\n')
    setCodeLines(lines)

    let currentLineIndex = 0
    const interval = setInterval(() => {
      if (currentLineIndex < lines.length) {
        setCurrentLine(currentLineIndex + 1)
        currentLineIndex++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    
    setError(null)
    setIsLoading(true)

    try {
      // TODO: Implement authentication logic here
      // For now, just show success and redirect
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const getCodeColor = (line: string) => {
    if (line.trim().startsWith('//')) return 'text-green-500'
    if (line.includes('import') || line.includes('from')) return 'text-blue-500'
    if (line.includes('async') || line.includes('await')) return 'text-purple-500'
    if (line.includes('try') || line.includes('catch')) return 'text-yellow-500'
    if (line.includes('console.')) return 'text-cyan-500'
    return 'text-gray-300'
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:144px_144px]" />
      </div>

      <div className="relative grid lg:grid-cols-[60%_40%] h-[calc(100vh-4rem)]">
        {/* Code Animation Section */}
        <div className="relative hidden lg:flex items-center justify-center p-8">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-[#1e1e1e]/30 backdrop-blur-sm shadow-2xl border border-white/10">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d]/50">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-gray-400">login.ts</span>
              </div>
            </div>
            {/* Code content */}
            <pre className="p-4 font-mono text-sm">
              {codeLines.slice(0, currentLine).map((line, index) => (
                <div key={index} className={`${getCodeColor(line)} whitespace-pre opacity-90`}>
                  {line}
                </div>
              ))}
              <span className="animate-pulse">▋</span>
            </pre>
          </div>
        </div>

        {/* Sign In Form Section */}
        <div className="relative flex items-center justify-center p-8">
          <div className="w-full max-w-lg mx-auto space-y-8">
            <div className="bg-background/60 backdrop-blur-sm text-card-foreground rounded-xl border shadow-sm p-8">
              <div className="flex flex-col space-y-2 text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-lg text-muted-foreground">
                  Sign in to your account to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-base" htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 h-12 text-base"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base" htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 h-12 text-base"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-9 w-9"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-500">
                      {error}
                    </div>
                  )}

                  <Button disabled={isLoading} className="w-full h-12 text-base">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="text-center text-base">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="text-primary hover:text-primary/80 underline underline-offset-4 font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}