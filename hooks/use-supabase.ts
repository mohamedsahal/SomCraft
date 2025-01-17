import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { User, AuthError } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

export function useSupabase() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async ({ 
    email, 
    password, 
    options 
  }: { 
    email: string; 
    password: string; 
    options?: { 
      data?: Record<string, any>;
      emailRedirectTo?: string;
    } 
  }) => {
    return supabase.auth.signUp({ 
      email, 
      password,
      options
    })
  }

  const verifyOtp = async ({
    email,
    token,
    type = 'signup'
  }: {
    email: string;
    token: string;
    type: 'signup' | 'recovery' | 'invite';
  }) => {
    return supabase.auth.verifyOtp({
      email,
      token,
      type
    })
  }

  const signOut = async () => {
    return supabase.auth.signOut()
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    verifyOtp,
  }
} 