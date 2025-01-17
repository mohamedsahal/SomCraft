"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { type User, type AuthSession } from "@supabase/supabase-js"

type SessionResponse = {
  data: {
    session: AuthSession | null
  }
  error: Error | null
}

export function useSupabase() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async ({ email, password, options }: { email: string; password: string; options?: { data: { [key: string]: any } } }) => {
    return supabase.auth.signUp({ email, password, options })
  }

  const signOut = async () => {
    return supabase.auth.signOut()
  }

  const verifyOtp = async ({ email, token, type }: { email: string; token: string; type: "signup" | "recovery" | "invite" }) => {
    return supabase.auth.verifyOtp({ email, token, type })
  }

  const getSession = async (): Promise<SessionResponse> => {
    return supabase.auth.getSession()
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    verifyOtp,
    getSession,
  }
} 