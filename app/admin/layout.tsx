"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/use-supabase"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading } = useSupabase()

  useEffect(() => {
    // Check if user is admin
    if (!loading && !user) {
      router.push("/sign-in")
    }
    // TODO: Add admin role check when ready
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
} 