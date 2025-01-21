"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSupabase } from "@/app/hooks/use-supabase"
import { Users, LayoutDashboard, BookOpen, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

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
  const { user, loading, signOut } = useSupabase()
  const router = useRouter()
  const pathname = usePathname()

  // Simple auth check
  useEffect(() => {
    if (!loading && (!user || !user.is_super_admin)) {
      router.replace('/sign-in')
    }
  }, [user, loading, router])

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut()
      router.replace('/sign-in')
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  // Show nothing while loading or if not admin
  if (loading || !user?.is_super_admin) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </div>
        <div className="flex flex-col flex-1 justify-between">
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

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background p-8">
        {children}
      </main>
    </div>
  )
} 