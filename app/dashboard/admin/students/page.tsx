"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { Loader2 } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface Student {
  id: string
  email: string
  full_name?: string
  role: string
  created_at: string
}

export default function StudentsPage() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoadingStudents, setIsLoadingStudents] = useState(true)

  useEffect(() => {
    if (!loading && (!user || !user.is_super_admin)) {
      router.push("/sign-in")
      return
    }

    const fetchStudents = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase
          .from("users")
          .select("id, email, full_name, role, created_at")
          .eq("role", "student")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching students:", error)
          return
        }

        setStudents(data || [])
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoadingStudents(false)
      }
    }

    if (user?.is_super_admin) {
      fetchStudents()
    }
  }, [user, loading, router])

  if (loading || isLoadingStudents) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="mb-8 text-3xl font-bold">Students</h1>
      
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-4 text-left font-medium">Name</th>
                  <th className="pb-4 text-left font-medium">Email</th>
                  <th className="pb-4 text-left font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b last:border-0">
                    <td className="py-4">{student.full_name || "N/A"}</td>
                    <td className="py-4">{student.email}</td>
                    <td className="py-4">
                      {new Date(student.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-muted-foreground">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 