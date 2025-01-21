"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState, useCallback } from "react"
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

  // Memoize getUserRole to prevent unnecessary recreations
  const getUserRole = useCallback(async (userId: string, signal?: AbortSignal) => {
    if (!userId) {
      console.error('getUserRole called with invalid userId')
      return null
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('role, is_super_admin')
        .eq('id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned, this is a new user
          console.info('No user role found, might be a new user:', userId)
          return { role: 'student', is_super_admin: false }
        }
        console.error('Error fetching user role:', {
          code: error.code,
          message: error.message,
          details: error.details
        })
        return null
      }

      if (!data) {
        console.warn('No data returned for user:', userId)
        return { role: 'student', is_super_admin: false }
      }

      return data
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Handle aborted request
        return null
      }
      console.error('Error in getUserRole:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error)
      })
      return null
    }
  }, [supabase])

  // Memoize the user update function
  const updateUserWithRole = useCallback(async (sessionUser: User, signal?: AbortSignal) => {
    if (!sessionUser?.id) {
      console.error('updateUserWithRole called with invalid user')
      setUser(null)
      return
    }

    const roleData = await getUserRole(sessionUser.id, signal)
    if (roleData) {
      setUser({
        ...sessionUser,
        role: roleData.role,
        is_super_admin: roleData.is_super_admin
      })
    } else {
      // If we couldn't get role data, set user with defaults
      setUser({
        ...sessionUser,
        role: 'student',
        is_super_admin: false
      })
    }
  }, [getUserRole])

  useEffect(() => {
    let mounted = true
    const abortController = new AbortController()

    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!mounted) return

        if (session?.user) {
          await updateUserWithRole(session.user, abortController.signal)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error in getUser:', error)
        if (mounted) setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return

      try {
        if (session?.user) {
          await updateUserWithRole(session.user, abortController.signal)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error in auth change:', error)
        if (mounted) setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })

    return () => {
      mounted = false
      abortController.abort()
      subscription.unsubscribe()
    }
  }, [supabase.auth, updateUserWithRole])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const abortController = new AbortController();
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
      })
      
      if (!error && data.user) {
        await updateUserWithRole(data.user, abortController.signal)
      }
      return { data, error }
    } catch (error) {
      console.error('Error in signIn:', error)
      throw error
    }
  }

  const signUp = async ({ email, password, options }: { 
    email: string; 
    password: string; 
    options?: { data: { [key: string]: any } } 
  }) => {
    return supabase.auth.signUp({ email, password, options })
  }

  const signOut = async () => {
    return supabase.auth.signOut()
  }

  const verifyOtp = async ({ email, token, type }: { 
    email: string; 
    token: string; 
    type: "signup" | "recovery" | "invite" 
  }) => {
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