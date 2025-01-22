"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/app/providers/supabase-provider"
import { Loader2 } from "lucide-react"
import { DashboardNav } from "@/components/nav/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <DashboardNav />
      <main>
        {children}
      </main>
    </>
  )
} 