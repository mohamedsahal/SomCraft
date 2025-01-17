"use client"

import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Background } from "@/components/background"
import { MainNav } from "@/components/nav/main-nav"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Background />
          {!isAdminRoute && <MainNav />}
          <main className={cn(
            "min-h-[calc(100vh-4rem)]",
            isAdminRoute && "min-h-screen"
          )}>
            {children}
          </main>
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
