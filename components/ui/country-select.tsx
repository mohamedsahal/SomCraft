"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CountrySelectProps {
  value: string
  onValueChange: (value: string) => void
}

export function CountrySelect({ value, onValueChange }: CountrySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="+252">🇸🇴 +252</SelectItem>
        <SelectItem value="+971">🇦🇪 +971</SelectItem>
        <SelectItem value="+966">🇸🇦 +966</SelectItem>
        <SelectItem value="+974">🇶🇦 +974</SelectItem>
        <SelectItem value="+973">🇧🇭 +973</SelectItem>
        <SelectItem value="+968">🇴🇲 +968</SelectItem>
        <SelectItem value="+965">🇰🇼 +965</SelectItem>
        <SelectItem value="+961">🇱🇧 +961</SelectItem>
        <SelectItem value="+962">🇯🇴 +962</SelectItem>
        <SelectItem value="+90">🇹🇷 +90</SelectItem>
        <SelectItem value="+60">🇲🇾 +60</SelectItem>
        <SelectItem value="+92">🇵🇰 +92</SelectItem>
        <SelectItem value="+91">🇮🇳 +91</SelectItem>
        <SelectItem value="+44">🇬🇧 +44</SelectItem>
        <SelectItem value="+1">🇺🇸 +1</SelectItem>
      </SelectContent>
    </Select>
  )
} 