"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useSupabase } from "@/hooks/use-supabase"
import { toast } from "sonner"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const { signUp, verifyOtp } = useSupabase()
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    if (!email) {
      router.push("/sign-in")
    }
  }, [email, router])

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !token) return

    setIsVerifying(true)
    try {
      const { data, error } = await verifyOtp({
        email,
        token,
        type: "signup"
      })

      if (error) {
        toast.error("Invalid or expired code. Please try again.")
      } else if (data?.session) {
        toast.success("Email verified successfully!")
        router.push("/sign-in")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendEmail = async () => {
    if (!email) return

    setIsResending(true)
    try {
      const { error } = await signUp({
        email,
        password: "", // Password is required but won't be used
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        if (error.message.includes("Email rate limit exceeded")) {
          toast.error("Please wait a moment before requesting another email")
        } else {
          toast.error("Failed to resend verification email")
        }
      } else {
        toast.success("Verification email resent")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:144px_144px]" />
      </div>

      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-background/60 backdrop-blur-sm text-card-foreground rounded-xl border shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Verify your email
            </h1>
            
            <p className="text-muted-foreground mb-6">
              We&apos;ve sent a verification code to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter verification code"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="text-center text-lg tracking-[0.5em] h-12"
                  maxLength={6}
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-11"
                disabled={isVerifying || !token}
              >
                {isVerifying && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                >
                  <Link href="/sign-in">
                    Return to sign in
                  </Link>
                </Button>

                <p className="text-sm text-muted-foreground">
                  Didn&apos;t receive the code?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-normal"
                    onClick={handleResendEmail}
                    disabled={isResending}
                  >
                    {isResending ? "Sending..." : "Click to resend"}
                  </Button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 