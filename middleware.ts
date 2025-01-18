import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check auth status
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not logged in and trying to access protected route
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/sign-in'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is logged in, get their role
  if (session?.user) {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('role, is_super_admin')
        .eq('id', session.user.id)
        .single()

      if (error || !userData) {
        console.error('Error fetching user role:', error)
        return NextResponse.redirect(new URL('/sign-in', req.url))
      }

      // Handle base dashboard route
      if (req.nextUrl.pathname === '/dashboard') {
        const redirectUrl = new URL(
          `/dashboard/${userData.is_super_admin ? 'admin' : userData.role}`,
          req.url
        )
        return NextResponse.redirect(redirectUrl)
      }

      // Protect admin routes
      if (req.nextUrl.pathname.startsWith('/dashboard/admin') && !userData.is_super_admin) {
        return NextResponse.redirect(new URL(`/dashboard/${userData.role}`, req.url))
      }

      // Protect student routes
      if (req.nextUrl.pathname.startsWith('/dashboard/student') && userData.role !== 'student') {
        return NextResponse.redirect(
          new URL(`/dashboard/${userData.is_super_admin ? 'admin' : userData.role}`, req.url)
        )
      }
    } catch (error) {
      console.error('Error in middleware:', error)
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 