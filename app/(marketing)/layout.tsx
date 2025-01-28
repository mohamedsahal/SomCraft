import { MainNav } from "@/components/nav/main-nav"

"use client"

import { GridBackground } from "@/components/marketing/grid-background"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      {children}
    </div>
  )
}