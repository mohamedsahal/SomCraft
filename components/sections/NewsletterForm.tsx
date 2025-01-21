'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  return (
    <form className="flex space-x-2">
      <Input
        type="email"
        placeholder="Enter your email"
        className="max-w-[220px] bg-background/50"
      />
      <Button 
        type="submit"
        variant="outline"
        className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-colors"
      >
        Subscribe
      </Button>
    </form>
  )
} 