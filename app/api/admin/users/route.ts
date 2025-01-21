import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Verify the user is an admin
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is super admin
    const { data: adminData, error: adminError } = await supabase
      .from('users')
      .select('is_super_admin')
      .eq('id', user.id)
      .single()

    if (adminError || !adminData?.is_super_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all users from auth.users using admin API
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers()

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    // Return only the id and email
    const sanitizedUsers = users.users.map(user => ({
      id: user.id,
      email: user.email
    }))

    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    console.error('Error in users API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 