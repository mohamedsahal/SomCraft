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

interface ExtendedUser extends User {
  role?: string
  is_super_admin?: boolean
}

export function useSupabase() {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<ExtendedUser | null>(null)
  const [loading, setLoading] = useState(true)

  const getUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role, is_super_admin')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user role:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserRole:', error)
      return null
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const roleData = await getUserRole(session.user.id)
          
          if (roleData) {
            setUser({
              ...session.user,
              role: roleData.role,
              is_super_admin: roleData.is_super_admin
            })
          } else {
            setUser(session.user)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error in getUser:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session?.user) {
          const roleData = await getUserRole(session.user.id)
          
          if (roleData) {
            setUser({
              ...session.user,
              role: roleData.role,
              is_super_admin: roleData.is_super_admin
            })
          } else {
            setUser(session.user)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error in auth change:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error && data.user) {
      const roleData = await getUserRole(data.user.id)
      if (roleData) {
        setUser({
          ...data.user,
          role: roleData.role,
          is_super_admin: roleData.is_super_admin
        })
      } else {
        setUser(data.user)
      }
    }
    return { data, error }
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