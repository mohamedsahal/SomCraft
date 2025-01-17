"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const countries = [
  { code: "+252", name: "Somalia", flag: "🇸🇴" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { code: "+253", name: "Djibouti", flag: "🇩🇯" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
].sort((a, b) => {
  // Somalia always first, then alphabetical by name
  if (a.code === "+252") return -1
  if (b.code === "+252") return 1
  return a.name.localeCompare(b.name)
})

interface CountrySelectProps {
  onSelect: (code: string) => void
}

export function CountrySelect({ onSelect }: CountrySelectProps) {
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [selectedCode, setSelectedCode] = React.useState("+252")

  const filteredCountries = React.useMemo(() => {
    if (!search) return countries
    const searchLower = search.toLowerCase()
    return countries.filter(
      country =>
        country.name.toLowerCase().includes(searchLower) ||
        country.code.includes(search)
    )
  }, [search])

  const selectedCountry = React.useMemo(() => 
    countries.find(c => c.code === selectedCode), 
    [selectedCode]
  )

  return (
    <Select 
      defaultValue="+252" 
      onValueChange={(value) => {
        setSelectedCode(value)
        onSelect(value)
      }}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className="w-[110px] h-12 text-base bg-background/50 backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <span>{selectedCountry?.flag}</span>
          <span>{selectedCountry?.code}</span>
        </span>
      </SelectTrigger>
      <SelectContent className="w-[200px]">
        <div className="flex items-center px-3 pb-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search..."
            className="h-9 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={cn(
          "max-h-[300px] overflow-auto",
          filteredCountries.length > 10 && "scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20"
        )}>
          {filteredCountries.map((country) => (
            <SelectItem
              key={country.code}
              value={country.code}
              className="text-base"
              onClick={() => {
                setOpen(false)
                setSearch("")
              }}
            >
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.code}</span>
              </span>
            </SelectItem>
          ))}
          {filteredCountries.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No countries found
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  )
} 