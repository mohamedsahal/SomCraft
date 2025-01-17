"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircleCode, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <MessageCircleCode className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            SomaliCraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link 
            href="/courses" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Courses
          </Link>
          <Link 
            href="/blog" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Right Side - Auth & Theme */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          {/* Auth Buttons - Show Sign In on mobile */}
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        {/* Mobile Menu Content */}
        <div 
          className={cn(
            "fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg",
            "transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header - Only Close Button */}
          <div className="flex justify-end mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4">
            {[
              { href: "/", label: "Home" },
              { href: "/courses", label: "Courses" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Get Started Button */}
          <div className="mt-8">
            <Button 
              className="w-full justify-center"
              onClick={() => setIsOpen(false)}
              asChild
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 