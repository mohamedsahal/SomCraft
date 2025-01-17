"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  BarChart3, 
  Settings,
  Search,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSupabase } from "@/hooks/use-supabase"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)

  // Placeholder stats
  const stats = [
    {
      title: "Total Students",
      value: "2,345",
      change: "+12%",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "18",
      change: "+2",
      icon: BookOpen,
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      icon: GraduationCap,
    },
    {
      title: "Revenue",
      value: "$12,345",
      change: "+18%",
      icon: BarChart3,
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow border-r border-border bg-card px-4 pb-4">
          <div className="h-16 flex items-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <nav className="flex-1 space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-5 w-5" />
              Students
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookOpen className="h-5 w-5" />
              Courses
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <GraduationCap className="h-5 w-5" />
              Progress
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 border-b border-border bg-card">
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1">
              <div className="flex w-full md:ml-0">
                <div className="relative w-full max-w-2xl">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="block w-full pl-10 h-full"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Welcome section */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
              <p className="mt-2 text-muted-foreground">
                Here's what's happening with your academy today.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="relative overflow-hidden rounded-lg border border-border bg-card px-4 py-5 sm:p-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-primary/10 p-3">
                      <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="ml-2 flex items-baseline text-sm text-green-600">
                      {stat.change}
                    </p>
                  </dd>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="mt-8">
              <div className="border border-border rounded-lg bg-card">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium">Recent Activity</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  {/* Add activity content here */}
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 