'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter your email"
        className="bg-background"
      />
      <Button className="w-full">Subscribe</Button>
    </form>
  )
} 