"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSupabase } from "@/app/providers/supabase-provider"
import { useSidebar } from "@/app/context/sidebar-context"
import {
  Home,
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut
} from "lucide-react"
import { useEffect, useState } from "react"

export function DashboardNav() {
  const pathname = usePathname()
  const { user, signOut } = useSupabase()
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
  const [mounted, setMounted] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  // Only show the UI after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Left section - Menu, Logo and Home */}
        <div className="flex items-center space-x-4">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-xl">SomaliCraft</span>
          </Link>

          {/* Home Icon */}
          <Button variant="ghost" size="sm" asChild>
            <Link 
              href="/"
              className={cn(
                "flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors",
                pathname === "/" && "text-foreground"
              )}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </Button>
        </div>

        {/* Center section - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10"
            />
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/settings">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile Settings</span>
            </Link>
          </Button>

          {/* Sign Out */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sign Out</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="border-t md:hidden">
          <div className="container py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 