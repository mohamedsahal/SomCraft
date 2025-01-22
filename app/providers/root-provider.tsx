"use client"

import { ThemeProvider } from "../../components/theme-provider"
import { SupabaseProvider } from "./supabase-provider"
import { Toaster } from "sonner"

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
        <Toaster richColors closeButton position="top-right" />
      </ThemeProvider>
    </SupabaseProvider>
  )
} 