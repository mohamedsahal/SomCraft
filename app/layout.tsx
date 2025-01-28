import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/app/context/sidebar-context"
import { Toaster } from "sonner"
import { cn } from "@/components/utils"
import "@/app/globals.css"
import { GridBackground } from "@/components/grid-background"
import { MainNav } from "@/components/nav/main-nav"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata = {
  title: "SomCraft Academy",
  description: "Learn to code with SomCraft Academy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased relative", fontSans.variable, fontMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GridBackground />
          <MainNav/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
