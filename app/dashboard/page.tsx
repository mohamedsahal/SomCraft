"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/hooks/use-supabase"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Trophy,
  PlayCircle,
  ChevronRight,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type Course = Database["public"]["Tables"]["courses"]["Row"]
type CourseWithProgress = Course & {
  progress: number
  nextLesson?: {
    title: string
    duration: number
  }
}

type EnrollmentWithCourse = {
  course_id: string
  courses: Course
}

export default function DashboardPage() {
  const { user, signOut } = useSupabase()
  const [courses, setCourses] = useState<CourseWithProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch enrolled courses
  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return

      try {
        const supabase = createClientComponentClient<Database>()
        const { data: enrollments, error: enrollmentError } = await supabase
          .from("enrollments")
          .select(`
            course_id,
            courses (
              id,
              title,
              slug,
              description,
              level,
              status,
              duration,
              thumbnail_url,
              instructor_id,
              price,
              created_at,
              updated_at
            )
          `)
          .eq("user_id", user.id)

        if (enrollmentError) throw enrollmentError

        if (!enrollments) {
          setCourses([])
          return
        }

        // Mock progress data for now
        const coursesWithProgress = enrollments.map((enrollment: any) => ({
          ...enrollment.courses,
          progress: Math.floor(Math.random() * 100),
          nextLesson: {
            title: "Introduction to React Hooks",
            duration: 45
          }
        }))

        setCourses(coursesWithProgress)
      } catch (error) {
        console.error("Error fetching courses:", error)
        toast.error("Failed to load your courses")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [user])

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.email}</h1>
            <p className="text-muted-foreground mt-1">
              Continue your learning journey where you left off
            </p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Enrolled Courses</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{courses.length}</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Completed</h3>
            </div>
            <p className="text-2xl font-bold mt-2">
              {courses.filter(c => c.progress === 100).length}
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Hours Learned</h3>
            </div>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Certificates</h3>
            </div>
            <p className="text-2xl font-bold mt-2">2</p>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Button variant="outline" asChild>
              <Link href="/courses">Browse More Courses</Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-[200px] rounded-lg border bg-card animate-pulse"
                />
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-lg border bg-card overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative h-48">
                    {course.thumbnail_url ? (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span>{course.progress}% Complete</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t bg-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PlayCircle className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Next Lesson</p>
                          <p className="text-sm text-muted-foreground">
                            {course.nextLesson?.title}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-card">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No courses yet</h3>
              <p className="text-muted-foreground mt-2">
                Start your learning journey by enrolling in a course
              </p>
              <Button className="mt-4" asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Upcoming Schedule */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Schedule</h2>
          <div className="rounded-lg border bg-card divide-y">
            {[
              {
                title: "Live Q&A Session",
                course: "Full-Stack Web Development",
                date: "Tomorrow, 2:00 PM",
                duration: "1 hour"
              },
              {
                title: "Project Submission Deadline",
                course: "React Fundamentals",
                date: "Friday, 11:59 PM",
                duration: "-"
              }
            ].map((event, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 