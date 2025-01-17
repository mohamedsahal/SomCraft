"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CountrySelect } from "@/components/ui/country-select"
import { useSupabase } from "@/hooks/use-supabase"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

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
you.buildProject('My First Website');`

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, verifyOtp } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [countryCode, setCountryCode] = useState("+252")
  const [currentLine, setCurrentLine] = useState(0)
  const [codeLines, setCodeLines] = useState<string[]>([])
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [email, setEmail] = useState("")

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
      const confirmPassword = formData.get("confirmPassword") as string
      const fullName = formData.get("fullName") as string
      const phoneNumber = formData.get("phoneNumber") as string
      const acceptTerms = formData.get("acceptTerms") === "on"

      // Validation
      if (!email || !password || !confirmPassword || !fullName || !phoneNumber) {
        toast.error("Please fill in all fields")
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        setIsLoading(false)
        return
      }

      if (!acceptTerms) {
        toast.error("Please accept the terms and conditions")
        setIsLoading(false)
        return
      }

      // Format phone number - remove any spaces and ensure it starts with country code
      const cleanPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/^0+/, '')
      const formattedPhoneNumber = countryCode + cleanPhoneNumber

      // Sign up with Supabase
      const { data, error } = await signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: formattedPhoneNumber,
            country_code: countryCode,
            phone_verified: false
          }
        }
      })

      if (error) {
        if (error.message.includes('unique constraint')) {
          toast.error("This email is already registered. Please try signing in instead.")
        } else {
          console.error("Signup error:", error)
          toast.error(error.message)
        }
        return
      }

      if (data?.user) {
        setEmail(email)
        setShowVerification(true)
        toast.success("Please enter the verification code sent to your email.")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch (error: any) {
      console.error("Unexpected error during sign up:", error)
      toast.error(error?.message || "An unexpected error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await verifyOtp({
        email,
        token: verificationCode,
        type: 'signup'
      })

      if (error) {
        console.error("Verification error:", error)
        toast.error(error.message)
        return
      }

      if (data?.user) {
        toast.success("Email verified successfully!")
        router.push("/sign-in")
      }
    } catch (error: any) {
      console.error("Verification error:", error)
      toast.error(error?.message || "Failed to verify email")
    } finally {
      setIsLoading(false)
    }
  }

  const getCodeColor = (line: string) => {
    if (line.trim().startsWith('//')) return 'text-green-500'
    if (line.includes('interface') || line.includes('class')) return 'text-blue-500'
    if (line.includes('async') || line.includes('return')) return 'text-purple-500'
    if (line.includes('string') || line.includes('Date')) return 'text-yellow-500'
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
                <span className="text-xs text-gray-400">developer.ts</span>
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

        {/* Sign Up Form Section */}
        <div className="relative flex items-center justify-center p-8">
          <div className="w-full max-w-lg mx-auto space-y-8">
            <div className="bg-background/60 backdrop-blur-sm text-card-foreground rounded-xl border shadow-sm p-8">
              {showVerification ? (
                <>
                  <div className="flex flex-col space-y-2 text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Verify your email</h1>
                    <p className="text-lg text-muted-foreground">
                      Enter the verification code sent to your email
                    </p>
                  </div>

                  <form onSubmit={handleVerification} className="space-y-6">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-base" htmlFor="verificationCode">Verification Code</Label>
                        <Input
                          id="verificationCode"
                          name="verificationCode"
                          placeholder="Enter code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="h-12 text-base text-center tracking-widest"
                          maxLength={6}
                        />
                      </div>

                      <Button disabled={isLoading} className="w-full h-12 text-base">
                        {isLoading && (
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        )}
                        Verify Email
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex flex-col space-y-2 text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                    <p className="text-lg text-muted-foreground">
                      Enter your details below to create your account
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-base" htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="name"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="pl-10 h-12 text-base"
                          />
                        </div>
                      </div>

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
                        <Label className="text-base" htmlFor="phoneNumber">Phone Number</Label>
                        <div className="flex gap-2">
                          <CountrySelect
                            value={countryCode}
                            onValueChange={setCountryCode}
                          />
                          <div className="relative flex-1">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="77 123 4567"
                              type="tel"
                              autoCapitalize="none"
                              autoComplete="tel"
                              disabled={isLoading}
                              className="pl-10 h-12 text-base"
                            />
                          </div>
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
                            autoComplete="new-password"
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

                      <div className="space-y-2">
                        <Label className="text-base" htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoCapitalize="none"
                            autoComplete="new-password"
                            disabled={isLoading}
                            className="pl-10 h-12 text-base"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-2 h-9 w-9"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                            <span className="sr-only">
                              {showConfirmPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="acceptTerms" name="acceptTerms" className="h-5 w-5" />
                        <label
                          htmlFor="acceptTerms"
                          className="text-base font-medium leading-none"
                        >
                          Accept terms and conditions
                        </label>
                      </div>

                      <Button disabled={isLoading} className="w-full h-12 text-base">
                        {isLoading && (
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        )}
                        Sign Up
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {!showVerification && (
              <div className="text-center text-base">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary hover:text-primary/80 underline underline-offset-4 font-medium"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 