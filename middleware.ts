import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if we're on an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // Check if user is super admin
    const { data: { user } } = await supabase.auth.getUser()
    const isAdmin = user?.app_metadata?.roles?.includes('super_admin') || 
                   Boolean(user?.app_metadata?.is_super_admin)

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*']
} 