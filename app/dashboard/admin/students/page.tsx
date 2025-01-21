"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { Loader2, AlertCircle } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Student {
  id: string
  full_name: string | null
  phone_number: string | null
  country_code: string | null
  role: string
  created_at: string
  email: string | null
}

interface DatabaseStudent {
  id: string
  full_name: string | null
  phone_number: string | null
  country_code: string | null
  role: string
  created_at: string
  auth_users: { email: string | null }[] | null
}

export default function StudentsPage() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoadingStudents, setIsLoadingStudents] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && (!user || !user.is_super_admin)) {
      router.push("/sign-in")
      return
    }

    const fetchStudents = async () => {
      try {
        setError(null)
        setIsLoadingStudents(true)
        
        const supabase = createClientComponentClient()
        
        // Get students with their emails in a single query using a join
        const { data: studentsData, error: fetchError } = await supabase
          .from('users')
          .select(`
            id,
            full_name,
            phone_number,
            country_code,
            role,
            created_at,
            auth_users:auth.users(email)
          `)
          .eq('role', 'student')
          .order('created_at', { ascending: false })
          .returns<DatabaseStudent[]>()

        if (fetchError) {
          console.error("Error fetching students data:", {
            code: fetchError.code,
            message: fetchError.message,
            details: fetchError.details,
            hint: fetchError.hint
          })
          throw fetchError
        }

        if (!studentsData) {
          throw new Error("No data received from the database")
        }

        // Transform the data to match our Student interface
        const transformedData: Student[] = studentsData.map(student => ({
          id: student.id,
          full_name: student.full_name,
          phone_number: student.phone_number,
          country_code: student.country_code,
          role: student.role,
          created_at: student.created_at,
          email: student.auth_users?.[0]?.email || null
        }))

        setStudents(transformedData)
        if (transformedData.length === 0) {
          toast.info("No students found in the database")
        } else {
          toast.success(`Successfully loaded ${transformedData.length} students`)
        }
      } catch (error: any) {
        console.error("Error in fetchStudents:", {
          name: error.name,
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        
        let errorMessage = "Failed to fetch students"
        if (error.message && error.message !== "FetchError") {
          errorMessage = error.message
        } else if (error.hint) {
          errorMessage = error.hint
        } else if (error.code) {
          errorMessage = `Database error (${error.code})`
        }
        
        setError(errorMessage)
        toast.error(errorMessage)
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
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-4 text-left font-medium">Name</th>
                  <th className="pb-4 text-left font-medium">Phone</th>
                  <th className="pb-4 text-left font-medium">Email</th>
                  <th className="pb-4 text-left font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b last:border-0">
                    <td className="py-4">{student.full_name || "N/A"}</td>
                    <td className="py-4">
                      {student.country_code && student.phone_number 
                        ? `${student.country_code} ${student.phone_number}`
                        : "N/A"}
                    </td>
                    <td className="py-4">{student.email || "Not registered"}</td>
                    <td className="py-4">
                      {new Date(student.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {students.length === 0 && !error && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-muted-foreground">
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