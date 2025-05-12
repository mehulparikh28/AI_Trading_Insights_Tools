"use client"

import { useState, useEffect } from "react"
import type { Stock } from "@/types/stock"
import { fetchStocks } from "@/lib/api"
import { useWatchlist } from "@/hooks/use-watchlist"
import { useUser } from "@clerk/nextjs"

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { watchlist } = useWatchlist()
  const { isLoaded } = useUser()

  const fetchData = async () => {
    if (!isLoaded) return

    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchStocks()
      // Filter by watchlist if it's not empty
      const filteredData = watchlist.length > 0 ? data.filter((stock) => watchlist.includes(stock.symbol)) : data
      setStocks(filteredData)
    } catch (err) {
      setError("Failed to load stocks. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded) {
      fetchData()
    }
  }, [watchlist, isLoaded])

  const refreshData = () => {
    fetchData()
  }

  return { stocks, isLoading, error, refreshData }
}

