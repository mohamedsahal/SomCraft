"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { Users, LayoutDashboard, BookOpen, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/app/context/sidebar-context"

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard
  },
  {
    title: "Students",
    href: "/dashboard/admin/students",
    icon: Users
  },
  {
    title: "Courses",
    href: "/dashboard/admin/courses",
    icon: BookOpen
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const pathname = usePathname()
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  useEffect(() => {
    if (!loading && (!user || !user.is_super_admin)) {
      router.replace('/sign-in')
    }
  }, [user, loading, router])

  if (loading || !user?.is_super_admin) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-screen w-64 border-r bg-card flex flex-col z-40 transition-transform duration-200 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold hidden md:block">Admin Panel</h2>
        </div>
        <nav className="space-y-1 p-4 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 overflow-y-auto bg-background p-8">
        {children}
      </main>
    </div>
  )
}