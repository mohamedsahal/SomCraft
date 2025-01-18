"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { BookOpen, GraduationCap, User } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "My Courses",
    href: "/dashboard/student",
    icon: BookOpen
  },
  {
    title: "My Progress",
    href: "/dashboard/student/progress",
    icon: GraduationCap
  },
  {
    title: "Profile",
    href: "/dashboard/student/profile",
    icon: User
  }
]

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
      router.push("/sign-in")
    }
  }, [user, loading, router])

  if (loading) {
    return null
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold">Student Dashboard</h2>
        </div>
        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  )
} 