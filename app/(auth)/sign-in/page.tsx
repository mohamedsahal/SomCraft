"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useSupabase } from "@/hooks/use-supabase"

const codeSnippet = `// Welcome to SomaliCraft Academy
import { Auth } from '@somalicraft/core';

interface UserCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

class AuthService {
  private static instance: AuthService;
  private auth: Auth;

  private constructor() {
    this.auth = new Auth({
      apiKey: process.env.API_KEY,
      domain: 'api.somalicraft.com'
    });
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login({ email, password, rememberMe }: UserCredentials) {
    console.log('🔐 Authenticating user...');
    try {
      const user = await this.auth.signIn({
        email,
        password,
        options: { remember: rememberMe }
      });
      
      console.log('✨ Login successful!');
      return user;
    } catch (error) {
      console.error('❌ Authentication failed');
      throw error;
    }
  }
}

// Initialize auth service
const authService = AuthService.getInstance();
await authService.login({
  email: 'user@example.com',
  password: '********',
  rememberMe: true
});`

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, user } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [codeLines, setCodeLines] = useState<string[]>([])

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/admin/dashboard')
    }
  }, [user, router])

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      if (!email || !password) {
        toast.error("Please fill in all fields")
        setIsLoading(false)
        return
      }

      const { data, error } = await signIn({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
        toast.error(error.message)
        return
      }

      if (data?.session) {
        const redirectTo = searchParams.get("redirect") || "/admin/dashboard"
        toast.success("Signed in successfully!")
        router.push(redirectTo)
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      toast.error("An unexpected error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const getCodeColor = (line: string) => {
    if (line.trim().startsWith('//')) return 'text-green-500'
    if (line.includes('interface') || line.includes('class')) return 'text-blue-500'
    if (line.includes('async') || line.includes('return')) return 'text-purple-500'
    if (line.includes('string') || line.includes('boolean')) return 'text-yellow-500'
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
                <span className="text-xs text-gray-400">auth.ts</span>
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
                  Enter your email to sign in to your account
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
                        name="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base" htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="current-password"
                        disabled={isLoading}
                        className="pl-10 h-12 text-base"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-9 w-9"
                        onClick={() => setShowPassword(!showPassword)}
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

                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" name="rememberMe" className="h-5 w-5" />
                    <label
                      htmlFor="rememberMe"
                      className="text-base font-medium leading-none"
                    >
                      Remember me
                    </label>
                  </div>

                  <Button disabled={isLoading} className="w-full h-12 text-base">
                    {isLoading && (
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    )}
                    Sign In
                  </Button>
                </div>
              </form>
            </div>

            <div className="text-center text-base">
              Don&apos;t have an account?{" "}
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