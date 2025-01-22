import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from "@/app/providers/supabase-provider"
import { SidebarProvider } from "@/app/context/sidebar-context"
import { Toaster } from "sonner"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SomaliCraft Academy",
  description: "Learn to code with SomaliCraft Academy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <SupabaseProvider>
          <ThemeProvider>
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
