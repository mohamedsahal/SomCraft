"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { Loader2, Users, BookOpen } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface Stats {
  totalStudents: number
  totalCourses: number
}

export default function AdminDashboard() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({ totalStudents: 0, totalCourses: 0 })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading && (!user || !user.is_super_admin)) {
      router.push("/sign-in")
      return
    }

    const fetchStats = async () => {
      try {
        const supabase = createClientComponentClient()
        
        // Get total students
        const { count: studentsCount } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", "student")

        // Get total courses (assuming you have a courses table)
        const { count: coursesCount } = await supabase
          .from("courses")
          .select("*", { count: "exact", head: true })

        setStats({
          totalStudents: studentsCount || 0,
          totalCourses: coursesCount || 0
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
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

  return (
    <div className="p-6">
      <h1 className="mb-8 text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Students Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Students</p>
              <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
            </div>
          </div>
        </div>

        {/* Courses Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
              <h3 className="text-2xl font-bold">{stats.totalCourses}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 