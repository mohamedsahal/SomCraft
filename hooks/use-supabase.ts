import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { User, AuthError } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

export function useSupabase() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      // Check if user is super admin
      if (currentUser) {
        const metadata = currentUser.app_metadata
        setIsSuperAdmin(
          metadata?.roles?.includes('super_admin') || 
          Boolean(metadata?.is_super_admin)
        )
      }
      
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      // Check if user is super admin
      if (currentUser) {
        const metadata = currentUser.app_metadata
        setIsSuperAdmin(
          metadata?.roles?.includes('super_admin') || 
          Boolean(metadata?.is_super_admin)
        )
      } else {
        setIsSuperAdmin(false)
      }
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
    isSuperAdmin,
    supabase,
    signIn,
    signUp,
    signOut,
    verifyOtp,
  }
} 