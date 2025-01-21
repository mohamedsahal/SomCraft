"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { Loader2 } from "lucide-react"
import { MainNav } from "@/components/nav/main-nav"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // Redirect to appropriate dashboard based on user role
      const redirectPath = user.is_super_admin 
        ? '/dashboard/admin'
        : `/dashboard/${user.role || 'student'}`
      
      router.push(redirectPath)
    }
  }, [user, loading, router])

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If user is authenticated, don't render anything while redirecting
  if (user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Show auth pages only if user is not authenticated
  return (
    <>
      <MainNav />
      <main>{children}</main>
    </>
  )
} 