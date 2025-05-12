"use client"

import { useState, useRef, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchStocks } from "@/lib/api"

interface StockSearchProps {
  onSelect: (symbol: string) => void
}

interface StockOption {
  symbol: string
  name: string
}

export function StockSearch({ onSelect }: StockSearchProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<StockOption[]>([])
  const debouncedSearchRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (debouncedSearchRef.current) {
      clearTimeout(debouncedSearchRef.current)
    }

    if (!query || query.length < 2) {
      setOptions([])
      return
    }

    debouncedSearchRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const results = await searchStocks(query)
        setOptions(results)
      } catch (error) {
        console.error("Error searching stocks:", error)
        setOptions([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => {
      if (debouncedSearchRef.current) {
        clearTimeout(debouncedSearchRef.current)
      }
    }
  }, [query])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full md:w-[250px] justify-between">
          <Search className="mr-2 h-4 w-4" />
          {value ? value : "Search stocks..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search stocks..." value={query} onValueChange={setQuery} />
          <CommandList>
            <CommandEmpty>{isLoading ? "Searching..." : "No stocks found."}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.symbol}
                  value={option.symbol}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    onSelect(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.symbol ? "opacity-100" : "opacity-0")} />
                  <span className="font-medium">{option.symbol}</span>
                  <span className="text-muted-foreground ml-2 text-sm truncate">{option.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

