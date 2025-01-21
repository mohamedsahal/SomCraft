"use client"

import { Users, BookOpen, GraduationCap, BarChart3, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface DashboardStats {
  totalStudents: number
  activeCourses: number
  completionRate: number
  revenue: number
}

export default function DashboardPage() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeCourses: 0,
    completionRate: 0,
    revenue: 0
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading && (!user || !user.is_super_admin)) {
      router.push("/sign-in")
      return
    }

    const fetchStats = async () => {
      try {
        const supabase = createClientComponentClient()
        
        // Run all queries in parallel using Promise.all
        const [
          studentsResult,
          coursesResult,
          enrollmentStatsResult,
          revenueResult
        ] = await Promise.all([
          // Get total students
          supabase
            .from("users")
            .select("*", { count: "exact", head: true })
            .eq("role", "student"),

          // Get active courses
          supabase
            .from("courses")
            .select("*", { count: "exact", head: true })
            .eq("status", "published"),

          // Get completion stats using database-side aggregation
          supabase
            .rpc('get_enrollment_stats')
            .single(),

          // Get total revenue using database-side sum
          supabase
            .rpc('get_total_revenue')
            .single()
        ])

        // Handle potential errors for each query
        if (studentsResult.error) throw new Error(`Failed to fetch students: ${studentsResult.error.message}`)
        if (coursesResult.error) throw new Error(`Failed to fetch courses: ${coursesResult.error.message}`)
        if (enrollmentStatsResult.error) throw new Error(`Failed to fetch enrollment stats: ${enrollmentStatsResult.error.message}`)
        if (revenueResult.error) throw new Error(`Failed to fetch revenue: ${revenueResult.error.message}`)

        // Calculate completion rate using the aggregated data
        const stats = enrollmentStatsResult.data as { total_count: number, completed_count: number }
        const completionRate = stats.total_count > 0
          ? Math.round((stats.completed_count / stats.total_count) * 100)
          : 0

        setStats({
          totalStudents: studentsResult.count || 0,
          activeCourses: coursesResult.count || 0,
          completionRate,
          revenue: (revenueResult.data as { total_revenue: number }).total_revenue || 0
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        // Set error state to display in UI
        setStats({
          totalStudents: 0,
          activeCourses: 0,
          completionRate: 0,
          revenue: 0
        })
        
        // Add detailed error logging
        if (error instanceof Error) {
          console.error("Detailed error:", {
            message: error.message,
            stack: error.stack
          })
        }
      } finally {
        setIsLoadingStats(false)
      }
    }

    if (user?.is_super_admin) {
      fetchStats()
    }
  }, [user, loading, router])

  if (loading || isLoadingStats) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const displayStats = [
    {
      title: "Total Students",
      value: stats.totalStudents.toString(),
      change: "Active",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: stats.activeCourses.toString(),
      change: "Current",
      icon: BookOpen,
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      change: "Overall",
      icon: GraduationCap,
    },
    {
      title: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      change: "Total",
      icon: BarChart3,
    },
  ]

  return (
    <div>
      {/* Welcome section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
        <p className="mt-2 text-muted-foreground">
          Here's what's happening with your academy today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((stat) => (
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
  )
} 
