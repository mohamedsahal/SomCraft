"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/use-supabase"

export default function SignUpPage() {
  const router = useRouter()
  const { user } = useSupabase()

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/admin/dashboard')
    }
  }, [user, router])

  return (
    <div>
      {/* Your sign-up form content here */}
    </div>
  )
} 