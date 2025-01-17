"use client"

import { useSupabase } from "@/hooks/use-supabase"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { user, signOut } = useSupabase()

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
      <div className="p-6 rounded-lg border bg-card">
        <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
        <p className="text-muted-foreground">
          You are signed in as: {user?.email}
        </p>
      </div>
    </div>
  )
} 