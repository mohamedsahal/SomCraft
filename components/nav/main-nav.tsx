"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm bg-background/50 supports-[backdrop-filter]:bg-background/50">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Tech Academy Logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-bold">Tech Academy</span>
        </Link>

        {/* Main Navigation */}
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
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container py-4 space-y-4">
            <Link 
              href="/" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/blog" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Sign In
              </Button>
              <Button size="sm" className="w-full justify-start">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 