"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "../utils"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/courses",
      label: "Courses",
      active: pathname === "/courses",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">SomCraft</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                route.active ? "text-foreground" : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 animate-in fade-in duration-200" />
          ) : (
            <Menu className="h-6 w-6 animate-in fade-in duration-200" />
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 bg-background dark:bg-slate-950 border-t md:hidden transition-all duration-300 ease-in-out",
            isOpen 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-full pointer-events-none"
          )}
        >
          <nav className="container py-8">
            <div className="flex flex-col space-y-4">
              {routes.map((route, i) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-foreground/80 animate-in slide-in-from-right-4",
                    route.active ? "text-foreground" : "text-foreground/60",
                    // Add staggered animation delay
                    `delay-[${i * 100}ms]`
                  )}
                >
                  {route.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 pt-4 border-t animate-in slide-in-from-right-4 delay-300">
                <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}