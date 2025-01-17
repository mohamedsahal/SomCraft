import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response object that we can modify
  const response = NextResponse.next()

  try {
    // Create the Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // If the cookie is updated, update the response headers
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.delete({ name, ...options })
          },
        },
      }
    )

    // Refresh the session
    await supabase.auth.getSession()

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession()

    // Protected routes
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
    const isAuthRoute = ['/sign-in', '/sign-up'].includes(request.nextUrl.pathname)

    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/sign-in', request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect to dashboard if already logged in and trying to access auth routes
    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
  } catch (error) {
    // If there's an error, return the original response
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 