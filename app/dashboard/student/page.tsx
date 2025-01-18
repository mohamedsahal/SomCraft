"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { Loader2, BookOpen, LogOut } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Course {
  id: string
  title: string
  description: string
  created_at: string
}

interface EnrollmentWithCourse {
  course: Course
}

export default function StudentDashboard() {
  const { user, loading, signOut } = useSupabase()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoadingCourses, setIsLoadingCourses] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.push("/sign-in")
      return
    }

    const fetchCourses = async () => {
      try {
        const supabase = createClientComponentClient()
        
        // Get enrolled courses (assuming you have an enrollments table)
        const { data, error } = await supabase
          .from("enrollments")
          .select(`
            course:courses (
              id,
              title,
              description,
              created_at
            )
          `)
          .eq("student_id", user?.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error("Error fetching courses:", error)
          return
        }

        // Extract courses from the nested structure
        const enrolledCourses = (data as EnrollmentWithCourse[])?.map(item => item.course) || []
        setCourses(enrolledCourses)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoadingCourses(false)
      }
    }

    if (user) {
      fetchCourses()
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const { error } = await signOut()
      if (error) {
        throw error
      }
      toast.success("Logged out successfully")
      router.push("/sign-in")
    } catch (error: any) {
      console.error("Error logging out:", error)
      toast.error(error.message || "Error logging out")
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (loading || isLoadingCourses) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="gap-2"
        >
          {isLoggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Sign Out
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{course.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{course.description}</p>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full rounded-lg border bg-card p-6 text-center text-muted-foreground">
            You are not enrolled in any courses yet.
          </div>
        )}
      </div>
    </div>
  )
} 