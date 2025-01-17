"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSupabase } from "@/hooks/use-supabase"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  Settings,
  MessageCircleCode,
  Home,
  Search,
  Bell,
  User,
  Sun,
  Moon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Students",
    href: "/admin/students",
    icon: Users
  },
  {
    name: "Courses",
    href: "/admin/courses",
    icon: BookOpen
  },
  {
    name: "Progress",
    href: "/admin/progress",
    icon: GraduationCap
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, signOut } = useSupabase()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Check if user is admin
    if (!loading && !user) {
      router.push("/sign-in")
    }
    // TODO: Add admin role check when ready
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      if (error) throw error
      router.push("/sign-in")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        {/* Top Menu */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-full items-center justify-between px-4">
            {/* Left - Logo and Home */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <MessageCircleCode className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">SomaliCraft</span>
              </div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-5 w-5" />
                  Home
                </Button>
              </Link>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-full pl-9 h-10"
                />
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Administrator
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-64 bg-black text-white p-4">
            {/* Dashboard Navigation */}
            <nav>
              <ul className="space-y-2">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <div className={cn(
                          "flex items-center p-2 rounded transition-colors",
                          "hover:bg-gray-800",
                          isActive && "bg-gray-800"
                        )}>
                          <item.icon className="mr-2 h-5 w-5" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 