import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          flowType: 'pkce',
          autoRefreshToken: true,
          detectSessionInUrl: true,
          persistSession: true,
          storage: {
            getItem: (key: string) => {
              const value = cookieStore.get(key)?.value
              return value ?? null
            },
            setItem: (key: string, value: string) => {
              cookieStore.set(key, value)
            },
            removeItem: (key: string) => {
              cookieStore.delete(key)
            },
          },
        },
      }
    )

    try {
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/error`)
    }
  }

  return NextResponse.redirect(requestUrl.origin)
} 