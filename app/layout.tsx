import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Background } from "@/components/background";
import { MainNav } from "@/components/nav/main-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Academy - Master Web Development",
  description: "Learn web development with expert mentorship and hands-on projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Background />
          <MainNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
