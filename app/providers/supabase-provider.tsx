"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { type User } from "@supabase/supabase-js"
import { toast } from "sonner"

interface SupabaseContextType {
  user: User | null
  loading: boolean
  signIn: (args: { email: string; password: string }) => Promise<any>
  signUp: (args: { email: string; password: string; options?: { data: any } }) => Promise<any>
  signOut: () => Promise<any>
}

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
})

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Handle auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      router.refresh()
    })

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success("Signed in successfully")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  }

  const signUp = async ({ email, password, options }: { 
    email: string
    password: string
    options?: { data: any }
  }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options,
      })

      if (error) throw error

      toast.success("Check your email to confirm your account")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      router.push("/sign-in")
      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
} 