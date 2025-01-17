"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from "@/hooks/use-supabase"
import { Users, BookOpen, FileCode, Activity } from "lucide-react"

interface Stats {
  totalUsers: number
  totalCourses: number
  totalProjects: number
  activeUsers: number
}

export default function AdminDashboard() {
  const { supabase } = useSupabase()
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCourses: 0,
    totalProjects: 0,
    activeUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total users
        const { count: totalUsers } = await supabase
          .from('auth.users')
          .select('*', { count: 'exact', head: true })

        // For now, set placeholder values for other stats
        // You can implement these queries based on your database structure
        setStats({
          totalUsers: totalUsers || 0,
          totalCourses: 0, // Implement when courses table is ready
          totalProjects: 0, // Implement when projects table is ready
          activeUsers: 0, // Implement based on your activity tracking
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  const stats_cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Total registered users"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: Activity,
      description: "Users active in last 30 days"
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      description: "Available courses"
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FileCode,
      description: "Student projects"
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your academy's performance and statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats_cards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                ) : (
                  stat.value.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add more sections here like recent activity, charts, etc. */}
    </div>
  )
} 